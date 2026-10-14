import type { CubePose, JourneyStepId, StoryState } from "@domain/models/types";

/**
 * ——— Historia del cubo (3 pasos) ———
 * 1. Complejidad (`scrambled`) — disperso, piezas giradas.
 * 2. Organización (`aligning` → `intervening`) — cuadrar rejilla abierta; sin acercar al armado.
 * 3. Solución (`solution`) — ahí sí se acercan (LATTICE_SOLUTION, hueco corto, ≥ LATTICE_MIN).
 *
 * Ajustes: `size` en HeroSection · `CUBIE_BASE_PX` · `LATTICE_ORGANIZED` · `LATTICE_SOLUTION` · `LATTICE_MIN`.
 */
export const CUBE_REF_SIZE = 180;
export const CUBIE_BASE_PX = 30;
/** @deprecated use CUBIE_BASE_PX */
export const CUBIE_RENDER = CUBIE_BASE_PX;

/** Nunca por debajo: evita cubo “cerrado” (caras pegadas). */
export const LATTICE_MIN = 1.08;

/** Paso 2 — cuadrando el cubo (rejilla visible, aún algo abierta). */
export const LATTICE_ORGANIZED = 1.3;

/** Paso 3 — cubo armado (más junto que organización, siempre ≥ LATTICE_MIN). */
export const LATTICE_SOLUTION = 1.16;

/** @deprecated use LATTICE_ORGANIZED */
export const LATTICE_OPEN = LATTICE_ORGANIZED;
/** @deprecated use LATTICE_SOLUTION */
export const LATTICE_CLOSED = LATTICE_SOLUTION;

export const CUBIE_STEP = CUBIE_BASE_PX;

export function cubiePixelSize(size: number): number {
  return CUBIE_BASE_PX * (size / CUBE_REF_SIZE);
}

const AXIS = [-1, 0, 1] as const;

/**
 * Full Rubik lattice: 3 × 3 × 3 = 27 pieces.
 * Index order: z (back→front), then y (top→bottom), then x (left→right).
 */
export const ORDERED_POSES: CubePose[] = AXIS.flatMap((z) =>
  AXIS.flatMap((y) =>
    AXIS.map((x) => ({
      x: x * CUBIE_STEP,
      y: y * CUBIE_STEP,
      z: z * CUBIE_STEP,
    }))
  )
);

export const MODULE_COUNT = 27;

export type ModuleTone = "dark" | "accent" | "light" | "scaffold";

export function gridCoord(index: number): { x: number; y: number; z: number } {
  const i = ((index % MODULE_COUNT) + MODULE_COUNT) % MODULE_COUNT;
  const x = AXIS[i % 3];
  const y = AXIS[Math.floor(i / 3) % 3];
  const z = AXIS[Math.floor(i / 9) % 3];
  return { x, y, z };
}

/** Deterministic pseudo-random in [-1, 1]. */
function jitter(index: number, salt: number): number {
  const n = Math.sin(index * 12.9898 + salt * 78.233) * 43758.5453;
  return (n - Math.floor(n)) * 2 - 1;
}

function clampSpacing(factor: number): number {
  return Math.max(LATTICE_MIN, factor);
}

/** 3×3×3 lattice; spacingFactor × cubie size (nunca < LATTICE_MIN). */
export function latticePose(
  index: number,
  spacingFactor: number,
  size: number = CUBE_REF_SIZE
): CubePose {
  const { x, y, z } = gridCoord(index);
  const step = cubiePixelSize(size) * clampSpacing(spacingFactor);
  return {
    x: x * step,
    y: y * step,
    z: z * step,
    rx: 0,
    ry: 0,
    rz: 0,
  };
}

export function scaledOrdered(index: number, size: number): CubePose {
  return latticePose(index, LATTICE_SOLUTION, size);
}

/**
 * Complejidad — same 27 cubies, exploded off their home slots.
 * Still reads as one disassembled Rubik, not a random cloud.
 */
export function scramblePose(index: number, size: number = CUBE_REF_SIZE): CubePose {
  const home = latticePose(index, LATTICE_ORGANIZED, size);
  const { x: gx, y: gy, z: gz } = gridCoord(index);
  const radial = 0.55 + Math.abs(jitter(index, 1)) * 0.35;
  const k = cubiePixelSize(size) / CUBIE_BASE_PX;
  return {
    x: home.x * (1 + radial * 0.55) + jitter(index, 3) * 8 * k + gx * 6 * k,
    y: home.y * (1 + radial * 0.5) + jitter(index, 4) * 7 * k + gy * 5 * k,
    z: home.z * (1 + radial * 0.52) + jitter(index, 2) * 14 * k + gz * 6 * k,
    rx: jitter(index, 5) * 32,
    ry: jitter(index, 6) * 38,
    rz: jitter(index, 7) * 24,
  };
}

