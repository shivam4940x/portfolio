import { useAnimeScope } from "@/hooks/useAnimeScope";
import { info } from "@/json/About.json";
import { animate, stagger } from "animejs";
import { useEffect } from "react";
const Stats = () => {
  const { root, scope } = useAnimeScope();
  useEffect(() => {
    if (!scope.current) return;
    scope.current.add(() => {
      animate(".anime", {
        y: "100%",
        duration: 500,
        delay: stagger(150),
        ease:"inOutCubic"
      });
    });
  }, [scope]);
  return (
    <div ref={root} className="space-y-3 px-2 w-max">
      {info.map(({ label, value }) => (
        <div key={label} className="capitalize lg:gap-6 gap-2 overflow-hidden">
          <div className="flex items-center anime -translate-y-full">
            <div>
              <span className="font-pixel text-secondary lg:text-2xl text-lg">
                &gt;
              </span>
            </div>
            <div className="flex items-center gap-2 lg:gap-3">
              <h6 className="">{label}:</h6>{" "}
              <p className="text-mute-white/75 font-medium lg:text-2xl text-lg">
                {value}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default Stats;
