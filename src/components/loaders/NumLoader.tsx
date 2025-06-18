import { useAnimeScope } from "@/hooks/useAnimeScope";
import { animate, utils, waapi } from "animejs";
import { useEffect } from "react";

const NumLoader = ({ fn }: { fn?: () => void | null }) => {
  const { root, scope } = useAnimeScope();

  useEffect(() => {
    if (scope.current == null) return;

    scope.current.add(() => {
      animate(".txt > span", {
        innerHTML: [0, 100],
        ease: "inOutExpo",
        duration: 2000,
        modifier: utils.round(0),
        onComplete: () => {
          if (fn) {
            fn();
          }
        },
      });
      waapi.animate(".txt", {
        scale: [1, 1.1, 1],
        duration: 2000,
      });
    });
  }, [scope, fn]);

  return (
    <div className="center !items-end gap-1" ref={root}>
      <div className="text-7xl tracking-tighter txt font-pixel">
        <span>0</span>
      </div>
      <div>%</div>
    </div>
  );
};
export default NumLoader;
