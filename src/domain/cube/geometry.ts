import type { CubePose, StoryState } from "@domain/models/types";

/** Spacing between cubie centers when the 3×3×3 is fully assembled (px @ size 180). */
export const CUBIE_STEP = 58;

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

export type ModuleTone = "dark" | "accent" | "light";

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

export function scaledOrdered(index: number, size: number): CubePose {
  const scale = size / 180;
  const base = ORDERED_POSES[index];
  return {
    x: base.x * scale,
    y: base.y * scale,
    z: base.z * scale,
    rx: 0,
    ry: 0,
    rz: 0,
  };
}

/**
 * Complejidad — same 27 cubies, exploded off their home slots.
 * Still reads as one disassembled Rubik, not a random cloud.
 */
export function scramblePose(index: number, scale = 1): CubePose {
  const base = ORDERED_POSES[index];
  const { x: gx, y: gy, z: gz } = gridCoord(index);
  const radial = 0.72 + Math.abs(jitter(index, 1)) * 0.45;
  return {
    x: base.x * scale * (1 + radial * 0.7) + jitter(index, 3) * 10 * scale + gx * 6 * scale,
    y: base.y * scale * (1 + radial * 0.6) + jitter(index, 4) * 9 * scale + gy * 5 * scale,
    z: base.z * scale * (1 + radial * 0.65) + jitter(index, 2) * 28 * scale + gz * 6 * scale,
    rx: jitter(index, 5) * 32,
    ry: jitter(index, 6) * 38,
    rz: jitter(index, 7) * 24,
  };
}

/**
 * Organización — 27 cubies on an expanded 3×3×3 lattice (visible rows/cols/layers).
 */
export function organizingPose(index: number, size: number, progress = 0.55): CubePose {
  const scale = size / 180;
  const base = ORDERED_POSES[index];
  const scramble = scramblePose(index, scale);
  const expand = 1.62;
  const structured: CubePose = {
    x: base.x * scale * expand + jitter(index, 8) * 3 * scale,
    y: base.y * scale * expand + jitter(index, 9) * 3 * scale,
    z: base.z * scale * expand + jitter(index, 10) * 4 * scale,
    rx: jitter(index, 11) * 10,
    ry: jitter(index, 12) * 12,
    rz: jitter(index, 13) * 8,
  };

  const t = Math.min(1, Math.max(0, progress));
  const ease = t * t * (3 - 2 * t);
  return {
    x: scramble.x + (structured.x - scramble.x) * ease,
    y: scramble.y + (structured.y - scramble.y) * ease,
    z: scramble.z + (structured.z - scramble.z) * ease,
    rx: (scramble.rx ?? 0) + ((structured.rx ?? 0) - (scramble.rx ?? 0)) * ease,
    ry: (scramble.ry ?? 0) + ((structured.ry ?? 0) - (scramble.ry ?? 0)) * ease,
    rz: (scramble.rz ?? 0) + ((structured.rz ?? 0) - (scramble.rz ?? 0)) * ease,
  };
}

export function poseForStory(
  state: StoryState,
  index: number,
  size: number
): CubePose {
  const scale = size / 180;
  if (state === "scrambled") return scramblePose(index, scale);
  if (state === "intervening") return organizingPose(index, size, 0.72);
  return scaledOrdered(index, size);
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
