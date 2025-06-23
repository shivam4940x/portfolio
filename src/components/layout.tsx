import { useRef } from "react";

export const Kitty = ({
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
              Welcome, visitor! I'm shivm and this is my personal portfolio
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

const footerData = [
  {
    title: "Menu",
    items: [
      { text: "Home", href: "/" },
      { text: "Work", href: "/work" },
      { text: "Services", href: "/services" },
      { text: "About Me", href: "/about" },
      { text: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Social Links",
    items: [
      { text: "Insta", href: "https://instagram.com" },
      { text: "LinkedIn", href: "https://linkedin.com" },
      { text: "GitHub", href: "https://github.com" },
      { text: "Mail", href: "mailto:you@example.com" },
    ],
  },
  {
    title: "Resource",
    items: [
      { text: "Anime Js, Matter Js", href: "https://animejs.com/" },
      { text: "Source Code", href: "https://github.com/yourrepo" },
    ],
  },
];

export const Footer = () => {
  return (
    <footer className="bg-dull-black py-12 border-t px-6 sm:px-10 space-y-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-8 gap-y-10 gap-x-6 lg:gap-x-12">
        {footerData.map(({ title, items }, idx) => {
          // Responsive col span
          const colSpan = idx === 2 ? "lg:col-span-2" : "lg:col-span-3";

          return (
            <div key={title} className={colSpan}>
              <h5 className="border-b border-border-light font-bold text-xl px-1 pb-1">
                {title}
              </h5>
              <ul className="px-3 mt-5 text-lg capitalize space-y-3">
                {items.map(({ text, href }) => (
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
                ))}
              </ul>
            </div>
          );
        })}
      </div>
      <div className="w-full flex justify-center lg:justify-end">
        <div className="text-complimentary text-sm">© 2025 Shivam Singh</div>
      </div>
    </footer>
  );
};
