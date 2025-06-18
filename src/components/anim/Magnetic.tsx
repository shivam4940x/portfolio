import { useAnimeScope } from "@/hooks/useAnimeScope";
import { useEffect, useRef } from "react";
import type { ReactNode } from "react";
import { animate, createSpring } from "animejs";

interface Props {
  children: ReactNode;
  className?: string;
  strength?: number;
}

const Magnetic = ({ children, className = "", strength = 20 }: Props) => {
  const { root, scope } = useAnimeScope<HTMLDivElement>();
  const itemRef = useRef<HTMLDivElement>(null);
  const animationFrame = useRef<number | null>(null);

  useEffect(() => {
    const el = root.current;
    const inner = itemRef.current;
    if (!el || !inner) return;

    let currentX = 0;
    let currentY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      if (animationFrame.current) cancelAnimationFrame(animationFrame.current);

      animationFrame.current = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const relX = e.clientX - rect.left - rect.width / 2;
        const relY = e.clientY - rect.top - rect.height / 2;

        const newX = (relX / rect.width) * strength;
        const newY = (relY / rect.height) * strength;

        // Avoid unnecessary animation if already near target
        if (
          Math.abs(currentX - newX) > 0.5 ||
          Math.abs(currentY - newY) > 0.5
        ) {
          currentX = newX;
          currentY = newY;

          animate(inner, {
            translateX: newX,
            translateY: newY,
            ease: "easeOutQuad",
            duration: 200,
          });
        }
      });
    };

    const reset = () => {
      if (animationFrame.current) cancelAnimationFrame(animationFrame.current);
      currentX = 0;
      currentY = 0;

      animate(inner, {
        translateX: 0,
        translateY: 0,
        ease: createSpring({ stiffness: 400 }),
        duration: 300,
      });
    };

    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", reset);

    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", reset);
      if (animationFrame.current) cancelAnimationFrame(animationFrame.current);
    };
  }, [scope, strength, root]);

  return (
    <div ref={root} className="div">
      <div className={`${className}`} ref={itemRef}>
        {children}
      </div>
    </div>
  );
};

export default Magnetic;
