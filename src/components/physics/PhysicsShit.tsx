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
}

interface BallProps extends PlusProps {
  ballRadius: number;
}

const getShape = {
  Plus: ({ posX, posY, plusWidth }: PlusProps) => {
    const plusThickness = 10;
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

    const plusWidth = 120;
    const plusShapesConfig = [
      { posXRatio: 0.67, posYRatio: 0.42 },
      { posXRatio: 0.8, posYRatio: 0.61 },
      { posXRatio: 0.85, posYRatio: 0.25 },
    ];

    const plusBodies = plusShapesConfig.map(({ posXRatio, posYRatio }) => {
      const posX = containerWidth * posXRatio;
      const posY = containerHeight * posYRatio;
      return getShape.Plus({ posX, posY, plusWidth });
    });

    const ball1 = getShape.Ball({
      posX: containerWidth * plusShapesConfig[2].posXRatio - 20,
      posY: containerHeight * plusShapesConfig[0].posYRatio,
      plusWidth,
      ballRadius: 60,
    });

    const ball2 = getShape.Ball({
      posX: containerWidth * plusShapesConfig[0].posXRatio - 30,
      posY: containerHeight * plusShapesConfig[0].posYRatio - 50,
      plusWidth,
      ballRadius: 90,
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
    <div
      ref={containerRef}
      className="absolute takeScreen -z-50"
    >
      <canvas ref={canvasRef} className="block bg-transparent div" />
    </div>
  );
};

export default PhysicsShit;
