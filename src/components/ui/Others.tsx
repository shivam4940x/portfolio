import React, { useEffect, useState } from "react";

const Clock = () => {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const formatted = now.toLocaleTimeString("en-IN", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      setTime(formatted);
    };

    update(); // initialize immediately
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval); // cleanup
  }, []);

  return <div>{time}</div>;
};

type ShapeProps = React.SVGProps<SVGSVGElement>;

const commonSvgProps = {
  className: "h-[clamp(1.8rem,3vw,4rem)] w-auto opacity-90",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none" as const,
};

const Shape1 = React.forwardRef<SVGSVGElement, ShapeProps>((props, ref) => (
  <svg {...commonSvgProps} {...props} ref={ref} viewBox="0 0 100 100">
    <g clipPath="url(#clip0)">
      <path
        d="M50 0L63.5 36.5L100 50L63.5 63.5L50 100L36.5 63.5L0 50L36.5 36.5L50 0Z"
        fill="#ffc857"
      />
    </g>
    <defs>
      <clipPath id="clip0">
        <rect width="100" height="100" fill="#ffc857" />
      </clipPath>
    </defs>
  </svg>
));

const Shape2 = React.forwardRef<SVGSVGElement, ShapeProps>((props, ref) => (
  <svg {...commonSvgProps} {...props} ref={ref} viewBox="0 0 96 91">
    <path
      d="M48 0L95.55 34.55L77.39 90.45H18.61L0.45 34.55L48 0Z"
      fill="#ffc857"
    />
  </svg>
));

const Shape3 = React.forwardRef<SVGSVGElement, ShapeProps>((props, ref) => (
  <svg {...commonSvgProps} {...props} ref={ref} viewBox="0 0 88 100">
    <path d="M44 0L87.3 25V75L44 100L0.7 75V25L44 0Z" fill="#ffc857" />
  </svg>
));

const Shape4 = React.forwardRef<SVGSVGElement, ShapeProps>((props, ref) => (
  <svg
    {...{
      ...commonSvgProps,
      className: "h-[clamp(1.8rem,2.3vw,4rem)] w-auto opacity-90",
    }}
    {...props}
    ref={ref}
    viewBox="0 0 88 75"
  >
    <path d="M44 0L87.3 75H0.7L44 0Z" fill="#ffc857" />
  </svg>
));

export { Shape1, Shape2, Shape3, Shape4, Clock };
