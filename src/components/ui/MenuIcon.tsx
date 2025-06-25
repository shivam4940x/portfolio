import { useAnimeScope } from "@/hooks/useAnimeScope";
import { animate } from "animejs";
import { useCallback, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

const movers = {
  0: { translateX: -20, translateY: -20 },
  2: { translateX: 20, translateY: -20 },
  6: { translateX: -20, translateY: 20 },
  8: { translateX: 20, translateY: 20 },
};

interface Props {
  fn: { open: () => void; close: () => void };
}

const MenuIcon = ({ fn }: Props) => {
  const { root, scope } = useAnimeScope();
  const location = useLocation();

  const [track, setTrack] = useState({ hover: false, active: false });
  const trackRef = useRef(track);

  useEffect(() => {
    trackRef.current = track;
  }, [track]);

  const hoverIn = useCallback(() => {
    if (trackRef.current.active) return;
    setTrack((prev) => ({ ...prev, hover: true }));
    Object.entries(movers).forEach(([index, transform]) => {
      animate(`.dot-${index}`, {
        ...transform,
        duration: 300,
        ease: "inOutExpo",
      });
    });
  }, []);

  const hoverOut = useCallback(() => {
    if (trackRef.current.active) return;
    setTrack((prev) => ({ ...prev, hover: false }));
    Object.keys(movers).forEach((index) => {
      animate(`.dot-${index}`, {
        translateX: 0,
        translateY: 0,
        duration: 300,
        ease: "inOutExpo",
      });
    });
  }, []);

  const handleClick = useCallback(() => {
    const isActive = trackRef.current.active;
    setTrack((prev) => ({ ...prev, active: !isActive }));
    if (fn) {
      if (isActive) {
        fn.close();
      } else {
        fn.open();
      }
    }
    animate(".burgerWrapper", {
      rotate: isActive ? "0deg" : "45deg",
      duration: 300,
      ease: "inOutExpo",
      delay: 1,
    });

    const animation = isActive ? { translateX: 0, translateY: 0 } : undefined;
    Object.entries(movers).forEach(([index, transform]) => {
      animate(`.dot-${index}`, {
        ...(animation || transform),
        duration: 300,
        ease: "inOutExpo",
      });
    });
  }, [fn]);

  useEffect(() => {
    scope.current?.add((self) => {
      self.add("hoverIn", hoverIn);
      self.add("hoverOut", hoverOut);
      self.add("click", handleClick);
    });
  }, [scope, hoverIn, hoverOut, handleClick]);

  useEffect(() => {
    // Reset state
    setTrack({ hover: false, active: false });

    // Reset dot positions
    Object.keys(movers).forEach((index) => {
      animate(`.dot-${index}`, {
        translateX: 0,
        translateY: 0,
        duration: 300,
        ease: "inOutExpo",
      });
    });

    // Reset burger rotation
    animate(".burgerWrapper", {
      rotate: "0deg",
      duration: 300,
      ease: "inOutExpo",
    });
  }, [location]);
  

  return (
    <div ref={root} className="center relative div fadeIn">
      <div
        onMouseEnter={() => scope.current?.methods.hoverIn()}
        onMouseLeave={() => scope.current?.methods.hoverOut()}
        onClick={() => scope.current?.methods.click()}
        className="cursor-pointer grid-cols-3 grid-rows-3 grid xl:gap-2 gap-1 overflow-hidden md:p-2 relative burgerWrapper"
      >
        {Array.from({ length: 9 }, (_, i) => (
          <div key={i}>
            <svg
              className={`dot-${i} w-2 h-2`}
              viewBox="0 0 4 4"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="0.5"
                y="0.5"
                width="3"
                height="3"
                stroke="#DAF9FF"
                strokeWidth="0.5"
              />
            </svg>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuIcon;