/** Organización (a) — misma dispersión, solo enderezar piezas. */
export function aligningPose(index: number, size: number = CUBE_REF_SIZE): CubePose {
  const scramble = scramblePose(index, size);
  return {
    x: scramble.x,
    y: scramble.y,
    z: scramble.z,
    rx: 0,
    ry: 0,
    rz: 0,
  };
}

/**
 * Organización (b) — cuadrar en rejilla abierta (sin acercar al factor de solución).
 */
export function organizingPose(index: number, size: number, progress = 1): CubePose {
  const from = aligningPose(index, size);
  const structured = latticePose(index, LATTICE_ORGANIZED, size);

  const t = Math.min(1, Math.max(0, progress));
  const ease = t * t * (3 - 2 * t);
  return {
    x: from.x + (structured.x - from.x) * ease,
    y: from.y + (structured.y - from.y) * ease,
    z: from.z + (structured.z - from.z) * ease,
    rx: 0,
    ry: 0,
    rz: 0,
  };
}

/** Paso 3 — de rejilla organizada a armado (solo separación, sin rotación). */
export function assembleSolutionPose(
  index: number,
  size: number,
  progress = 1
): CubePose {
  const from = latticePose(index, LATTICE_ORGANIZED, size);
  const to = latticePose(index, LATTICE_SOLUTION, size);
  const t = Math.min(1, Math.max(0, progress));
  const ease = t * t * (3 - 2 * t);
  return {
    x: from.x + (to.x - from.x) * ease,
    y: from.y + (to.y - from.y) * ease,
    z: from.z + (to.z - from.z) * ease,
    rx: 0,
    ry: 0,
    rz: 0,
  };
}

export function poseForStory(
  state: StoryState,
  index: number,
  size: number
): CubePose {
  if (state === "scrambled") return scramblePose(index, size);
  if (state === "aligning") return aligningPose(index, size);
  if (state === "intervening") return latticePose(index, LATTICE_ORGANIZED, size);
  if (state === "ordered") return latticePose(index, LATTICE_ORGANIZED, size);
  return assembleSolutionPose(index, size, 1);
}

function lerpPose(from: CubePose, to: CubePose, t: number): CubePose {
  const ease = t * t * (3 - 2 * t);
  return {
    x: from.x + (to.x - from.x) * ease,
    y: from.y + (to.y - from.y) * ease,
    z: from.z + (to.z - from.z) * ease,
    rx: (from.rx ?? 0) + ((to.rx ?? 0) - (from.rx ?? 0)) * ease,
    ry: (from.ry ?? 0) + ((to.ry ?? 0) - (from.ry ?? 0)) * ease,
    rz: (from.rz ?? 0) + ((to.rz ?? 0) - (from.rz ?? 0)) * ease,
  };
}

/** Journey / recorrido — de dispersión a cubo armado según etapa (0 … stageCount-1). */
export function poseForStage(
  index: number,
  size: number,
  stageIndex: number
): CubePose {
  const ids: JourneyStepId[] = [
    "discover",
    "design",
    "build",
    "test",
    "ship",
    "evolve",
  ];
  const step = ids[Math.min(stageIndex, ids.length - 1)] ?? "discover";
  return poseForJourneyStage(index, size, step);
}

/** Sección 07 — una pose narrativa por etapa del proceso. */
export function poseForJourneyStage(
  index: number,
  size: number,
  step: JourneyStepId
): CubePose {
  switch (step) {
    case "discover":
      return scramblePose(index, size);
    case "design": {
      const scattered = scramblePose(index, size);
      const aligned = aligningPose(index, size);
      return lerpPose(scattered, aligned, 0.92);
    }
    case "build":
      return organizingPose(index, size, 0.88);
    case "test": {
      const locked = assembleSolutionPose(index, size, 1);
      const k = cubiePixelSize(size) * 0.05;
      return {
        ...locked,
        x: locked.x + jitter(index, 11) * k,
        y: locked.y + jitter(index, 12) * k * 0.6,
        z: locked.z + jitter(index, 13) * k,
      };
    }
    case "ship":
      return assembleSolutionPose(index, size, 1);
    case "evolve": {
      const tight = assembleSolutionPose(index, size, 1);
      const room = latticePose(index, LATTICE_ORGANIZED, size);
      return lerpPose(tight, room, 0.2);
    }
    default:
      return scramblePose(index, size);
  }
}

