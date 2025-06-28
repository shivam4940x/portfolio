import { Bodies, Body, Constraint, Engine, Render } from "matter-js";

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
interface LetterProps {
  posX: number;
  posY: number;
  size: number;
}
type Breakpoint = "base" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
const breakPoints = {
  base: 0,
  xs: 400,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
};
const letterOffsets: Record<Breakpoint, Record<string, number>> = {
  base: {
    W: -20,
    O: 0,
    R: 5,
    K: -15,
  },
  xs: {
    W: -18,
    O: 0,
    R: 5,
    K: -13,
  },
  sm: {
    W: -16,
    O: 0,
    R: 4,
    K: -12,
  },
  md: {
    W: -18,
    O: 0,
    R: 5,
    K: -15,
  },
  lg: {
    W: -20,
    O: 0,
    R: 5,
    K: -17,
  },
  xl: {
    W: -22,
    O: 0,
    R: 6,
    K: -18,
  },
  "2xl": {
    W: -24,
    O: 0,
    R: 6,
    K: -20,
  },
};

const colors = {
  ball: "#00809D",
  word: "#FFFFFF",
  primary: "#0b1a2a",
  secondary: "#b93920",
};

const baseStyle = () => ({
  render: {
    fillStyle: colors.word,
    strokeStyle: "transparent",
    lineWidth: 0,
  },
});
const getBreakpoint = (width: number): keyof typeof breakPoints => {
  if (width >= breakPoints["2xl"]) return "2xl";
  if (width >= breakPoints.xl) return "xl";
  if (width >= breakPoints.lg) return "lg";
  if (width >= breakPoints.md) return "md";
  if (width >= breakPoints.sm) return "sm";
  if (width >= breakPoints.xs) return "xs";
  return "base";
};

const breakpoints = ["base", "xs", "sm", "md", "lg", "xl", "2xl"] as const;

