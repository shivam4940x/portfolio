import { useRef, useState, useEffect, type ReactNode } from "react";
import { animate, stagger, utils } from "animejs";
import { RouteTransitionContext } from "./RouteTransitionContext";

export const RouteTransitionProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [isRouteLoading, setIsRouteLoading] = useState(true);
  const rootDivRef = useRef<HTMLDivElement | null>(null);
  const divsRef = useRef<NodeListOf<HTMLDivElement> | null>(null);

  useEffect(() => {
    const root = document.getElementById("transition") as HTMLDivElement | null;
    if (root) {
      rootDivRef.current = root;
      divsRef.current = root.querySelectorAll("div.bgs");
    }
  }, []);

  const beforeLoading = (callback: () => void) => {
    const root = rootDivRef.current;
    const divs = divsRef.current;
    if (!root || !divs?.length) return callback();
    utils.set(root, { display: "flex" });

    animate(Array.from(divs).reverse(), {
      y: "0%",
      duration: 800,
      ease: "inOutExpo",
      delay: stagger(300),
      onComplete: () => {
        setIsRouteLoading(true);
        callback();
      },
    });
  };

  const onDoneLoading = () => {
    const root = rootDivRef.current;
    const divs = divsRef.current;
    if (!root || !divs?.length) return setIsRouteLoading(false);

    animate(divs, {
      y: "-100%",
      duration: 800,
      ease: "inOutExpo",
      delay: stagger(300),
      onComplete: () => {
        utils.set(root, { display: "none" });
        setIsRouteLoading(false);
      },
    });
  };

  return (
    <RouteTransitionContext.Provider
      value={{ isRouteLoading, beforeLoading, onDoneLoading }}
    >
      {children}
    </RouteTransitionContext.Provider>
  );
};
