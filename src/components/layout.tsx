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

export const Footer = () => {
  return (
    <footer className="md:my-30 my-16 px-4 md:px-10">
      <div></div>
    </footer>
  );
};
