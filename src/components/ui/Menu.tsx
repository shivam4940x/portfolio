import { useState } from "react";
import { menu as menuData } from "@/json/Layout.json";
import TransitionLink from "./TransitionLink";
import { useLocation } from "react-router-dom";

interface Props {
  closeFn: () => void;
}

const Menu = ({ closeFn }: Props) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const location = useLocation();

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
          {/* Menu Items */}
          <div className="div px-4 sm:px-8 py-4 flex items-center justify-end md:justify-start text-[clamp(3.5rem,6vw,5.6rem)] font-montserrat font-bold">
            <ul className="group space-y-2 w-full uppercase">
              {menuData.links.map((link, index) => {
                const isCurrent = link.href === location.pathname;

                return (
                  <li
                    key={`${link.href}_${link.text}`}
                    onMouseEnter={() => {
                      setActiveIndex(index);
                    }}
                    onMouseLeave={() => {
                      setActiveIndex(null);
                    }}
                    className={`hover:opacity-100 duration-150 flex justify-end md:justify-start md:opacity-70 border-b overflow-hidden px-1`}
                  >
                    {/* fade it in when its in, like when clicked on open menu i want it to be visible */}
                    <div
                      className="translate-y-4 lg:translate-y-6 animateInDownToUp"
                      style={{
                        animationDelay: `${index * 100}ms`,
                      }}
                    >
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
                    </div>
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
