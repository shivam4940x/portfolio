import { useAnimeScope } from "@/hooks/useAnimeScope";
import { animate, stagger } from "animejs";
import { useEffect, useRef, useState } from "react";

const SQUARE_SIZE = 80; // in px
const GridBg = ({
  random = false,
  opacity = 100,
}: {
  random?: boolean;
  opacity?: number;
}) => {
  const [positions, setPositions] = useState<{ top: number; left: number }[]>(
    []
  );
  const { root, scope } = useAnimeScope();
  const bgRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const updateSquares = () => {
      if (bgRef.current) {
        const width = bgRef.current.offsetWidth;
        const height = bgRef.current.offsetHeight;
        const cols = Math.floor(width / SQUARE_SIZE) + 2;
        const rows = Math.floor(height / SQUARE_SIZE) + 2;

        const newPositions: { top: number; left: number }[] = [];

        for (let row = 0; row < rows; row++) {
          for (let col = 0; col < cols; col++) {
            newPositions.push({
              top: row * SQUARE_SIZE,
              left: col * SQUARE_SIZE,
            });
          }
        }

        setPositions(newPositions);
      }
    };

    updateSquares();
    window.addEventListener("resize", updateSquares);
    return () => window.removeEventListener("resize", updateSquares);
  }, []);

  useEffect(() => {
    const $squares = bgRef.current?.querySelectorAll(".square") || [];
    if (!$squares.length) return;

    const cols =
      Math.floor((bgRef.current?.offsetWidth || 0) / SQUARE_SIZE) + 1;
    const rows = Math.ceil(positions.length / cols);

    scope.current?.add((self) => {
      const backgroundColor = [
        { to: "rgba(83, 113, 137, 0.2)" },
        { to: "rgba(83, 113, 137, 0)" },
      ];
      const ran = () => {
        const fromX = Math.floor(Math.random() * cols);
        const fromY = Math.floor(Math.random() * rows);

        animate($squares, {
          backgroundColor,
          duration: 1200,
          delay: stagger(50, {
            grid: [cols, rows],
            from: fromY * cols + fromX,
          }),
          onComplete: () => {
            requestAnimationFrame(ran);
          },
          ease: "linear",
        });
      };

      if (random) {
        requestAnimationFrame(ran);
      } else {
        self.add("animate", (index) => {
          animate($squares[index], {
            backgroundColor,
            duration: 1500,
            ease: "linear",
          });
        });
      }
    });
  }, [positions, scope, random]);

  return (
    <div
      style={{
        opacity: opacity / 100,
      }}
      ref={root}
    >
      <div
        ref={bgRef}
        className="absolute takeScreen z-10 w-full h-full opacity-90 bg-black/20"
      >
        {positions.map((pos, i) => (
          <div
            key={i}
            onMouseOver={() => {
              if (scope.current) scope.current?.methods.animate(i);
            }}
            className="absolute border border-border-light square"
            style={{
              width: `${SQUARE_SIZE}px`,
              height: `${SQUARE_SIZE}px`,
              top: `${pos.top - 1}px`,
              left: `${pos.left - 40}px`,
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default GridBg;
