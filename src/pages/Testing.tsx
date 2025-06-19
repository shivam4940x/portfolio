import { animate } from "animejs";
import { useEffect, useRef } from "react";

const ease = [
  "linear",
  "in",
  "out",
  "inOut",
  "inQuad",
  "outQuad",
  "inOutQuad",
  "inCubic",
  "outCubic",
  "inOutCubic",
  "inQuart",
  "outQuart",
  "inOutQuart",
  "inQuint",
  "outQuint",
  "inOutQuint",
  "inSine",
  "outSine",
  "inOutSine",
  "inCirc",
  "outCirc",
  "inOutCirc",
  "inExpo",
  "outExpo",
  "inOutExpo",
  "inBounce",
  "outBounce",
  "inOutBounce",
  "inBack",
  "outBack",
  "inOutBack",
  "inElastic",
  "outElastic",
  "inOutElastic",
];
const Easings = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    containerRef.current.querySelectorAll(".box").forEach((el, index) => {
      animate(el, {
        translateX: 800,
        direction: "alternate",
        loop: true,
        duration: 2000,
        ease: ease[index],
      });
    });
  }, []);

  return (
    <div ref={containerRef} className="p-5 space-y-2">
      {ease.map((easing, idx) => (
        <div key={idx} className="flex my-2 py-1 border-b /20 items-center">
          <span className="w-30 ">{easing}</span>
          <div className="grow">
            <div
              className="box bg-complimentary w-10 aspect-square"
              title={easing}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
};
const Testing = () => {
  return (
    <div>
      <Easings />
    </div>
  );
};
export default Testing;
