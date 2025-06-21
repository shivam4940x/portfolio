import MenuIcon from "@/components/ui/MenuIcon";
import { useAnimeScope } from "@/hooks/useAnimeScope";
import { useMomentumScroll } from "@/hooks/useMomentumScroll";
import { animate, createDraggable, createSpring, utils } from "animejs";
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
    scope.current?.add((self) => {
      createDraggable(".kitty > div", {
        container: ".kitty",
        releaseEase: createSpring({ stiffness: 300 }),
      });
      const guide = utils.$(".guide")[0];

      self.add("mouseIn", () => {
        guide.style.display = "block";
        animate(guide, {
          opacity: 1,
          duration: 500,
        });
      });

      self.add("mouseOut", () => {
        animate(guide, {
          opacity: 0,
          duration: 300,
          onComplete: () => {
            guide.style.display = "none";
          },
        });
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
        <Kitty
          mouseIn={() => {
            scope.current?.methods.mouseIn();
          }}
          mouseOut={() => {
            scope.current?.methods.mouseOut();
          }}
        />
      </div>
      <button
        onClick={resetScroll}
        className="goTop fixed right-0 top-0 aspect-square w-20 z-50 border-l md:block hidden opacity-0 hover:bg-black duration-200 border-b"
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

const Kitty = ({
  mouseIn,
  mouseOut,
}: {
  mouseIn: () => void | undefined;
  mouseOut: () => void | undefined;
}) => {
  const hoverTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    hoverTimeout.current = setTimeout(() => {
      if (mouseIn) mouseIn();
    }, 500);
  };

  const handleMouseLeave = () => {
    if (hoverTimeout.current) {
      clearTimeout(hoverTimeout.current);
      hoverTimeout.current = null;
    }
    if (mouseOut) mouseOut();
  };

  return (
    <>
      <div
        style={{ display: "none" }}
        className="fixed top-0 left-0 w-screen h-screen bg-black/40 opacity-0 pointer-events-none guide"
      >
        <div className="fixed right-8 bottom-20 w-96 max-w-[80vw] min-h-20 ">
          <div className="relative div min-h-20">
            <div className="absolute top-0 right-0 div pixel-corners bg-mute-white -z-10 min-h-20"></div>
            <div className="absolute top-[93%] right-3 w-7 rotate-[-20deg]">
              <svg
                className="div"
                viewBox="0 0 88 75"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M44 75L0.698737 -8.15666e-06L87.3013 -5.85622e-07L44 75Z"
                  fill="#e5e5e0"
                />
              </svg>
            </div>
            <div className="py-6 px-4 text-dull-black">
              Welcome, visitors! You've entered a world where code meets
              creativity and passion powers every pixel. This portfolio is my
              space to showcase projects and serve as a badge of my skills,
              dedication, and the journey I’ve forged as a developer.
            </div>
          </div>
        </div>
      </div>
      <div
        className="kitty aspect-square md:w-full w-20 -ml-8 md:ml-0 z-50 relative"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="div fadeIn">
          <div className="kitty_div">
            <img
              src="/eppyKitty.webp"
              alt="kitty"
              className="div pointer-events-none"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default DefaultLayout;
