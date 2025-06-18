import MenuIcon from "@/components/ui/MenuIcon";
import { useAnimeScope } from "@/hooks/useAnimeScope";
import { createDraggable, createSpring } from "animejs";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

const DefaultLayout = () => {
  const { root, scope } = useAnimeScope();

  useEffect(() => {
    scope.current?.add(() => {
      createDraggable(".kitty > div", {
        container: ".kitty",
        releaseEase: createSpring({ stiffness: 300 }),
      });
    });
  }, [scope]);

  return (
    <div className="h-dvh w-screen flex overflow-x-hidden overflow-y-scroll">
      <main className="grow">
        <Outlet />
      </main>
      <div
        ref={root}
        className="top-0 sticky w-20 max-h-dvh flex flex-col justify-between border-l border-border"
      >
        <div className="aspect-square w-full bg-deep-steel">
          <MenuIcon fn={() => console.log("ola")} />
        </div>
        <div className="kitty aspect-square w-full">
          <div className="div fadeIn">
            <img src="/loadingKitty.png" alt="kitty" className="div pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DefaultLayout;
