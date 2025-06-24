import { useEffect, useRef, useState } from "react";
import { animate, stagger, utils } from "animejs";

const useRouteTransition = () => {
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



  const hideTransition = () => {
    if (rootDivRef.current) {
      utils.set(rootDivRef.current, { display: "none" });
    }
  };
  const beforeLoading = (callback: () => void) => {
    const root = document.getElementById("transition") as HTMLDivElement | null;
    if (!root) {
      console.warn("Transition root not found");
      callback();
      return;
    }

    const divs = root.querySelectorAll("div.bgs");
    if (!divs.length) {
      console.warn("Transition divs not found");
      callback();
      return;
    }

    setIsRouteLoading(false); // force remount
    requestAnimationFrame(() => {
      setIsRouteLoading(true);

      utils.set(root, { display: "flex" });

      animate(divs, {
        y: "0%",
        duration: 800,
        ease: "inOutExpo",
        delay: stagger(300),
        onComplete: callback,
      });
    });
  };
  
  
  

  const onDoneLoading = () => {
    if (divsRef.current) {
      animate(divsRef.current, {
        y: "-100%",
        duration: 800,
        ease: "inOutExpo",
        delay: stagger(300),
        onComplete: () => {
          hideTransition();
          setIsRouteLoading(false);
        },
      });
    } else {
      hideTransition();
      setIsRouteLoading(false);
    }
  };

  return {
    isRouteLoading,
    beforeLoading,
    onDoneLoading,
  };
};

export default useRouteTransition;
