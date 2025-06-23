import { useEffect, useRef, type ReactNode } from "react";
import Magnetic from "../anim/Magnetic";
import { useAnimeScope } from "@/hooks/useAnimeScope";
import { createAnimatable, utils } from "animejs";

interface Props {
  children: ReactNode;
}

const Btn = ({ children }: Props) => {
  const { root, scope } = useAnimeScope();
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!scope.current || !bgRef.current) return;

    scope.current.add((self) => {
      const $btn = document.querySelector(".btn_wrapper") as HTMLElement;
      const bg = bgRef.current;
      if (!bg || !$btn) return;

      const animatable = createAnimatable(bg, {
        x: 500,
        y: 500,
        scale: 600,
        opacity: 500,
        ease: "out(3)",
      });
      utils.set(bg, {
        x: "-50%",
        y: "-50%",
        scale: 0,
      });
      self.add("hover", (e: MouseEvent) => {
        const bounds = $btn.getBoundingClientRect();
        if (!bounds) return;
        const { width, height, left, top } = bounds;
        const x = utils.clamp(
          e.clientX - left - width / 2,
          -width / 2,
          width / 2
        );
        const y = utils.clamp(
          e.clientY - top - height / 2,
          -height / 2,
          height / 2
        );
        animatable.x(x - bg.offsetWidth / 2);
        animatable.y(y - bg.offsetHeight / 2);
      });
      $btn.addEventListener("mouseenter", () => {
        animatable.scale(2);
        animatable.opacity(1);
      });
      $btn.addEventListener("mouseleave", () => {
        animatable.scale(0);
        animatable.opacity(0);
      });
    });
  }, [scope, root]);

  return (
    <div
      onMouseMove={(e) => scope.current?.methods.hover(e)}
      className="w-max"
      ref={root}
    >
      <Magnetic className="btn_wrapper relative z-10 rounded-full overflow-hidden border-complimentary border">
        <button className="px-4 py-2 hover:text-primary">
          <Magnetic strength={24} className="px-8 py-3">
            {children}
          </Magnetic>
        </button>
        <div
          ref={bgRef}
          className="absolute pointer-events-none rounded-full w-44 h-44 bg-complimentary -z-10 top-1/2 left-1/2"
        />
      </Magnetic>
    </div>
  );
};

export default Btn;