export function cubieIndexAt(x: number, y: number, z: number): number {
  const xi = AXIS.indexOf(x as (typeof AXIS)[number]);
  const yi = AXIS.indexOf(y as (typeof AXIS)[number]);
  const zi = AXIS.indexOf(z as (typeof AXIS)[number]);
  return xi + yi * 3 + zi * 9;
}

/** Letras J-A-C-O-D-E en la cara frontal (z = 1). */
const FRONT_LETTERS: Record<string, Array<[number, number]>> = {
  J: [
    [1, 1],
    [1, 0],
    [1, -1],
    [0, -1],
    [-1, -1],
  ],
  A: [
    [-1, 1],
    [0, 1],
    [1, 1],
    [-1, 0],
    [0, 0],
    [1, 0],
    [-1, -1],
    [1, -1],
  ],
  C: [
    [-1, 1],
    [0, 1],
    [1, 1],
    [-1, 0],
    [-1, -1],
    [0, -1],
  ],
  O: [
    [-1, 1],
    [0, 1],
    [1, 1],
    [-1, 0],
    [1, 0],
    [-1, -1],
    [0, -1],
    [1, -1],
  ],
  D: [
    [-1, 1],
    [-1, 0],
    [-1, -1],
    [0, 1],
    [1, 0],
    [0, -1],
  ],
  E: [
    [-1, 1],
    [-1, 0],
    [-1, -1],
    [0, 1],
    [0, 0],
    [0, -1],
  ],
};

export function journeyBrandCubies(step: JourneyStepId): number[] {
  const letterByStep: Record<JourneyStepId, string | null> = {
    discover: null,
    design: "J",
    build: "A",
    test: "C",
    ship: "O",
    evolve: "E",
  };
  const letter = letterByStep[step];
  if (!letter) return [];
  const cells = FRONT_LETTERS[letter] ?? [];
  const depthLayers = [1, 0, -1] as const;
  const indices: number[] = [];
  for (const [x, y] of cells) {
    for (const z of depthLayers) {
      indices.push(cubieIndexAt(x, y, z));
    }
  }
  return indices;
}

/** Relief 3D: voxels de marca hacia cámara; resto ligeramente hundido. */
function applyJourneyLetterDepth(
  base: CubePose,
  index: number,
  size: number,
  step: JourneyStepId,
  timeSec: number
): CubePose {
  if (step === "discover") return base;

  const k = cubiePixelSize(size) / CUBIE_BASE_PX;
  const letterSet = new Set(journeyBrandCubies(step));
  const { z: gz } = gridCoord(index);
  const phase = index * 0.13;

  if (letterSet.has(index)) {
    const layerBoost = gz === 1 ? 14 : gz === 0 ? 8 : 4;
    const wobble = Math.sin(timeSec * 1.5 + phase) * k * 0.45;
    return {
      ...base,
      z: base.z + layerBoost * k + wobble,
      rx: (base.rx ?? 0) * 0.35,
      ry: (base.ry ?? 0) * 0.35,
      rz: (base.rz ?? 0) * 0.35,
    };
  }

  const sink = step === "test" ? 7 : 5;
  return {
    ...base,
    z: base.z - sink * k,
    x: base.x * 0.96,
    y: base.y * 0.96,
  };
}

