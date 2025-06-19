import MenuIcon from "@/components/ui/MenuIcon";
import { useAnimeScope } from "@/hooks/useAnimeScope";
import { animate, createDraggable, createSpring } from "animejs";
import { useEffect, useRef } from "react";
import { Outlet } from "react-router-dom";

const DefaultLayout = () => {
  const { root, scope } = useAnimeScope();
  const container = useRef<HTMLElement>(null);

  useEffect(() => {
    const containerEl = container.current;
    const heroEl = document.querySelector("section#hero") as HTMLElement;
    const canvas = document.querySelector(
      "#PhysicsShit canvas"
    ) as HTMLCanvasElement;
    if (!canvas || !heroEl || !containerEl) return;

    let targetScroll = 0;
    let currentScroll = 0;
    const damping = 0.05;
    let rafId: number;

    function updateScroll() {
      if (!containerEl) return;
      const delta = targetScroll - currentScroll;
      currentScroll += delta * damping;
      containerEl.scrollTop = currentScroll;

      if (Math.abs(delta) > 0.5) {
        rafId = requestAnimationFrame(updateScroll);
      }
    }

    const forwardWheel = (e: WheelEvent) => {
      e.preventDefault();

      targetScroll += e.deltaY;

      targetScroll = Math.max(
        0,
        Math.min(
          targetScroll,
          containerEl.scrollHeight - containerEl.clientHeight
        )
      );

      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(updateScroll);
    };
    const handleScroll = () => {
      const scrollY = containerEl.scrollTop;
      const fadeDistance = 300; // px over which opacity fades
      const maxTranslateZ = -200; // maximum "depth" in px

      const clampedProgress = Math.min(scrollY / fadeDistance, 1);
      const opacity = 1 - clampedProgress;
      const translateY = maxTranslateZ * clampedProgress;

      animate(heroEl, {
        opacity,
        translateY: -translateY * 2,
        easing: "easeOutCubic",
        duration: 0, // instantaneous update
      });
    };

    canvas.addEventListener("wheel", forwardWheel, { passive: false });
    containerEl.addEventListener("wheel", forwardWheel, { passive: false });

    containerEl.addEventListener("scroll", handleScroll);
    handleScroll();
    // kitty animation; DO NOT TOUCH IT
    scope.current?.add(() => {
      createDraggable(".kitty > div", {
        container: ".kitty",
        releaseEase: createSpring({ stiffness: 300 }),
      });
    });

    return () => {
      canvas.removeEventListener("wheel", forwardWheel);
      containerEl.removeEventListener("wheel", forwardWheel);
      cancelAnimationFrame(rafId);
    };
  }, [scope]);

  return (
    <div ref={root} className="h-dvh w-screen flex overflow-hidden">
      <main
        ref={container}
        style={{
          transformStyle: "preserve-3d",
        }}
        className="grow fadeIn duration-500 max-w-full max-h-full overflow-y-scroll scroll-smooth relative perspective-distant style"
      >
        <Outlet />
      </main>
      <div className="top-0 md:sticky pb-2 md:pb-0 fixed right-0 h-full md:w-20 w-15 max-h-dvh flex flex-col justify-between md:border-l ">
        <div className="aspect-square w-full bg-deep-steel">
          <MenuIcon fn={() => console.log("ola")} />
        </div>
        <div className="kitty aspect-square md:w-full w-20 -ml-8 md:ml-0">
          <div className="div fadeIn">
            <img
              src="/eppyKitty.webp"
              alt="kitty"
              className="div pointer-events-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DefaultLayout;
