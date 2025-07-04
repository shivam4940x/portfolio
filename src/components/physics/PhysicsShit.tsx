import {
  Bodies,
  Engine,
  Render,
  Runner,
  Composite,
  World,
  Mouse,
  MouseConstraint,
  Events,
} from "matter-js";
import { useLayoutEffect, useRef } from "react";
import { breakpoints, getBreakpoint, getRender, getShape } from "./utils";

const baseThickness = 10;
const baseWidth = 90;
const balls = {
  base: [
    { offsetX: +20, offsetY: 0, radius: 30 },
    { offsetX: +30, offsetY: -30, radius: 50 },
  ],
  xs: [
    { offsetX: +20, offsetY: -20, radius: 30 },
    { offsetX: +30, offsetY: -70, radius: 60 },
  ],
  sm: [
    { offsetX: +20, offsetY: 0, radius: 35 },
    { offsetX: +40, offsetY: -30, radius: 70 },
  ],
  md: [
    { offsetX: -20, offsetY: 0, radius: 50 },
    { offsetX: -60, offsetY: -50, radius: 80 },
  ],
  lg: [
    { offsetX: -20, offsetY: 0, radius: 60 },
    { offsetX: -80, offsetY: -50, radius: 90 },
  ],
  xl: [
    { offsetX: -30, offsetY: -10, radius: 65 },
    { offsetX: -90, offsetY: -60, radius: 100 },
  ],
  "2xl": [
    { offsetX: -50, offsetY: -10, radius: 70 },
    { offsetX: -140, offsetY: -60, radius: 110 },
  ],
};

const pluses = {
  base: [
    { posXRatio: 0.25, posYRatio: 0.35 },
    { posXRatio: 0.6, posYRatio: 0.55 },
    { posXRatio: 0.75, posYRatio: 0.3 },
  ],
  xs: [
    { posXRatio: 0.25, posYRatio: 0.35 },
    { posXRatio: 0.63, posYRatio: 0.52 },
    { posXRatio: 0.75, posYRatio: 0.25 },
  ],
  sm: [
    { posXRatio: 0.35, posYRatio: 0.4 },
    { posXRatio: 0.65, posYRatio: 0.61 },
    { posXRatio: 0.8, posYRatio: 0.3 },
  ],
  md: [
    { posXRatio: 0.45, posYRatio: 0.45 },
    { posXRatio: 0.7, posYRatio: 0.6 },
    { posXRatio: 0.8, posYRatio: 0.25 },
  ],
  lg: [
    { posXRatio: 0.55, posYRatio: 0.42 },
    { posXRatio: 0.73, posYRatio: 0.61 },
    { posXRatio: 0.85, posYRatio: 0.25 },
  ],
  xl: [
    { posXRatio: 0.65, posYRatio: 0.34 },
    { posXRatio: 0.78, posYRatio: 0.6 },
    { posXRatio: 0.9, posYRatio: 0.22 },
  ],
  "2xl": [
    { posXRatio: 0.68, posYRatio: 0.42 },
    { posXRatio: 0.8, posYRatio: 0.6 },
    { posXRatio: 0.92, posYRatio: 0.22 },
  ],
};
const layoutMap = Object.fromEntries(
  breakpoints.map((bp, index) => {
    const thickness = baseThickness + index;
    const width = baseWidth + index * 10;
    return [
      bp,
      {
        plusWidth: width,
        plusThickness: thickness,
        balls: balls[bp],
        pluses: pluses[bp],
      },
    ];
  })
);

const PhysicsShit = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useLayoutEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;
    const windowWidth = window.innerWidth;
    const container = containerRef.current;
    const canvas = canvasRef.current;
    const { width: containerWidth, height: containerHeight } =
      container.getBoundingClientRect();

    const { render, engine, pixelRatio, walls } = getRender({
      container,
      containerHeight,
      containerWidth,
      canvas,
    });

    const breakpoint = getBreakpoint(windowWidth);
    const layout = layoutMap[breakpoint];

    const plusBodies = layout.pluses.map(({ posXRatio, posYRatio }) =>
      getShape.Plus({
        posX: containerWidth * posXRatio,
        posY: containerHeight * posYRatio,
        plusWidth: layout.plusWidth,
        plusThickness: layout.plusThickness,
      })
    );

    const ball1 = getShape.Ball({
      posX:
        containerWidth * layout.pluses[2].posXRatio + layout.balls[0].offsetX,
      posY:
        containerHeight * layout.pluses[0].posYRatio + layout.balls[0].offsetY,
      plusWidth: layout.plusWidth,
      ballRadius: layout.balls[0].radius,
    });

    const ball2 = getShape.Ball({
      posX:
        containerWidth * layout.pluses[0].posXRatio + layout.balls[1].offsetX,
      posY:
        containerHeight * layout.pluses[0].posYRatio + layout.balls[1].offsetY,
      plusWidth: layout.plusWidth,
      ballRadius: layout.balls[1].radius,
    });

    const ground = Bodies.rectangle(
      containerWidth / 2,
      containerHeight - 0.25,
      containerWidth,
      0.5,
      { isStatic: true }
    );

    const allPlusParts = plusBodies.flatMap(({ plusShape, pin }) => [
      plusShape,
      pin,
    ]);

    const mouse = Mouse.create(canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse,
      constraint: {
        stiffness: 0.2,
        render: { visible: false },
      },
    });

    mouse.pixelRatio = pixelRatio;

    Events.on(mouseConstraint, "startdrag", () => {
      canvas.style.cursor = "grabbing";
    });
    Events.on(mouseConstraint, "enddrag", () => {
      canvas.style.cursor = "auto";
    });

    Composite.add(engine.world, [
      ...allPlusParts,
      ...walls,
      ball1,
      ball2,
      ground,
      mouseConstraint,
    ]);

    render.mouse = mouse;
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
    <div
      ref={containerRef}
      className="absolute takeScreen -z-50"
      id="PhysicsShit"
    >
      <canvas
        ref={canvasRef}
        className="block bg-transparent div pointer-events-auto touch-none"
      />
    </div>
  );
};

export default PhysicsShit;
