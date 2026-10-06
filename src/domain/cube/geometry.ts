import type { CubePose, StoryState } from "@domain/models/types";

export const ORDERED_POSES: CubePose[] = [
  { x: -58, y: -58, z: -58 },
  { x: 0, y: -58, z: -58 },
  { x: 58, y: -58, z: 0 },
  { x: -58, y: 0, z: -58 },
  { x: 0, y: 0, z: 0 },
  { x: 58, y: 0, z: 58 },
  { x: -58, y: 58, z: 0 },
  { x: 0, y: 58, z: 58 },
  { x: 58, y: 58, z: 58 },
  { x: -58, y: -58, z: 58 },
  { x: 58, y: -58, z: -58 },
  { x: -58, y: 58, z: -58 },
];

export const MODULE_COUNT = ORDERED_POSES.length;

export function scramblePose(index: number, scale = 1): CubePose {
  const spread = (90 + (index % 5) * 18) * scale;
  const angle = (index / MODULE_COUNT) * Math.PI * 2;
  return {
    x: Math.cos(angle) * spread + (((index * 17) % 40) - 20) * scale,
    y: Math.sin(angle * 1.3) * spread * 0.7 + (((index * 13) % 50) - 25) * scale,
    z: (((index * 29) % 100) - 50) * scale,
    rx: ((index * 47) % 80) - 40,
    ry: ((index * 61) % 100) - 50,
    rz: ((index * 37) % 60) - 30,
  };
}

export function scaledOrdered(index: number, size: number): CubePose {
  const scale = size / 180;
  const base = ORDERED_POSES[index];
  return { x: base.x * scale, y: base.y * scale, z: base.z * scale };
}

export function poseForStory(
  state: StoryState,
  index: number,
  size: number
): CubePose {
  const scale = size / 180;
  if (state === "scrambled") return scramblePose(index, scale);
  if (state === "intervening") {
    const mid = scramblePose(index, scale);
    const ord = scaledOrdered(index, size);
    return {
      x: (mid.x + ord.x) / 2,
      y: (mid.y + ord.y) / 2,
      z: (mid.z + ord.z) / 2,
      rx: (mid.rx ?? 0) / 2,
      ry: (mid.ry ?? 0) / 2,
      rz: (mid.rz ?? 0) / 2,
    };
  }
  return { ...scaledOrdered(index, size), rx: 0, ry: 0, rz: 0 };
}

export function poseForStage(
  index: number,
  size: number,
  stageIndex: number
): CubePose {
  const base = scaledOrdered(index, size);
  const offset = (stageIndex % 6) * 8;
  const twist = ((index + stageIndex) % 3) - 1;
  return {
    x: base.x + twist * offset * 0.3,
    y: base.y - twist * offset * 0.2,
    z: base.z + ((index + stageIndex) % 2) * offset * 0.15,
    rx: twist * 4,
    ry: stageIndex * 3,
    rz: 0,
  };
}

export function isDarkModule(index: number): boolean {
  return index % 4 === 0 || index === 7;
}

export function poseToTransform(pose: CubePose): string {
  const { x, y, z, rx = 0, ry = 0, rz = 0 } = pose;
  return `translate3d(${x}px, ${y}px, ${z}px) rotateX(${rx}deg) rotateY(${ry}deg) rotateZ(${rz}deg)`;
}
