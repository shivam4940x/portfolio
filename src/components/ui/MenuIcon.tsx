import { useCallback, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { animate, stagger } from "animejs";

interface Props {
  fn: { open: () => void; close: () => void };
}

const MenuIcon = ({ fn }: Props) => {
  const [, setIsOpen] = useState(false);
  const location = useLocation();
  const elementsRef = useRef<HTMLDivElement[]>([]);
  const burgerLinesRef = useRef<NodeListOf<HTMLDivElement> | null>(null);

  // Capture cover + menu elements once
  const getElements = useCallback(() => {
    if (!elementsRef.current.length) {
      const cover = document.querySelector(".mrMenu .cover") as HTMLDivElement;
      const menu = document.querySelector(".mrMenu .menu") as HTMLDivElement;
      if (cover && menu) elementsRef.current = [cover, menu];
    }
    if (!burgerLinesRef.current) {
      burgerLinesRef.current = document.querySelectorAll(
        ".burger-line"
      ) as NodeListOf<HTMLDivElement>;
    }
  }, []);

  const animateMenu = useCallback(
    (open: boolean) => {
      getElements();
      const [cover, menu] = elementsRef.current;
      const [line1, line2] = burgerLinesRef.current || [];

      if (!cover || !menu || !line1 || !line2) return;

      // Animate burger lines
      animate(line1, {
        top: open ? "50%" : "40%",
        rotate: open ? 45 : 0,
        duration: 300,
        easing: "easeInOutExpo",
      });
      animate(line2, {
        top: open ? "50%" : "60%",
        rotate: open ? -45 : 0,
        duration: 300,
        easing: "easeInOutExpo",
      });

      // Animate menu + cover
      const targets = open ? [cover, menu] : [menu, cover];
      animate(targets, {
        translateY: open ? ["-100%", "0%"] : ["0%", "-100%"],
        duration: 900,
        delay: stagger(200),
        easing: "easeInOutExpo",
      });
    },
    [getElements]
  );

  const toggleMenu = useCallback(() => {
    setIsOpen((prev) => {
      const next = !prev;
      animateMenu(next);

      if (fn) {
        if (next) fn.open();
        else fn.close();
      }

      return next;
    });
  }, [animateMenu, fn]);

  // Close on route change
  useEffect(() => {
    setIsOpen(false);
    animateMenu(false);
  }, [location, animateMenu]);

  return (
    <>
      <button onClick={toggleMenu} className="z-[9999999]">
        <div>
          <div
            className="burger aspect-square h-14 center flex-col gap-1 cursor-pointer text-white relative"
            data-cursor-hover
          >
            <div className="burger-line h-1 top-[40%] absolute left-1/2 -translate-x-1/2 -translate-y-1/2">
              <svg
                width="35"
                height="3"
                viewBox="0 0 35 2"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line
                  x1="1"
                  y1="1"
                  x2="34"
                  y2="1"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <div className="burger-line h-1 top-[60%] absolute left-1/2 -translate-x-1/2 -translate-y-1/2">
              <svg
                width="35"
                height="3"
                viewBox="0 0 35 2"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line
                  x1="1"
                  y1="1"
                  x2="34"
                  y2="1"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>
        </div>
      </button>

      <div className="mrMenu relative">
        <div
          className="menu fixed top-0 bottom-0 left-0 right-0 div bg-black z-[9999] -translate-y-full overflow-y-scroll no-scroll-bar"
          data-dark-bg
        ></div>
        <div className="cover fixed top-0 bottom-0 left-0 right-0 div bg-primary z-[999] -translate-y-full"></div>
      </div>
    </>
  );
};

export default MenuIcon;
