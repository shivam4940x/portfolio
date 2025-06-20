import MenuIcon from "@/components/ui/MenuIcon";
import { useAnimeScope } from "@/hooks/useAnimeScope";
import { useMomentumScroll } from "@/hooks/useMomentumScroll";
import { animate, createDraggable, createSpring } from "animejs";
import { useEffect, useRef } from "react";
import { Outlet } from "react-router-dom";

const DefaultLayout = () => {
  const { root, scope } = useAnimeScope();
  const menu = useRef<HTMLDivElement>(null);
  const heroEl = useRef<HTMLElement>(null);
  const menuWrapper = useRef<HTMLDivElement>(null);

  const handleScroll = (scrollY: number) => {
    if (!heroEl.current || !menu.current || !menuWrapper.current) return;

    const fadeDistance = 300; // px over which opacity fades
    const maxTranslateZ = -200; // maximum "depth" in px

    const clampedProgress = Math.min(scrollY / fadeDistance, 1);
    const opacity = 1 - clampedProgress;
    const translateY = maxTranslateZ * clampedProgress;

    animate(heroEl.current, {
      opacity,
      translateY: -translateY * 2,
      ease: "outSine",
      duration: 0,
    });
    animate(menu.current, {
      opacity,
      translateY: -translateY / 2,
      ease: "outSine",
      duration: 0,
    });
    if (window.innerWidth > 768) {
      animate(menuWrapper.current, {
        backgroundColor: {
          to: clampedProgress >= 1 ? "rgb(12, 12, 11)" : "rgb(11, 26, 42)",
        },
        duration: 500,
      });
    }
  };

  const containerRef = useMomentumScroll({
    onScrollUpdate: handleScroll,
  });

  useEffect(() => {
    heroEl.current = document.querySelector("section#hero");
    // kitty animation; DO NOT TOUCH IT
    scope.current?.add(() => {
      createDraggable(".kitty > div", {
        container: ".kitty",
        releaseEase: createSpring({ stiffness: 300 }),
      });
    });
  }, [scope]);

  return (
    <div ref={root} className="h-dvh w-screen flex overflow-hidden">
      <main
        ref={containerRef}
        style={{
          transformStyle: "preserve-3d",
        }}
        className="grow fadeIn duration-500 max-w-full max-h-full overflow-y-scroll scroll-smooth relative perspective-distant"
      >
        <Outlet />
      </main>
      <div
        ref={menuWrapper}
        className="top-0 md:sticky pb-2 md:pb-0 absolute right-0 h-full md:w-52 w-15 max-h-dvh flex flex-col justify-between md:border-l menuWrapper md:bg-primary"
      >
        <div ref={menu} className="aspect-square w-full bg-deep-steel menu">
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