/** Animación continua del cubo en sección 07. */
export function journeyDynamicPose(
  index: number,
  size: number,
  step: JourneyStepId,
  timeSec: number
): CubePose {
  const k = cubiePixelSize(size) / CUBIE_BASE_PX;
  const phase = index * 0.17 + gridCoord(index).x * 0.11;

  switch (step) {
    case "discover": {
      const s = scramblePose(index, size);
      const drift = Math.sin(timeSec * 1.15 + phase) * 5 * k;
      const lift = Math.cos(timeSec * 0.9 + phase) * 4 * k;
      return {
        ...s,
        x: s.x + drift,
        y: s.y + lift,
        z: s.z + Math.sin(timeSec * 0.7 + phase) * 3 * k,
        ry: (s.ry ?? 0) + Math.sin(timeSec + phase) * 6,
      };
    }
    case "design": {
      const target = poseForJourneyStage(index, size, "design");
      const from = scramblePose(index, size);
      const settle = Math.min(1, timeSec / 1.35);
      const eased = settle * settle * (3 - 2 * settle);
      const base = lerpPose(from, target, eased);
      return applyJourneyLetterDepth(base, index, size, step, timeSec);
    }
    case "build": {
      const order = assembleOrder(index);
      const reveal = Math.min(1, Math.max(0, (timeSec - order * 0.07) / 0.55));
      const open = latticePose(index, LATTICE_ORGANIZED, size);
      const closed = assembleSolutionPose(index, size, 1);
      const base = lerpPose(open, closed, reveal * reveal * (3 - 2 * reveal));
      return applyJourneyLetterDepth(base, index, size, step, timeSec);
    }
    case "test": {
      const base = poseForJourneyStage(index, size, "test");
      const letterHit = journeyBrandCubies(step).includes(index);
      const shake =
        Math.sin(timeSec * 14 + phase) * (letterHit ? 1.2 : 0.6) * k * 0.35;
      const shaken = {
        ...base,
        x: base.x + shake,
        y: base.y + Math.cos(timeSec * 16 + phase) * k * 0.25,
      };
      return applyJourneyLetterDepth(shaken, index, size, step, timeSec);
    }
    case "ship": {
      const base = assembleSolutionPose(index, size, 1);
      const lock = Math.min(1, timeSec / 0.9);
      const from = organizingPose(index, size, 0.5);
      const merged = lerpPose(from, base, lock);
      return applyJourneyLetterDepth(merged, index, size, step, timeSec);
    }
    case "evolve": {
      const base = poseForJourneyStage(index, size, "evolve");
      const breathe = Math.sin(timeSec * 1.1 + phase) * 3.5 * k;
      const airy = {
        ...base,
        x: base.x + breathe * 0.25,
        y: base.y + breathe * 0.35,
        z: base.z + breathe * 0.35,
      };
      return applyJourneyLetterDepth(airy, index, size, step, timeSec);
    }
    default:
      return poseForJourneyStage(index, size, step);
  }
}

export function journeyStoryForStep(step: JourneyStepId): StoryState {
  switch (step) {
    case "discover":
      return "scrambled";
    case "design":
      return "aligning";
    case "build":
      return "intervening";
    case "test":
    case "ship":
      return "solution";
    case "evolve":
      return "ordered";
    default:
      return "scrambled";
  }
}

/** Assemble from core outward (center → edges → corners). */
export function assembleOrder(index: number): number {
  const { x, y, z } = gridCoord(index);
  return Math.abs(x) + Math.abs(y) + Math.abs(z);
}

/**
 * JACODE palette distribution across the 27 cubies:
 * mostly black, magenta accents, a few whites.
 */
export function moduleTone(index: number): ModuleTone {
  const { x, y, z } = gridCoord(index);
  const r = Math.abs(x) + Math.abs(y) + Math.abs(z);
  // Center
  if (r === 0) return "dark";
  // Selected corners → magenta
  if (
    r === 3 &&
    (x + y + z === -1 || x + y + z === 1 || (x === 1 && y === -1 && z === 1))
  ) {
    return "accent";
  }
  // Face centers on ±Y and one side → light
  if (r === 1 && (y !== 0 || (x === 1 && y === 0 && z === 0))) {
    if (y === -1 || y === 1 || (x === 1 && z === 0)) return "light";
  }
  // A few more magenta accents on edges
  if (r === 2 && ((x === 1 && z === -1) || (x === -1 && y === 1) || (y === -1 && z === 1))) {
    return "accent";
  }
  return "dark";
}

export function isDarkModule(index: number): boolean {
  return moduleTone(index) === "dark";
}

export function isLightModule(index: number): boolean {
  return moduleTone(index) === "light";
}

export function isAccentModule(index: number): boolean {
  return moduleTone(index) === "accent";
}

export function poseToTransform(pose: CubePose): string {
  const { x, y, z, rx = 0, ry = 0, rz = 0 } = pose;
  return `translate3d(${x}px, ${y}px, ${z}px) rotateX(${rx}deg) rotateY(${ry}deg) rotateZ(${rz}deg)`;
}

