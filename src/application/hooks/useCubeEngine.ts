import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type RefObject,
} from "react";
import type { StoryState } from "@domain/models/types";
import {
  assembleOrder,
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

const STORY_TIMING = {
  holdScrambled: 1500,
  toOrganizing: 0,
  holdOrganizing: 1600,
  toOrdered: 0,
  holdOrdered: 1100,
  toSolution: 0,
  holdSolution: 3000,
  toScramble: 0,
  holdBeforeLoop: 450,
} as const;

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
  const timers = useRef<number[]>([]);
  const looping = useRef(false);
  const storyPhase = useRef<StoryState>(
    reducedMotion || !playIntroStory ? "ordered" : "scrambled"
  );
  const spinBoost = useRef(0);

  const clearTimers = useCallback(() => {
    timers.current.forEach((id) => window.clearTimeout(id));
    timers.current = [];
  }, []);

  const schedule = useCallback((fn: () => void, ms: number) => {
    const id = window.setTimeout(fn, ms);
    timers.current.push(id);
    return id;
  }, []);

  const setModuleDelays = useCallback(
    (mode: "assemble" | "disassemble" | "none") => {
      const modules = moduleEls.current;
      const ranked = modules
        .map((_, i) => ({ i, order: assembleOrder(i) }))
        .sort((a, b) => a.order - b.order);

      ranked.forEach(({ i }, rank) => {
        const el = modules[i];
        if (!el) return;
        if (mode === "none") {
          el.style.transitionDelay = "0ms";
          return;
        }
        const step = mode === "assemble" ? rank : ranked.length - 1 - rank;
        el.style.transitionDelay = `${step * 42}ms`;
      });
    },
    []
  );

  const applyPoses = useCallback(
    (state: StoryState, instant = false) => {
      const root = rootRef.current;
      if (!root) return;
      const modules = moduleEls.current;
      modules.forEach((el, i) => {
        if (instant) {
          el.style.transition = "none";
          el.style.transitionDelay = "0ms";
        } else if (!el.style.transition) {
          el.style.transition = "";
        }
        const pose =
          stageIndex !== undefined &&
          (state === "ordered" || state === "solution")
            ? poseForStage(i, size, stageIndex)
            : poseForStory(state, i, size);
        el.style.transform = poseToTransform(pose);
        if (instant) {
          void el.offsetWidth;
          el.style.transition = "";
        }
      });
      root.dataset.story = state;
    },
    [size, stageIndex]
  );

  const setStory = useCallback(
    (state: StoryState, instant = false, delayMode: "assemble" | "disassemble" | "none" = "none") => {
      storyPhase.current = state;
      setStoryState(state);
      if (!instant) setModuleDelays(delayMode);
      else setModuleDelays("none");
      applyPoses(state, instant);
      if (state === "solution") spinBoost.current = 0.12;
      else if (state === "scrambled") spinBoost.current = 0.02;
      else spinBoost.current = 0.045;
    },
    [applyPoses, setModuleDelays]
  );

  const playStoryOnce = useCallback(
    (onDone?: () => void) => {
      if (reducedMotion) {
        setStory("solution", true);
        onDone?.();
        return;
      }

      setStory("intervening", false, "assemble");
      schedule(() => {
        setStory("ordered", false, "assemble");
      }, STORY_TIMING.holdOrganizing);

      schedule(() => {
        setStory("solution", false, "none");
      }, STORY_TIMING.holdOrganizing + STORY_TIMING.holdOrdered);

      schedule(() => {
        onDone?.();
      }, STORY_TIMING.holdOrganizing + STORY_TIMING.holdOrdered + STORY_TIMING.holdSolution);
    },
    [reducedMotion, schedule, setStory]
  );

  const runLoop = useCallback(() => {
    if (!playIntroStory || reducedMotion || !looping.current) return;

    setStory("scrambled", false, "disassemble");

    schedule(() => {
      if (!looping.current) return;
      playStoryOnce(() => {
        if (!looping.current) return;
        schedule(() => {
          if (looping.current) runLoop();
        }, STORY_TIMING.holdBeforeLoop);
      });
    }, STORY_TIMING.holdScrambled);
  }, [playIntroStory, playStoryOnce, reducedMotion, schedule, setStory]);

  const reorganize = useCallback(() => {
    clearTimers();
    looping.current = false;
    if (reducedMotion) {
      setStory("ordered", true);
      return;
    }
    setStory("scrambled", false, "disassemble");
    schedule(() => {
      playStoryOnce(() => {
        if (playIntroStory) {
          looping.current = true;
          schedule(() => runLoop(), STORY_TIMING.holdBeforeLoop);
        }
      });
    }, 480);
  }, [
    clearTimers,
    playIntroStory,
    playStoryOnce,
    reducedMotion,
    runLoop,
    schedule,
    setStory,
  ]);

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
    applyPoses(storyPhase.current, true);
  }, [size, applyPoses]);

  // Intro story + continuous loop (hero only)
  useEffect(() => {
    clearTimers();
    if (!playIntroStory || reducedMotion) {
      looping.current = false;
      setStory("ordered", true);
      return;
    }

    looping.current = true;
    setStory("scrambled", true);
    schedule(() => {
      if (!looping.current) return;
      playStoryOnce(() => {
        if (!looping.current) return;
        schedule(() => runLoop(), STORY_TIMING.holdBeforeLoop);
      });
    }, 900);

    return () => {
      looping.current = false;
      clearTimers();
    };
  }, [playIntroStory, reducedMotion]); // eslint-disable-line react-hooks/exhaustive-deps

  // Stage config updates (journey cubes)
  useEffect(() => {
    if (stageIndex === undefined) return;
    applyPoses("ordered");
    rot.current.ty = 32 + stageIndex * 12;
    rot.current.tx = -22 + (stageIndex % 2) * 6;
  }, [stageIndex, applyPoses]);

  // Animation loop + subtle interaction
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const stage =
      (root.closest(".cube-stage") as HTMLElement | null) ?? root.parentElement;
    if (!stage) return;

    const tick = () => {
      if (!reducedMotion && autoRotate && !drag.current.active) {
        const boost = playIntroStory ? spinBoost.current : 0.08;
        rot.current.ty += boost;
      }
      rot.current.x += (rot.current.tx - rot.current.x) * 0.07;
      rot.current.y += (rot.current.ty - rot.current.y) * 0.07;
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
        rot.current.ty += dx * 0.28;
        rot.current.tx = Math.max(-48, Math.min(32, rot.current.tx - dy * 0.28));
        drag.current.lastX = e.clientX;
        drag.current.lastY = e.clientY;
        return;
      }
      if (reducedMotion || !autoRotate) return;
      const rect = stage.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const ny = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      // Subtle parallax — does not overpower the story animation
      const baseY = 32;
      const baseX = -22;
      rot.current.ty = baseY + nx * 8;
      rot.current.tx = baseX - ny * 5;
    };

    const onUp = () => {
      drag.current.active = false;
    };

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") rot.current.ty -= 10;
      if (e.key === "ArrowRight") rot.current.ty += 10;
      if (e.key === "ArrowUp") rot.current.tx = Math.max(-48, rot.current.tx - 6);
      if (e.key === "ArrowDown") rot.current.tx = Math.min(32, rot.current.tx + 6);
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
  }, [autoRotate, interactive, playIntroStory, reducedMotion, reorganize]);

  return {
    rootRef,
    storyState,
    highlighted,
    reorganize,
    highlight,
    setStory,
  };
}

export { MODULE_COUNT } from "@domain/cube/geometry";
