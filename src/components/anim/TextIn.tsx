import { useAnimeScope } from "@/hooks/useAnimeScope";
import { animate, stagger } from "animejs";
import { useEffect, useMemo, useRef, useState } from "react";

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
  const containerRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  const letterSpans = useMemo(() => {
    const className = `letter inline-block ${
      alternative ? "-translate-y-full" : "translate-y-full"
    }`;

    if (!TextStagger) return <span className={className}>{children}</span>;

    return children.split("").map((char, index) => (
      <span key={index} className={className}>
        {char === " " ? "\u00A0" : char}
      </span>
    ));
  }, [children, alternative, TextStagger]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.8 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;

    scope.current?.add(() => {
      animate(".letter", {
        translateY: alternative ? "100%" : "-100%",
        duration: 600,
        delay: stagger(30, { start: delay }),
        ease: "outCirc",
      });
    });
  }, [scope, delay, alternative, inView]);

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
