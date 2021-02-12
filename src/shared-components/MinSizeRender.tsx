import { useState, useLayoutEffect } from "react";

type WindowSize = [width: number, height: number];

export function useWindowSize(): WindowSize {
  const [size, setSize] = useState<WindowSize>([0, 0]);

  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }

    window.addEventListener("resize", updateSize);
    updateSize();

    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return size;
}
