import { useAnimeScope } from "@/hooks/useAnimeScope";
import { animate, stagger, utils } from "animejs";
import { useEffect, useRef, useState } from "react";

const SQUARE_SIZE = 80; // in px
const GridBg = () => {
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
    const $squares = utils.$(".square");
    if (!$squares.length) return;

    const cols =
      Math.floor((bgRef.current?.offsetWidth || 0) / SQUARE_SIZE) + 1;
    const rows = Math.ceil(positions.length / cols);
    const total = cols * rows;

    const bottomRightIndex = total - 1;

    scope.current?.add(() => {
      animate(".square", {
        backgroundColor: [
          { to: "rgba(83, 113, 137, 0.2)" },
          { to: "rgba(83, 113, 137, 0)" },
        ],
        duration: 4500,
        loop: true,
        delay: stagger(90, {
          grid: [cols, rows],
          from: bottomRightIndex,
        }),
        easing: "linear",
      });
    });
  }, [positions, scope]);

  return (
    <div ref={root}>
      <div
        ref={bgRef}
        className="absolute takeScreen -z-50 w-full h-full opacity-90 bg-black/20"
      >
        {positions.map((pos, i) => (
          <div
            key={i}
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
