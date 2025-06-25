import TextIn from "@/components/anim/TextIn";
import TransitionLink from "@/components/ui/TransitionLink";
import { work as workData } from "@/json/Work.json";
import { animate } from "animejs";
import { useEffect, useRef } from "react";

interface WorkItem {
  heading: string;
  sub: string;
  techStack?: string[];
}
const List = ({ heading, sub, techStack }: WorkItem) => {
  const followTheMouseMr = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const currentPos = useRef({ x: 0, y: 0 });
  const animationFrame = useRef<number>(0);
  const scaleRef = useRef(0);

  useEffect(() => {
    const animateFollow = () => {
      currentPos.current.x += (mousePos.current.x - currentPos.current.x) * 0.1;
      currentPos.current.y += (mousePos.current.y - currentPos.current.y) * 0.1;

      const el = followTheMouseMr.current;
      if (el) {
        el.style.transform = `translate(${currentPos.current.x}px, ${currentPos.current.y}px) scale(${scaleRef.current})`;
      }

      animationFrame.current = requestAnimationFrame(animateFollow);
    };

    animationFrame.current = requestAnimationFrame(animateFollow);
    return () => cancelAnimationFrame(animationFrame.current);
  }, []);

  const mouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mousePos.current.x = e.clientX - rect.left;
    mousePos.current.y = e.clientY - rect.top;
  };

  const animateScale = (targetScale: number) => {
    const el = followTheMouseMr.current;
    animate(scaleRef, {
      current: targetScale,
      easing: "easeOutQuad",
      duration: 300,
      update: () => {
        if (el) {
          el.style.transform = `translate(${currentPos.current.x}px, ${currentPos.current.y}px) scale(${scaleRef.current})`;
        }
      },
    });
  };

  return (
    <TransitionLink
      to={`/work/abc`}
      className="border-b last:border-b-0 border-border-light"
    >
      <div
        key={heading}
        onMouseMove={mouseMove}
        onMouseEnter={() => animateScale(1)}
        onMouseLeave={() => animateScale(0)}
        className="min-h-36 bg-dull-black px-12 center py-12 relative group overflow-hidden cursor-pointer"
      >
        <div
          ref={followTheMouseMr}
          className="absolute aspect-square top-0 left-0 z-50 -translate-x-1/2 -translate-y-1/2 bg-complimentary rounded-full text-black font-semibold p-4 center border border-white pointer-events-none"
          style={{ transform: "scale(0)" }}
        >
          View
        </div>
        <div className="grid div justify-between items-center grid-cols-5 gap-2 grayscale-100 group-hover:scale-105 group-hover:grayscale-0 duration-300">
          <div className="flex gap-6 col-span-3">
            <div className="font-pixel text-5xl center">
              <span>&gt;</span>
            </div>
            <div className="space-y-3">
              <div className="relative w-max py-2 px-4">
                <h3 className="text-xl md:text-2xl font-semibold relative z-10">
                  {heading}
                </h3>
                <div className="absolute takeScreen">
                  <div className="div relative">
                    <div className="h-4 w-6 border-l border-t absolute top-0 left-0"></div>
                    <div className="h-4 w-6 border-r border-b absolute bottom-0 right-0"></div>
                  </div>
                </div>
              </div>
              <p className="text-sm md:text-base text-muted">{sub}</p>
            </div>
          </div>
          <div className="col-span-2">
            <ul className="mt-2 flex flex-wrap gap-1">
              {techStack?.map((tech, index) => (
                <li
                  key={index}
                  className="px-2 py-1 text-xs md:text-sm bg-muted/10 border border-border"
                >
                  {tech}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </TransitionLink>
  );
};
const Work = () => {
  return (
    <>
      <section className="min-h-full mt-8">
        <div className="border-b px-8 py-2">
          <h1 className="heading">
            <TextIn>Work</TextIn>
          </h1>
        </div>
        <div className="mt-8">
          <div className="px-12 py-4">
            <h2 className="heading_2">
              <TextIn
                alternative={true}
                delay={300}
              >{`Personal Works - ${workData.personal.length}`}</TextIn>
            </h2>
          </div>
          <div className="w-full border-t border-b border-border-light">
            {workData.personal.map((item) => {
              return List(item);
            })}
          </div>
        </div>
        <div className="mt-8">
          <div className="px-12 py-4">
            <h2 className="heading_2">
              <TextIn
                alternative={true}
                delay={300}
              >{`Professional work - ${workData["Client Work"].length}`}</TextIn>
            </h2>
          </div>
          <div className="w-full border-t border-b border-border-light">
            {workData["Client Work"].length == 0 ? (
              <div className="center text-3xl py-5">
                Nothing yet... but looking forward for it!
              </div>
            ) : (
              workData["Client Work"].map((item) => {
                return List(item);
              })
            )}
          </div>
        </div>
      </section>
    </>
  );
};
export default Work;
