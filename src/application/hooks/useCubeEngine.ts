import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type RefObject,
} from "react";
import type { StoryState } from "@domain/models/types";
import {
  MODULE_COUNT,
  poseForStage,
  poseForStory,
  poseToTransform,
} from "@domain/cube/geometry";

export interface UseCubeEngineOptions {
  size?: number;
  autoRotate?: boolean;
  interactive?: boolean;
  playIntroStory?: boolean;
  reducedMotion?: boolean;
  stageIndex?: number;
}

export interface CubeEngineApi {
  rootRef: RefObject<HTMLDivElement | null>;
  storyState: StoryState;
  highlighted: number | null;
  reorganize: () => void;
  highlight: (index: number | null) => void;
  setStory: (state: StoryState) => void;
}

export function useCubeEngine(options: UseCubeEngineOptions = {}): CubeEngineApi {
  const {
    size = 180,
    autoRotate = true,
    interactive = true,
    playIntroStory = false,
    reducedMotion = false,
    stageIndex,
  } = options;

  const rootRef = useRef<HTMLDivElement | null>(null);
  const [storyState, setStoryState] = useState<StoryState>(
    reducedMotion || !playIntroStory ? "ordered" : "scrambled"
  );
  const [highlighted, setHighlighted] = useState<number | null>(null);

  const rot = useRef({ x: -22, y: 32, tx: -22, ty: 32 });
  const drag = useRef({ active: false, lastX: 0, lastY: 0, moved: false });
  const raf = useRef<number>(0);
  const moduleEls = useRef<HTMLElement[]>([]);

  const applyPoses = useCallback(
    (state: StoryState, instant = false) => {
      const root = rootRef.current;
      if (!root) return;
      const modules = moduleEls.current;
      modules.forEach((el, i) => {
        if (instant) el.style.transition = "none";
        else el.style.transition = "";
        const pose =
          stageIndex !== undefined && (state === "ordered" || state === "solution")
            ? poseForStage(i, size, stageIndex)
            : poseForStory(state, i, size);
        el.style.transform = poseToTransform(pose);
        if (instant) {
          void el.offsetWidth;
          el.style.transition = "";
        }
      });
    },
    [size, stageIndex]
  );

  const setStory = useCallback(
    (state: StoryState, instant = false) => {
      setStoryState(state);
      applyPoses(state, instant);
    },
    [applyPoses]
  );

  const playStory = useCallback(() => {
    if (reducedMotion) {
      setStory("solution", true);
      return;
    }
    setStory("intervening");
    window.setTimeout(() => setStory("ordered"), 700);
    window.setTimeout(() => setStory("solution"), 1600);
  }, [reducedMotion, setStory]);

  const reorganize = useCallback(() => {
    if (reducedMotion) {
      setStory("ordered", true);
      return;
    }
    setStory("scrambled");
    window.setTimeout(() => playStory(), 500);
  }, [playStory, reducedMotion, setStory]);

  const highlight = useCallback((index: number | null) => {
    setHighlighted(index);
    moduleEls.current.forEach((el, i) => {
      el.classList.toggle("is-active", i === index);
      el.classList.toggle("is-highlight", i === index);
    });
  }, []);

  // Collect modules after mount / size change
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    moduleEls.current = Array.from(
      root.querySelectorAll<HTMLElement>(".cube-module")
    );
    applyPoses(storyState, true);
  }, [size, applyPoses]); // eslint-disable-line react-hooks/exhaustive-deps

  // Intro story
  useEffect(() => {
    if (!playIntroStory || reducedMotion) {
      setStory("ordered", true);
      return;
    }
    setStory("scrambled", true);
    const t = window.setTimeout(() => playStory(), 900);
    return () => window.clearTimeout(t);
  }, [playIntroStory, reducedMotion]); // eslint-disable-line react-hooks/exhaustive-deps

  // Stage config updates
  useEffect(() => {
    if (stageIndex === undefined) return;
    applyPoses("ordered");
    rot.current.ty = 32 + stageIndex * 12;
    rot.current.tx = -22 + (stageIndex % 2) * 6;
  }, [stageIndex, applyPoses]);

  // Animation loop + interaction
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const stage =
      (root.closest(".cube-stage") as HTMLElement | null) ?? root.parentElement;
    if (!stage) return;

    const tick = () => {
      if (!reducedMotion && autoRotate && !drag.current.active) {
        rot.current.ty += 0.08;
      }
      rot.current.x += (rot.current.tx - rot.current.x) * 0.08;
      rot.current.y += (rot.current.ty - rot.current.y) * 0.08;
      root.style.transform = `rotateX(${rot.current.x}deg) rotateY(${rot.current.y}deg)`;
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);

    if (!interactive) {
      return () => cancelAnimationFrame(raf.current);
    }

    const onDown = (e: PointerEvent) => {
      if (e.button !== 0) return;
      drag.current = {
        active: true,
        lastX: e.clientX,
        lastY: e.clientY,
        moved: false,
      };
    };

    const onMove = (e: PointerEvent) => {
      if (drag.current.active) {
        const dx = e.clientX - drag.current.lastX;
        const dy = e.clientY - drag.current.lastY;
        if (Math.abs(dx) + Math.abs(dy) > 4) drag.current.moved = true;
        rot.current.ty += dx * 0.45;
        rot.current.tx = Math.max(-60, Math.min(40, rot.current.tx - dy * 0.45));
        drag.current.lastX = e.clientX;
        drag.current.lastY = e.clientY;
        return;
      }
      if (reducedMotion || !autoRotate) return;
      const rect = stage.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const ny = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      rot.current.ty = 32 + nx * 18;
      rot.current.tx = -22 - ny * 12;
    };

    const onUp = () => {
      drag.current.active = false;
    };

    const onKey = (e: KeyboardEvent) => {
      // Nielsen #7 — keyboard efficiency
      if (e.key === "ArrowLeft") rot.current.ty -= 12;
      if (e.key === "ArrowRight") rot.current.ty += 12;
      if (e.key === "ArrowUp") rot.current.tx = Math.max(-60, rot.current.tx - 8);
      if (e.key === "ArrowDown") rot.current.tx = Math.min(40, rot.current.tx + 8);
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        reorganize();
      }
    };

    stage.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    stage.addEventListener("keydown", onKey);

    return () => {
      cancelAnimationFrame(raf.current);
      stage.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      stage.removeEventListener("keydown", onKey);
    };
  }, [autoRotate, interactive, reducedMotion, reorganize]);

  return {
    rootRef,
    storyState,
    highlighted,
    reorganize,
    highlight,
    setStory,
  };
}

export { MODULE_COUNT };
