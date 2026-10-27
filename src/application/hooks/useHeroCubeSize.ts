import { useEffect, useState } from "react";

const DESKTOP = 480;
const TABLET = 280;
const PHONE = 248;

function readHeroCubeSize(): number {
  if (typeof window === "undefined") return DESKTOP;
  if (window.matchMedia("(max-width: 480px)").matches) return PHONE;
  if (window.matchMedia("(max-width: 1024px)").matches) return TABLET;
  return DESKTOP;
}

export function useHeroCubeSize(): number {
  const [size, setSize] = useState(readHeroCubeSize);

  useEffect(() => {
    const mqlPhone = window.matchMedia("(max-width: 480px)");
    const mqlTablet = window.matchMedia("(max-width: 1024px)");

    const sync = () => setSize(readHeroCubeSize());

    mqlPhone.addEventListener("change", sync);
    mqlTablet.addEventListener("change", sync);
    sync();

    return () => {
      mqlPhone.removeEventListener("change", sync);
      mqlTablet.removeEventListener("change", sync);
    };
  }, []);

  return size;
}
