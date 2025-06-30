import { useRef, useState } from "react";
import { menu as menuData } from "@/json/Layout.json";
import TransitionLink from "./TransitionLink";
import { useLocation } from "react-router-dom";
import { animate, utils } from "animejs";

interface Props {
  closeFn: () => void;
}

const Menu = ({ closeFn }: Props) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const total = menuData.links.length;
  const location = useLocation();
  const pixelArrows = useRef<(HTMLDivElement | null)[]>([]);
  // Dynamically calculate background Y position for pattern
  const getPatternPosition = (index: number, total: number) => {
    if (total <= 1) return "0% 0%";
    const step = 100 / (total - 1);
    return `0% -${index * step}%`;
  };
  const liHover = (isActive: boolean, index: number) => {
    const ourArrow = pixelArrows.current[index];
    if (!ourArrow || window.innerWidth < 768) return;

    const config = {
      scale: isActive ? "1" : "0",
      duration: 200,
      ease: "linear",
    };
    if (isActive) {
      utils.set(ourArrow, { display: "flex" });
      animate(ourArrow, config);
    } else {
      animate(ourArrow, config);
      utils.set(ourArrow, { display: "none" });
    }
  };
  return (
    <div
      id="Menu"
      className="absolute w-full h-dvh bg-black/50 takeScreen hidden overflow-hidden"
    >
      <div
        style={{
          transform: "translateX(100%)",
        }}
        className="absolute md:w-2xl w-full max-w-2xl h-full bg-dull-black md:right-20 right-0 wrapper"
        data-active-index={activeIndex ?? ""}
      >
        <div className="relative div h-full">
          {/* Background Pattern */}
          <div
            className="absolute left-0 top-0 w-full h-full -z-10 transition-all duration-[800ms] ease-in-out pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(rgba(11, 26, 42, 1) 5%, transparent 9%)`,
              backgroundSize: "12vmin 12vmin",
              backgroundPosition:
                activeIndex !== null
                  ? getPatternPosition(activeIndex, total)
                  : "0% 0%",
              opacity: activeIndex !== null ? 0.5 : 1,
            }}
          />

          {/* Menu Items */}
          <div className="div px-8 py-4 flex items-center justify-end md:justify-start text-[clamp(3rem,6vw,5rem)] font-montserrat font-bold">
            <ul className="group space-y-2">
              {menuData.links.map((link, index) => {
                const isCurrent = link.href === location.pathname;

                return (
                  <li
                    key={`${link.href}_${link.text}`}
                    onMouseEnter={() => {
                      liHover(true, index);
                      setActiveIndex(index);
                    }}
                    onMouseLeave={() => {
                      liHover(false, index);
                      setActiveIndex(null);
                    }}
                    className={`uppercase hover:opacity-100 duration-150 flex justify-end md:justify-start md:opacity-70 `}
                  >
                    <div
                      ref={(el) => {
                        pixelArrows.current[index] = el;
                      }}
                      style={{
                        transform: "scale(0)",
                      }}
                      className={`text-[clamp(2rem,2.5vw,4rem)] justify-center items-center mr-4 duration-150 pixelArrow hidden `}
                    >
                      <span className="font-pixel text-secondary">&gt;</span>
                    </div>

                    {isCurrent ? (
                      <div className="text-complimentary/85 cursor-pointer">
                        {link.text}
                      </div>
                    ) : (
                      <TransitionLink
                        fn={closeFn}
                        to={link.href}
                        className="py-2"
                      >
                        {link.text}
                      </TransitionLink>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
