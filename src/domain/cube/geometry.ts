import type { CubePose, StoryState } from "@domain/models/types";

/**
 * ——— Historia del cubo (3 pasos) ———
 * 1. Complejidad (`scrambled`) — disperso + inclinación fuerte.
 * 2. Organización (`aligning` → `intervening`) — rejilla abierta + inclinación suave (ORGANIZATION_TILT_SCALE).
 * 3. Solución (`solution`) — armado (LATTICE_SOLUTION) + piezas derechas (rotación 0).
 *
 * Ajustes: `size` · `CUBIE_BASE_PX` · `LATTICE_*` · `ORGANIZATION_TILT_SCALE` · `COMPLEXITY_ROT_*`.
 */
export const CUBE_REF_SIZE = 180;
export const CUBIE_BASE_PX = 30;
/** @deprecated use CUBIE_BASE_PX */
export const CUBIE_RENDER = CUBIE_BASE_PX;

/** Nunca por debajo: evita cubo “cerrado” (caras pegadas). */
export const LATTICE_MIN = 1.08;

/** Paso 2 — cuadrando el cubo (rejilla visible, aún algo abierta). */
export const LATTICE_ORGANIZED = 1.6;

/** Paso 3 — cubo armado (más junto que organización, siempre ≥ LATTICE_MIN). */
export const LATTICE_SOLUTION = 1.16;

/** Inclinación máxima en complejidad (grados, vía jitter). */
export const COMPLEXITY_ROT_RX = 32;
export const COMPLEXITY_ROT_RY = 38;
export const COMPLEXITY_ROT_RZ = 24;

/** Organización: fracción de la inclinación de complejidad (solución → 0). */
export const ORGANIZATION_TILT_SCALE = 0.24;

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

export function complexityRotation(index: number): Pick<CubePose, "rx" | "ry" | "rz"> {
  return {
    rx: jitter(index, 5) * COMPLEXITY_ROT_RX,
    ry: jitter(index, 6) * COMPLEXITY_ROT_RY,
    rz: jitter(index, 7) * COMPLEXITY_ROT_RZ,
  };
}

/** Inclinación suave en organización (misma pieza, menos grados que complejidad). */
export function organizationTilt(index: number): Pick<CubePose, "rx" | "ry" | "rz"> {
  const s = ORGANIZATION_TILT_SCALE;
  return {
    rx: jitter(index, 5) * COMPLEXITY_ROT_RX * s,
    ry: jitter(index, 6) * COMPLEXITY_ROT_RY * s,
    rz: jitter(index, 7) * COMPLEXITY_ROT_RZ * s,
  };
}

export function organizedLatticePose(
  index: number,
  size: number = CUBE_REF_SIZE
): CubePose {
  return { ...latticePose(index, LATTICE_ORGANIZED, size), ...organizationTilt(index) };
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
    ...complexityRotation(index),
  };
}

/** Organización (a) — misma dispersión; inclinación baja (≠ complejidad, ≠ solución). */
export function aligningPose(index: number, size: number = CUBE_REF_SIZE): CubePose {
  const scramble = scramblePose(index, size);
  return {
    x: scramble.x,
    y: scramble.y,
    z: scramble.z,
    ...organizationTilt(index),
  };
}

/**
 * Organización (b) — cuadrar en rejilla abierta (sin acercar al factor de solución).
 */
export function organizingPose(index: number, size: number, progress = 1): CubePose {
  const from = aligningPose(index, size);
  const structured = organizedLatticePose(index, size);

  const t = Math.min(1, Math.max(0, progress));
  const ease = t * t * (3 - 2 * t);
  const tilt = organizationTilt(index);
  return {
    x: from.x + (structured.x - from.x) * ease,
    y: from.y + (structured.y - from.y) * ease,
    z: from.z + (structured.z - from.z) * ease,
    rx: tilt.rx,
    ry: tilt.ry,
    rz: tilt.rz,
  };
}

/** Paso 3 — armado: acercar rejilla y enderezar (rot → 0). */
export function assembleSolutionPose(
  index: number,
  size: number,
  progress = 1
): CubePose {
  const from = organizedLatticePose(index, size);
  const to = latticePose(index, LATTICE_SOLUTION, size);
  const t = Math.min(1, Math.max(0, progress));
  const ease = t * t * (3 - 2 * t);
  const { rx = 0, ry = 0, rz = 0 } = organizationTilt(index);
  return {
    x: from.x + (to.x - from.x) * ease,
    y: from.y + (to.y - from.y) * ease,
    z: from.z + (to.z - from.z) * ease,
    rx: rx * (1 - ease),
    ry: ry * (1 - ease),
    rz: rz * (1 - ease),
  };
}

export function poseForStory(
  state: StoryState,
  index: number,
  size: number
): CubePose {
  if (state === "scrambled") return scramblePose(index, size);
  if (state === "aligning") return aligningPose(index, size);
  if (state === "intervening") return organizedLatticePose(index, size);
  if (state === "ordered") return organizedLatticePose(index, size);
  return assembleSolutionPose(index, size, 1);
}

export function poseForStage(
  index: number,
  size: number,
  stageIndex: number
): CubePose {
  const base = scaledOrdered(index, size);
  const offset = (stageIndex % 6) * 6;
  const twist = ((index + stageIndex) % 3) - 1;
  return {
    x: base.x + twist * offset * 0.25,
    y: base.y - twist * offset * 0.18,
    z: base.z + ((index + stageIndex) % 2) * offset * 0.12,
    rx: twist * 3,
    ry: stageIndex * 2,
    rz: 0,
  };
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
