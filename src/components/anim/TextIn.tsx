import { useAnimeScope } from "@/hooks/useAnimeScope";
import { animate, stagger } from "animejs";
import { useEffect, useMemo, useRef, useState } from "react";

interface Props {
  children: string;
  delay?: number;
  duration?: number;
  alternative?: boolean;
  TextStagger?: boolean;
  threshold?: number;
  space?: number;
}

const TextIn = ({
  children,
  delay = 0,
  alternative = false,
  TextStagger = true,
  duration = 600,
  threshold = 0.8,
  space = 0,
}: Props) => {
  const { root, scope } = useAnimeScope();
  const containerRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  const letterSpans = useMemo(() => {
    const translateClass = alternative
      ? "-translate-y-full"
      : "translate-y-full";

    if (!TextStagger) {
      return children.split(" ").map((word, index) => (
        <span
          key={index}
          className="inline-block overflow-hidden"
          style={{
            marginLeft: `${space}px`,
            marginRight: `${space}px`,
          }}
        >
          <span className={`letter inline-block ${translateClass}`}>
            {word}
          </span>
          {index < children.split(" ").length - 1 && "\u00A0"}
        </span>
      ));
    }

    return children.split("").map((char, index) => (
      <span
        key={index}
        className="inline-block overflow-hidden"
        style={{
          marginLeft: `${space}px`,
          marginRight: `${space}px`,
        }}
      >
        <span className={`letter inline-block ${translateClass}`}>
          {char === " " ? "\u00A0" : char}
        </span>
      </span>
    ));
  }, [children, alternative, TextStagger, space]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  useEffect(() => {
    if (!inView) return;
    const stag = TextStagger ? 20 : 50;
    scope.current?.add(() => {
      animate(".letter", {
        translateY: alternative ? "100%" : "-100%",
        duration,
        delay: stagger(stag, { start: delay }),
        ease: "outCirc",
      });
    });
  }, [scope, delay, alternative, inView, duration, TextStagger]);

  return (
    <div
      ref={(el) => {
        root.current = el;
        containerRef.current = el;
      }}
      className="overflow-hidden inline-block pointer-events-none"
    >
      <div className="inline-block">{letterSpans}</div>
    </div>
  );
};

export default TextIn;
