import { Footer, Kitty } from "@/components/layout";
import MenuIcon from "@/components/ui/MenuIcon";
import Menu from "@/components/ui/Menu";
import { useMomentumScroll } from "@/hooks/useMomentumScroll";
import { animate, utils } from "animejs";
import { useEffect, useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";

const DefaultLayout = () => {
  const heroEl = useRef<HTMLElement>(null);
  const LastRef = useRef<HTMLElement>(null);
  const LastWrapperRef = useRef<HTMLElement>(null);
  const menuWrapper = useRef<HTMLDivElement>(null);
  const MenuRef = useRef<HTMLDivElement>(null);
  const ServicesRef = useRef<HTMLDivElement[]>([]);
  const ServiceShapesRef = useRef<SVGSVGElement[]>([]);
  const stickState = useRef<boolean[]>([]);
  const prevScrollY = useRef<number>(0);
  const location = useLocation();

  const handleFooterScroll = () => {
    if (!LastRef.current || !LastWrapperRef.current || !menuWrapper.current)
      return;

    const rect = LastRef.current.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    const footerVisiblePx = Math.max(0, windowHeight - rect.top);
    const totalRevealPx = rect.height;
    const progress = Math.min(footerVisiblePx / totalRevealPx, 1);

    // Calculate desired translateY (0 → 100%)
    const targetY = progress * 100;

    // Convert to px based on wrapper height
    const wrapperHeight = LastWrapperRef.current.offsetHeight;
    const targetPx = (targetY / 100) * wrapperHeight;

    // Smooth interpolation from current to target
    animate(LastWrapperRef.current, {
      translateY: targetPx,
      duration: 0,
      easing: "linear",
    });
  };

  const handleScroll = (scrollY: number) => {
    if (!menuWrapper.current) return;
    const fadeDistance = 300; // px over which opacity fades
    const maxTranslateZ = -200; // maximum "depth" in px

    const clampedProgress = Math.min(scrollY / fadeDistance, 1);
    const opacity = 1 - clampedProgress;
    const translateY = maxTranslateZ * clampedProgress;

    if (heroEl.current) {
      animate(heroEl.current, {
        opacity,
        translateY: -translateY * 2,
        ease: "outSine",
        duration: 0,
      });
    }
    animate(".menu", {
      opacity,
      translateY: -translateY / 2,
      ease: "outSine",
      duration: 0,
    });
    const goTopTranslateY = 100 - clampedProgress * 100;
    if (clampedProgress > 0) {
      utils.set(".goTop", { display: "block" });
    }
    animate(".goTop", {
      opacity: clampedProgress,
      translateY: goTopTranslateY,
      ease: "outSine",
      duration: 0,
    });
    if (window.innerWidth >= 768) {
      animate(menuWrapper.current, {
        backgroundColor: {
          to: clampedProgress >= 1 ? "rgb(12, 12, 11)" : "rgb(11, 26, 42)",
        },
        duration: 200,
      });
    }
  };

  const handleServiceScroll = (scrollY: number) => {
    const scrollingUp = scrollY < prevScrollY.current;
    prevScrollY.current = scrollY;

    ServicesRef.current.forEach((el, i) => {
      if (!el) return;

      const elementTop = el.getBoundingClientRect().top;
      const stickyTop = parseFloat(el.style.top || "0");
      const isStuck = Math.round(elementTop) === Math.round(stickyTop);

      const shape = ServiceShapesRef.current[i];
      const path = shape?.querySelector("path");

      if (isStuck && !stickState.current[i]) {
        stickState.current[i] = true;
        if (path) path.setAttribute("fill", "#928e8b");
      } else if (!isStuck && stickState.current[i] && scrollingUp) {
        stickState.current[i] = false;
        if (path) path.setAttribute("fill", "#ffc857");
      }
    });
  };

  const { containerRef, resetScroll } = useMomentumScroll({
    onScrollUpdate: (scrollY) => {
      handleScroll(scrollY);
      handleFooterScroll();
      handleServiceScroll(scrollY);
    },
  });

  useEffect(() => {
    heroEl.current = document.querySelector("section#Hero");
    MenuRef.current = document.getElementById("Menu") as HTMLDivElement;
    LastRef.current = document.querySelector("#Last") as HTMLDivElement;
    LastWrapperRef.current = LastRef.current?.querySelector(
      ".wrapper"
    ) as HTMLDivElement;
    const services = document.querySelectorAll(
      "#Service .service"
    ) as NodeListOf<HTMLDivElement>;

    services.forEach((s, i) => {
      const mrSvg = s.querySelector("svg") as SVGSVGElement;
      ServiceShapesRef.current[i] = mrSvg;
      ServicesRef.current[i] = s;
    });
  }, []);

  const menu: {
    div: Element | null;
    refill: () => void;
    open: () => void;
    close: () => void;
  } = {
    div: null,
    refill() {
      if (!this.div && MenuRef.current) {
        this.div = MenuRef.current.querySelector("div.wrapper");
      }
    },
    open() {
      this.refill();
      if (!MenuRef.current || !this.div) return;
      utils.set(MenuRef.current, {
        display: "block",
        opacity: 1,
      });
      animate(this.div, {
        x: 0,
        duration: 800,
        ease: "outQuart",
      });
    },
    close() {
      this.refill();
      if (!MenuRef.current || !this.div) return;
      animate(MenuRef.current, {
        opacity: 0,
        ease: "linear",
        duration: 400,
        onComplete: () => {
          if (!MenuRef.current || !this.div) return;
          utils.set(MenuRef.current, {
            display: "none",
          });
          utils.set(this.div, { x: "100%" });
        },
      });
    },
  };

  return (
    <div className="h-dvh w-screen flex overflow-hidden">
      <main
        ref={containerRef}
        className="grow fadeIn duration-500 max-w-full max-h-full overflow-y-scroll relative md:max-w-[calc(100%_-_5rem)] fateIn"
      >
        <Outlet key={location.pathname} />
        <Footer />
      </main>
      <Menu closeFn={() => menu.close()} />
      <div
        ref={menuWrapper}
        className="top-0 gap-5 md:sticky pb-2 absolute right-0 h-full md:w-20 max-h-dvh flex flex-col justify-between md:border-l menuWrapper md:bg-primary"
      >
        <div className="aspect-square md:w-full bg-deep-steel menu w-15">
          <MenuIcon fn={menu} />
        </div>
        <Kitty />
      </div>
      <button
        onClick={resetScroll}
        className="goTop fixed right-0 top-0 aspect-square w-15 md:w-20 z-50 border-l hidden opacity-0 hover:bg-black duration-200 border-b bg-dull-black md:bg-transparent"
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

export default DefaultLayout;
