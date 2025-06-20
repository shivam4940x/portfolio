import MenuIcon from "@/components/ui/MenuIcon";
import { useAnimeScope } from "@/hooks/useAnimeScope";
import { useMomentumScroll } from "@/hooks/useMomentumScroll";
import { animate, createDraggable, createSpring } from "animejs";
import { useEffect, useRef } from "react";
import { Outlet } from "react-router-dom";

const DefaultLayout = () => {
  const { root, scope } = useAnimeScope();
  const heroEl = useRef<HTMLElement>(null);
  const menuWrapper = useRef<HTMLDivElement>(null);

  const handleScroll = (scrollY: number) => {
    if (!heroEl.current || !menuWrapper.current) return;

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
    animate(".menu", {
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
      const goTopTranslateY = 100 - clampedProgress * 100;
      animate(".goTop", {
        opacity: clampedProgress,
        translateY: goTopTranslateY,
        ease: "outSine",
        duration: 0,
      });
    }
  };

  const { containerRef, resetScroll } = useMomentumScroll({
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
        className="grow fadeIn duration-500 max-w-full max-h-full overflow-y-scroll relative md:max-w-[calc(100%_-_5rem)]"
      >
        <Outlet />
      </main>
      <div
        ref={menuWrapper}
        className="top-0 gap-5 md:sticky pb-2 absolute right-0 h-full md:w-[12rem] max-h-dvh flex flex-col justify-between md:border-l menuWrapper md:bg-primary"
      >
        <div className="aspect-square md:w-full bg-deep-steel menu w-15">
          <MenuIcon fn={() => console.log("ola")} />
        </div>
        <Kitty />
      </div>
      <button
        onClick={resetScroll}
        className="goTop fixed right-0 top-0 aspect-square w-20 z-50 border-l md:block hidden opacity-0 hover:bg-black duration-200"
      >
        <div className="div center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={28}
            height={28}
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M11 20h2V8h2V6h-2V4h-2v2H9v2h2zM7 10V8h2v2zm0 0v2H5v-2zm10 0V8h-2v2zm0 0v2h2v-2z"
            ></path>
          </svg>
        </div>
      </button>
    </div>
  );
};
const Kitty = () => {
  return (
    <div className="kitty aspect-square md:w-full w-20 -ml-8 md:ml-0">
      <div className="div fadeIn">
        <img
          src="/eppyKitty.webp"
          alt="kitty"
          className="div pointer-events-none"
        />
      </div>
    </div>
  );
};
export default DefaultLayout;
