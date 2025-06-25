import { useState } from "react";
import { menu as menuData } from "@/json/Layout.json";
import TransitionLink from "./TransitionLink";

interface Props {
  closeFn: () => void;
}

const Menu = ({ closeFn }: Props) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const total = menuData.links.length;

  // Dynamically calculate background Y position for pattern
  const getPatternPosition = (index: number, total: number) => {
    if (total <= 1) return "0% 0%";
    const step = 100 / (total - 1);
    return `0% -${index * step}%`;
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
            className="absolute left-0 top-0 w-full h-full z-0 transition-all duration-[800ms] ease-in-out pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.1) 5%, transparent 9%)`,
              backgroundSize: "12vmin 12vmin",
              backgroundPosition:
                activeIndex !== null
                  ? getPatternPosition(activeIndex, total)
                  : "0% 0%",
              opacity: activeIndex !== null ? 0.5 : 1,
            }}
          />


          {/* Menu Items */}
          <div className="div px-8 py-4 flex items-center justify-end text-[clamp(2.5rem,3vw,3rem)] font-montserrat font-bold">
            <ul className="group space-y-2">
              {menuData.links.map((link, index) => (
                <li
                  key={`${link.href}_${link.text}`}
                  onMouseEnter={() => setActiveIndex(index)}
                  onMouseLeave={() => setActiveIndex(null)}
                  className="capitalize group-hover:opacity-40 hover:opacity-100 duration-150 flex justify-end"
                >
                  <TransitionLink fn={closeFn} to={link.href} className="py-2">
                    {link.text}
                  </TransitionLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
