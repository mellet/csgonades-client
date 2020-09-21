import { FC, useState, RefObject, useEffect, useRef } from "react";

export const LazyLoadAd: FC = ({ children }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [displayUnit, setDisplayUnit] = useState(false);

  useVisibility(ref, () => setDisplayUnit(true));

  return (
    <>
      <div ref={ref}>{displayUnit && children}</div>
    </>
  );
};

const useVisibility = (ref: RefObject<HTMLElement>, callback: any) => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio === 1) {
          callback();
          if (ref.current) {
            observer.unobserve(ref.current);
          }
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 1.0,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