/** CTA / contact — assembled cube with a soft breathing offset (no story loop). */
export function ambientPose(index: number, size: number, timeSec: number): CubePose {
  const base = scaledOrdered(index, size);
  const k = size / CUBE_REF_SIZE;
  const phase = index * 0.38 + gridCoord(index).x * 0.2;
  const breathe = Math.sin(timeSec * 1.05 + phase) * 3.5 * k;
  const drift = Math.cos(timeSec * 0.72 + phase * 1.1) * 2 * k;
  return {
    ...base,
    x: base.x + drift * 0.35,
    y: base.y + breathe * 0.45,
    z: base.z + breathe,
  };
}

/** Palette tuned for dark CTA band — more light on top, fewer story beats. */
/** Maps each cubie to one of 8 concept tags (IDEA … RESULTADO). */
export function conceptIndexForCubie(cubieIndex: number): number {
  const { x, y, z } = gridCoord(cubieIndex);
  const r = Math.abs(x) + Math.abs(y) + Math.abs(z);
  if (r === 0) return 5;
  if (y === -1) return 0;
  if (z === 1) return 1;
  if (y === 0 && z === 0) return 2;
  if (r === 1) return 3;
  if (y === 1) return 4;
  if (r === 2 && (x === -1 || z === -1)) return 6;
  if (r === 3) return 7;
  return (cubieIndex + 2) % 8;
}

export const CONCEPT_CUBIE_GROUPS: number[][] = (() => {
  const groups = Array.from({ length: 8 }, () => [] as number[]);
  for (let i = 0; i < MODULE_COUNT; i++) {
    groups[conceptIndexForCubie(i)].push(i);
  }
  return groups;
})();

function scaffoldPose(cubieIndex: number, size: number, timeSec: number): CubePose {
  const base = latticePose(cubieIndex, LATTICE_SOLUTION, size);
  const { x: gx, y: gy, z: gz } = gridCoord(cubieIndex);
  const k = cubiePixelSize(size) / CUBIE_BASE_PX;
  const wobble = Math.sin(timeSec * 0.85 + cubieIndex * 0.31) * 2.5 * k;
  const shell = 1.85;
  return {
    x: base.x * shell + gx * 14 * k + wobble,
    y: base.y * shell + gy * 12 * k - wobble * 0.6,
    z: base.z * shell + gz * 16 * k,
    rx: jitter(cubieIndex, 11) * 18,
    ry: jitter(cubieIndex, 12) * 22,
    rz: jitter(cubieIndex, 13) * 14,
  };
}

export function conceptFocusPose(
  cubieIndex: number,
  size: number,
  activeConceptIndex: number,
  timeSec: number
): CubePose {
  const step = conceptIndexForCubie(cubieIndex);
  const k = size / CUBE_REF_SIZE;

  if (step > activeConceptIndex) {
    return scaffoldPose(cubieIndex, size, timeSec);
  }

  const base = scaledOrdered(cubieIndex, size);
  const isSnapping = step === activeConceptIndex;
  if (!isSnapping) return base;

  const { x, y, z } = gridCoord(cubieIndex);
  const pulse = Math.sin(timeSec * 2.1 + cubieIndex * 0.14) * 1.8 * k;
  const push = 7 * k + pulse;
  const nx = x === 0 ? 0 : x;
  const ny = y === 0 ? 0 : y;
  const nz = z === 0 ? 0 : z;

  return {
    ...base,
    x: base.x + nx * push * 0.35,
    y: base.y + ny * push * 0.35,
    z: base.z + nz * push * 0.35,
  };
}

export function moduleToneConcept(
  cubieIndex: number,
  activeConceptIndex: number
): ModuleTone {
  const step = conceptIndexForCubie(cubieIndex);
  if (step > activeConceptIndex) return "scaffold";
  if (step === activeConceptIndex) return "accent";
  const { x, y, z } = gridCoord(cubieIndex);
  const r = Math.abs(x) + Math.abs(y) + Math.abs(z);
  if (r === 0 || step === 7) return "light";
  return r % 2 === 0 ? "dark" : "light";
}

export function moduleToneAmbient(index: number): ModuleTone {
  const { x, y, z } = gridCoord(index);
  if (y === -1) {
    if (x === 0 && z === 0) return "light";
    if (Math.abs(x) + Math.abs(z) === 1) return "accent";
    return "dark";
  }
  if (y === 0 && x === 1 && z === 0) return "light";
  if (y === 1 && x === -1 && z === 1) return "accent";
  if (Math.abs(x) + Math.abs(y) + Math.abs(z) === 3 && x === 1) return "accent";
  return "dark";
}
