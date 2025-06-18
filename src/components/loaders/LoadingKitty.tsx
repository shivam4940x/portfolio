import { useAnimeScope } from "@/hooks/useAnimeScope";
import {  stagger, waapi } from "animejs";
import { useEffect } from "react";

const LoadingKitty = () => {
  const { root, scope } = useAnimeScope();

  useEffect(() => {
    if (scope.current == null) return;

    scope.current.add(() => {
      waapi.animate(".balls", {
        opacity: [0, 1, 0],
        duration: 2000,
        loop: true,
        delay: stagger(150), // optional fine-tuned stagger
      });
    });
  }, [scope]);

  return (
    <div className="w-max h-max" ref={root}>
      <div className="center flex-col">
        <div className="w-20 aspect-square ">
          <img src="/loadingKitty.png" className="logo" />
        </div>
        <div className="flex gap-3  h-full">
          {Array.from({ length: 7 }, (_, i) => (
            <div
              key={i}
              className="w-1 h-1 bg-secondary dark:bg-secondary rounded-full balls opacity-0"
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default LoadingKitty;
