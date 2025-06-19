import { useAnimeScope } from "@/hooks/useAnimeScope";
import { animate, stagger } from "animejs";
import { useEffect, useMemo } from "react";

interface Props {
  children: string;
  delay?: number;
}

const TextIn = ({ children, delay = 0 }: Props) => {
  const { root, scope } = useAnimeScope();

  // Split text into letters wrapped in spans
  const letterSpans = useMemo(() => {
    return children.split("").map((char, index) => (
      <span key={index} className="letter inline-block translate-y-full">
        {char === " " ? "\u00A0" : char}
      </span>
    ));
  }, [children]);

  useEffect(() => {
    scope.current?.add(() => {
      animate(".letter", {
        translateY: "-100%",
        duration: 600,
        delay: stagger(30, { start: delay }),
        ease: "outCirc",
      });
    });
  }, [scope, delay]);

  return (
    <div
      ref={root}
      className="div overflow-hidden inline-block pointer-events-none"
    >
      <div className="inline-block">{letterSpans}</div>
    </div>
  );
};

export default TextIn;
