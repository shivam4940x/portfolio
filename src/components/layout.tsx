import { useEffect, useRef } from "react";
import { footer as FooterData, yearName } from "@/json/Layout.json";
import TransitionLink from "./ui/TransitionLink";
import { useAnimeScope } from "@/hooks/useAnimeScope";
import { animate, createDraggable, createSpring, utils } from "animejs";
import { useLocation } from "react-router-dom";
export const Kitty = () => {
  const hoverTimeout = useRef<NodeJS.Timeout | null>(null);
  const { root, scope } = useAnimeScope();
  useEffect(() => {
    if (!scope.current) return;

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
  const handleMouseEnter = () => {
    hoverTimeout.current = setTimeout(() => {
      if (scope.current?.methods.mouseIn) scope.current?.methods.mouseIn();
    }, 500);
  };

  const handleMouseLeave = () => {
    if (hoverTimeout.current) {
      clearTimeout(hoverTimeout.current);
      hoverTimeout.current = null;
    }
    if (scope.current?.methods.mouseIn) scope.current?.methods.mouseOut();
  };

  return (
    <div ref={root}>
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
              Welcome, visitor! I'm Shivam — a freelance developer passionate
              about crafting modern web solutions. I’m open to exciting
              projects, new projects and collaborations. Feel free to reach out!
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
    </div>
  );
};

export const Footer = () => {
  const location = useLocation();
  return (
    <footer className="bg-dull-black py-12 border-t px-6 sm:px-10 space-y-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-8 gap-y-10 gap-x-6 lg:gap-x-12">
        {FooterData.map(({ title, items }, idx) => {
          // Responsive col span
          const colSpan = idx === 2 ? "lg:col-span-2" : "lg:col-span-3";

          return (
            <div key={title} className={colSpan}>
              <h4 className="border-b border-border-light font-bold text-xl px-1 pb-1">
                {title}
              </h4>
              <ul className="px-3 mt-5 text-lg capitalize space-y-3">
                {items.map(({ text, href }) => {
                  if (title == "Menu") {
                    const isCurrent = href === location.pathname;
                    return (
                      <li key={text}>
                        {isCurrent ? (
                          <div className=" cursor-pointer flex items-center gap-2">
                            <div className="text-secondary translate-y-1">*</div>
                            <div className="text-complimentary/85">{text}</div>
                          </div>
                        ) : (
                          <TransitionLink
                            to={href}
                            className="md:hover:font-stretch-expanded duration-150 font-normal cursor-pointer"
                          >
                            {text}
                          </TransitionLink>
                        )}
                      </li>
                    );
                  }
                  return (
                    <li key={text}>
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="md:hover:font-stretch-expanded duration-150 font-normal"
                      >
                        {text}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
      <div className="w-full flex justify-center lg:justify-between text-complimentary items-center text-sm flex-col gap-5 lg:flex-row">
        <div className="gap-3 center h-5 tracking-wide">
          <div className="w-2 aspect-square bg-green-500 rounded-full"></div>
          Open for Collaboration or Freelance projects
        </div>

        <div className="center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={15}
            height={15}
            viewBox="0 0 24 24"
          >
            <g fill="none" stroke="currentColor" strokeWidth={1.5}>
              <path
                d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12Z"
                opacity={0.5}
              ></path>
              <path
                strokeLinecap="round"
                d="M14 15.667a4.5 4.5 0 0 1-1.714.333C9.919 16 8 14.21 8 12s1.919-4 4.286-4c.61 0 1.189.119 1.714.333"
              ></path>
            </g>
          </svg>
          {yearName}
        </div>
      </div>
    </footer>
  );
};
