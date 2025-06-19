import {
  Bodies,
  Body,
  Engine,
  Render,
  Runner,
  Composite,
  World,
  Constraint,
  Mouse,
  MouseConstraint,
  Events,
} from "matter-js";
import { useLayoutEffect, useRef } from "react";

interface PlusProps {
  posX: number;
  posY: number;
  plusWidth: number;
  plusThickness?: number;
}

interface BallProps {
  posX: number;
  posY: number;
  plusWidth: number;
  ballRadius: number;
}
const breakPoints = {
  base: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
};

function getBreakpoint(width: number): keyof typeof breakPoints {
  if (width >= breakPoints["2xl"]) return "2xl";
  if (width >= breakPoints.xl) return "xl";
  if (width >= breakPoints.lg) return "lg";
  if (width >= breakPoints.md) return "md";
  if (width >= breakPoints.sm) return "sm";
  return "base";
}
const layoutMap = {
  base: {
    plusWidth: 90,
    balls: [
      { offsetX: +10, offsetY: 0, radius: 30 },
      { offsetX: +30, offsetY: -30, radius: 40 },
    ],
    pluses: [
      { posXRatio: 0.3, posYRatio: 0.35 },
      { posXRatio: 0.6, posYRatio: 0.55 },
      { posXRatio: 0.75, posYRatio: 0.3 },
    ],
  },
  sm: {
    plusWidth: 100,
    balls: [
      { offsetX: +20, offsetY: 0, radius: 35 },
      { offsetX: +40, offsetY: -30, radius: 50 },
    ],
    pluses: [
      { posXRatio: 0.35, posYRatio: 0.4 },
      { posXRatio: 0.65, posYRatio: 0.61 },
      { posXRatio: 0.8, posYRatio: 0.3 },
    ],
  },
  md: {
    plusWidth: 110,
    balls: [
      { offsetX: -20, offsetY: 0, radius: 50 },
      { offsetX: -60, offsetY: -50, radius: 60 },
    ],
    pluses: [
      { posXRatio: 0.55, posYRatio: 0.45 },
      { posXRatio: 0.7, posYRatio: 0.6 },
      { posXRatio: 0.8, posYRatio: 0.25 },
    ],
  },
  lg: {
    plusWidth: 120,
    balls: [
      { offsetX: -20, offsetY: 0, radius: 60 },
      { offsetX: -80, offsetY: -50, radius: 90 },
    ],
    pluses: [
      { posXRatio: 0.67, posYRatio: 0.42 },
      { posXRatio: 0.8, posYRatio: 0.61 },
      { posXRatio: 0.85, posYRatio: 0.25 },
    ],
  },
  xl: {
    plusWidth: 130,
    balls: [
      { offsetX: -30, offsetY: -10, radius: 65 },
      { offsetX: -90, offsetY: -60, radius: 100 },
    ],
    pluses: [
      { posXRatio: 0.7, posYRatio: 0.45 },
      { posXRatio: 0.83, posYRatio: 0.6 },
      { posXRatio: 0.9, posYRatio: 0.25 },
    ],
  },
  "2xl": {
    plusWidth: 140,
    balls: [
      { offsetX: -40, offsetY: -10, radius: 70 },
      { offsetX: -100, offsetY: -60, radius: 110 },
    ],
    pluses: [
      { posXRatio: 0.72, posYRatio: 0.47 },
      { posXRatio: 0.85, posYRatio: 0.6 },
      { posXRatio: 0.92, posYRatio: 0.22 },
    ],
  },
};

const getShape = {
  Plus: ({ posX, posY, plusWidth, plusThickness = 10 }: PlusProps) => {
    const settings = {
      render: {
        fillStyle: "#b93920",
        strokeStyle: "transparent",
        lineWidth: 0,
      },
      restitution: 0.95,
      frictionAir: 0.01,
    };
    const verticalBar = Bodies.rectangle(
      posX,
      posY,
      plusThickness,
      plusWidth,
      settings
    );

    const horizontalBar = Bodies.rectangle(
      posX,
      posY,
      plusWidth,
      plusThickness,
      settings
    );

    const plusShape = Body.create({
      parts: [verticalBar, horizontalBar],
      restitution: 0.3,
      frictionAir: 0.02,
      density: 0.002,
    });

    const pin = Constraint.create({
      pointA: { x: posX, y: posY },
      bodyB: plusShape,
      pointB: { x: 0, y: 0 },
      stiffness: 1,
      length: 0,
    });

    return { pin, plusShape };
  },
  Ball: ({ posX, posY, plusWidth, ballRadius }: BallProps) => {
    const ball = Bodies.circle(
      posX,
      posY - plusWidth - ballRadius - 20,
      ballRadius,
      {
        render: {
          fillStyle: "#2973B2",
          strokeStyle: "transparent",
          lineWidth: 0,
        },
        restitution: 0.9,
        frictionAir: 0.03,
      }
    );
    return ball;
  },
};

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
    const pixelRatio = window.devicePixelRatio || 1;

    canvas.style.width = `${containerWidth}px`;
    canvas.style.height = `${containerHeight}px`;

    const engine = Engine.create({
      gravity: { x: 0, y: 1.3, scale: 0.0008 },
    });

    const render = Render.create({
      element: container,
      canvas,
      engine,
      options: {
        width: containerWidth,
        height: containerHeight,
        background: "transparent",
        wireframes: false,
        pixelRatio,
      },
    });

    const breakpoint = getBreakpoint(windowWidth);
    const layout = layoutMap[breakpoint];

    const plusBodies = layout.pluses.map(({ posXRatio, posYRatio }) =>
      getShape.Plus({
        posX: containerWidth * posXRatio,
        posY: containerHeight * posYRatio,
        plusWidth: layout.plusWidth,
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
    <div ref={containerRef} className="absolute takeScreen -z-50">
      <canvas ref={canvasRef} className="block bg-transparent div" />
    </div>
  );
};

export default PhysicsShit;
