import Frame from "@/components/ui/Frame";
import { animate } from "animejs";
import { useEffect, useRef } from "react";

interface WorkItem {
  name: string;
  heading: string;
  sub: string;
  techStack?: string[];
  href?: string;
}
const List = ({ heading, sub, techStack, href }: WorkItem) => {
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
    <a
      href={href}
      target="_blank"
      className="border-b last:border-b-0 border-border-light"
    >
      <div
        key={heading}
        onMouseMove={mouseMove}
        onMouseEnter={() => animateScale(1)}
        onMouseLeave={() => animateScale(0)}
        className="min-h-36 bg-dull-black md:p-12 px-6 py-10 relative group overflow-hidden cursor-pointer"
      >
        <div
          ref={followTheMouseMr}
          className="absolute aspect-square top-0 left-0 z-50 hidden md:flex -translate-x-1/2 -translate-y-1/2 bg-complimentary rounded-full text-black font-semibold p-4  justify-center items-center border border-white pointer-events-none"
          style={{ transform: "scale(0)" }}
        >
          View
        </div>
        <div className="max-w-full flex flex-col md:grayscale-100 md:flex-row md:grid md:grid-cols-5 md:gap-4 items-center justify-between group-hover:scale-105 group-hover:grayscale-0 duration-300">
          {/* Left Section */}
          <div className="flex gap-6 col-span-3 items-center w-full md:max-w-full">
            <div className="font-pixel md:text-5xl text-center hidden lg:block text-secondary">
              <span>&gt;</span>
            </div>
            <div className="space-y-4 max-w-full">
              <Frame className="md:w-max w-full max-w-full py-2 px-4">
                <h3 className="text-xl md:text-2xl text-center md:text-left font-semibold relative z-10 break-words">
                  <span className="text-complimentary">{heading}</span>
                </h3>
              </Frame>
              <p className="text-base md:text-lg break-words">{sub}</p>
            </div>
          </div>

          {/* Right Section */}
          <div className="col-span-2 mt-8 md:mt-0">
            <ul className="flex flex-wrap gap-2 justify-end md:justify-start">
              {techStack?.map((tech, index) => (
                <li
                  key={index}
                  className="px-2 py-1 text-xs md:text-sm bg-muted/10 border border-secondary/70 break-words"
                >
                  {tech}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </a>
  );
};

export default List;
