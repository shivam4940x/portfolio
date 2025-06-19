import { useAnimeScope } from "@/hooks/useAnimeScope";
import { animate, stagger } from "animejs";
import { useEffect, useMemo } from "react";

interface Props {
  children: string;
  delay?: number;
  alternative?: boolean;
  TextStagger?: boolean;
}

const TextIn = ({
  children,
  delay = 0,
  alternative = false,
  TextStagger = true,
}: Props) => {
  const { root, scope } = useAnimeScope();

  // Split text into letters wrapped in spans

  const letterSpans = useMemo(() => {
    let className;
    if (alternative) {
      className = "letter inline-block -translate-y-full";
    } else {
      className = "letter inline-block translate-y-full";
    }

    if (!TextStagger) return <span className={className}>{children}</span>;

    return children.split("").map((char, index) => {
      return (
        <span key={index} className={className}>
          {char === " " ? "\u00A0" : char}
        </span>
      );
    });
  }, [children, alternative, TextStagger]);

  useEffect(() => {
    scope.current?.add(() => {
      animate(".letter", {
        translateY: alternative ? "100%" : "-100%",
        duration: 600,
        delay: stagger(30, { start: delay }),
        ease: "outCirc",
      });
    });
  }, [scope, delay, alternative]);

  return (
    <div
      ref={root}
      className="overflow-hidden inline-block pointer-events-none"
    >
      <div className="inline-block">{letterSpans}</div>
    </div>
  );
};

export default TextIn;
