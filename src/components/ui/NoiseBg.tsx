import cover from "@/assets/img/cover.jpg";
import type { ReactNode } from "react";
interface Props {
  children?: ReactNode;
  className?: string;
  opacity?: number;
}

const NoiseBg = ({ children, className, opacity = 0.3 }: Props) => {
  return (
    <div className={`relative ${className}`}>
      <div
        className="absolute takeScreen -z-40 pointer-events-none"
        style={{
          backgroundImage: `url(${cover})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: opacity / 100,
        }}
      ></div>
      {children}
    </div>
  );
};

export default NoiseBg;