const getShape = {
  Plus: ({ posX, posY, plusWidth, plusThickness = 15 }: PlusProps) => {
    const settings = {
      render: {
        fillStyle: colors.secondary,
        strokeStyle: "transparent",
        lineWidth: 0,
      },
      restitution: 0.95,
      frictionAir: 0.001,
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
      restitution: 0.1,
      frictionAir: 0.01,
      density: 0.002,
    });

    const pin = Constraint.create({
      pointA: { x: posX, y: posY },
      bodyB: plusShape,
      pointB: { x: 0, y: 0 },
      stiffness: 0.5,
      length: 0,
      render: {
        visible: false,
      },
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
          fillStyle: colors.ball,
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
const createConfig = { frictionAir: 0.02, restitution: 0.5, density: 0.002 };
const getLetter = {
  W: ({ posX, posY, size }: LetterProps) => {
    const thickness = size / 6;
    const height = size;
    const offset = size / 3;

    const horizontalGap = thickness * 0.5; // scales with thickness
    const verticalOffset = offset / 1.5;
    const diagonalHeight = height * 0.6;

    const left = Bodies.rectangle(
      posX - offset - horizontalGap + thickness * 0.15,
      posY,
      thickness,
      height,
      baseStyle()
    );

    const middleLeft = Bodies.rectangle(
      posX - thickness / 2 - horizontalGap / 1.2,
      posY + verticalOffset,
      thickness,
      diagonalHeight,
      baseStyle()
    );
    Body.rotate(middleLeft, Math.PI / 4);

    const middleRight = Bodies.rectangle(
      posX + thickness / 2 + horizontalGap / 1.2,
      posY + verticalOffset,
      thickness,
      diagonalHeight,
      baseStyle()
    );
    Body.rotate(middleRight, Math.PI / -4);

    const right = Bodies.rectangle(
      posX + offset + horizontalGap - thickness * 0.15,
      posY,
      thickness,
      height,
      baseStyle()
    );

    return Body.create({
      parts: [left, middleLeft, middleRight, right],
      ...createConfig,
    });
  },

  O: ({ posX, posY, size }: LetterProps) => {
    const outerSize = size;
    const innerSize = size * 0.55;

    const outer = Bodies.rectangle(posX, posY, outerSize, outerSize, {
      ...baseStyle(),
      render: {
        fillStyle: colors.secondary,
      },
    });

    const inner = Bodies.rectangle(posX, posY, innerSize, innerSize, {
      ...baseStyle(),
      isSensor: true,
      render: { visible: true, fillStyle: colors.primary },
    });

    const donut = Body.create({
      parts: [outer, inner],
      ...createConfig,
    });

    return donut;
  },

  R: ({ posX, posY, size }: LetterProps) => {
    const thickness = size / 6;
    const height = size;

    const parts: Body[] = [];

    // 1. Diagonal leg (placed first to appear behind)
    const legHeight = height * 0.6;
    const legWidth = thickness;
    const leg = Bodies.rectangle(
      10,
      height * 0.25,
      legWidth,
      legHeight,
      baseStyle()
    );
    Body.rotate(leg, Math.PI / -5);

    parts.push(leg);

    // 2. Vertical bar (left stem)
    const vertical = Bodies.rectangle(
      -thickness,
      0,
      thickness,
      height,
      baseStyle()
    );
    parts.push(vertical);

    // 3. Donut box (top right, overlapping vertical)
    const outerSize = thickness * 3.2;
    const innerSize = outerSize * 0.4;
    const donutX = -thickness / 2 + thickness * 1.6 - thickness; // shift left a bit to overlap
    const donutY = -height / 2 + outerSize / 2 - 1; // align tops

    const outer = Bodies.rectangle(donutX, donutY, outerSize, outerSize, {
      ...baseStyle(),
    });

    const inner = Bodies.rectangle(donutX, donutY, innerSize, innerSize, {
      ...baseStyle(),
      render: { fillStyle: colors.primary },
    });

    parts.push(outer);
    parts.push(inner);

    // 4. Create shape
    const R = Body.create({
      parts,
      ...createConfig,
    });

    Body.setPosition(R, { x: posX, y: posY });
    return R;
  },
  K: ({ posX, posY, size }: LetterProps) => {
    const thickness = size / 6;
    const height = size;
    posX -= 15;
    const vertical = Bodies.rectangle(
      posX - thickness,
      posY,
      thickness,
      height,
      baseStyle()
    );

    const upperDiagonal = Bodies.rectangle(
      posX + thickness / 1.5,
      posY - height / 6,
      height / 1.3,
      thickness * 0.9,
      {
        ...baseStyle(),
        angle: -Math.PI / 5,
      }
    );

    const lowerDiagonal = Bodies.rectangle(
      posX + thickness / 1,
      posY + height / 5,
      height / 1.3,
      thickness * 0.9,
      {
        ...baseStyle(),
        angle: Math.PI / 5,
      }
    );

    return Body.create({
      parts: [vertical, upperDiagonal, lowerDiagonal],
      ...createConfig,
    });
  },
};
const getRender = ({
  container,
  containerWidth,
  containerHeight,
  canvas,
}: {
  container: HTMLDivElement;
  containerWidth: number;
  containerHeight: number;
  canvas: HTMLCanvasElement;
}) => {
  const engine = Engine.create({
    gravity: { x: 0, y: 1.3, scale: 0.0008 },
  });
  const pixelRatio = window.devicePixelRatio || 1;
  canvas.style.width = `${containerWidth}px`;
  canvas.style.height = `${containerHeight}px`;
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
  const thickness = 1;
  const leftWall = Bodies.rectangle(
    0 - thickness / 2,
    containerHeight / 2,
    thickness,
    containerHeight,
    { isStatic: true }
  );
  const rightWall = Bodies.rectangle(
    containerWidth + thickness / 2,
    containerHeight / 2,
    thickness,
    containerHeight,
    { isStatic: true }
  );

  const walls = [rightWall, leftWall];
  return { render, engine, pixelRatio, walls };
};
export {
  colors,
  getBreakpoint,
  getShape,
  breakpoints,
  getLetter,
  getRender,
  letterOffsets,
};
