import { Bodies, Engine, Render, Runner, Composite, World } from "matter-js";
import { useLayoutEffect, useRef } from "react";
import { getBreakpoint, getLetter, getRender, letterOffsets } from "./utils";

const layoutMap = {
  base: 70, // very small devices
  xs: 80, // extra small screens
  sm: 90, // small phones/tablets
  md: 110, // medium tablets
  lg: 130, // laptops
  xl: 150, // desktops
  "2xl": 170, // large screens
};

const WorkBg = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useLayoutEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;

    const container = containerRef.current;
    const canvas = canvasRef.current;
    const { width: containerWidth, height: containerHeight } =
      container.getBoundingClientRect();

    const { render, engine, walls } = getRender({
      container,
      containerHeight,
      containerWidth,
      canvas,
    });

    // Create "WORD" letters
    const letters = ["W", "O", "R", "K"] as const;
    const breakpoint = getBreakpoint(window.innerWidth);
    const size = layoutMap[breakpoint];

    const spacing = size * 1.1;
    const startX = containerWidth / 2 - ((letters.length - 1) * spacing) / 2;
    const centerY = containerHeight / 3 - 100;

    const wordBodies = letters.map((letter, i) => {
      const offsetX = letterOffsets[breakpoint][letter] || 0;
      return getLetter[letter]({
        posX: startX + i * spacing + offsetX,
        posY: centerY,
        size,
      });
    });

    const ground = Bodies.rectangle(
      containerWidth / 2,
      containerHeight - 0.25,
      containerWidth,
      0.5,
      { isStatic: true }
    );


    Composite.add(engine.world, [...wordBodies, ground, ...walls]);

    Render.run(render);
    const runner = Runner.create();
    Runner.run(runner, engine);

    return () => {
      Render.stop(render);
      Runner.stop(runner);
      World.clear(engine.world, false);
      Engine.clear(engine);
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute takeScreen -z-50" id="WorkBg">
      <canvas
        ref={canvasRef}
        className="block bg-transparent pointer-events-auto touch-none"
      />
    </div>
  );
};

export default WorkBg;
