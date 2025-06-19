import { useAnimeScope } from "@/hooks/useAnimeScope";
import { animate } from "animejs";
import { useEffect, useState } from "react";

const movers = {
  0: { translateX: -20, translateY: -20 }, // top
  2: { translateX: 20, translateY: -20 }, // left
  6: { translateX: -20, translateY: 20 }, // right
  8: { translateX: 20, translateY: 20 }, // bottom
};

const MenuIcon = ({ fn }: { fn: () => void }) => {
  const { root, scope } = useAnimeScope();
  const [track, setTrack] = useState({
    hover: false,
    active: false,
  });

  useEffect(() => {
    scope.current?.add((self) => {
      self.add("hoverIn", () => {
        if (track.active) return;
        setTrack((pre) => ({ ...pre, hover: true }));
        Object.entries(movers).forEach(([index, transform]) => {
          animate(`.dot-${index}`, {
            ...transform,
            duration: 300,
            ease: "inOutExpo",
          });
        });
      });

      self.add("hoverOut", () => {
        if (track.active) return;
        setTrack((pre) => ({ ...pre, hover: false }));
        Object.keys(movers).forEach((index) => {
          animate(`.dot-${index}`, {
            translateX: 0,
            translateY: 0,
            duration: 300,
            ease: "inOutExpo",
          });
        });
      });

      self.add("click", () => {
        setTrack((pre) => ({ ...pre, active: !pre.active }));

        animate(".burgerWrapper", {
          rotate: track.active ? "0deg" : "45deg",
          duration: 300,
          ease: "inOutExpo",
          delay: 1,
          onComplete: () => {
            if (fn) {
              fn();
            }
          },
        });
        if (!track.active) {
          Object.entries(movers).forEach(([index, transform]) => {
            animate(`.dot-${index}`, {
              ...transform,
              duration: 300,
              ease: "inOutExpo",
            });
          });
        } else {
          Object.keys(movers).forEach((index) => {
            animate(`.dot-${index}`, {
              translateX: 0,
              translateY: 0,
              duration: 300,
              ease: "inOutExpo",
            });
          });
        }
      });
    });
  }, [scope, track, fn]);

  return (
    <div ref={root} className="center relative div fadeIn">
      <div
        onMouseEnter={() => scope.current?.methods.hoverIn()}
        onMouseLeave={() => scope.current?.methods.hoverOut()}
        onClick={() => scope.current?.methods.click()}
        className="cursor-pointer grid-cols-3 grid-rows-3 grid md:gap-2 gap-1 overflow-hidden md:p-2 relative burgerWrapper"
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
