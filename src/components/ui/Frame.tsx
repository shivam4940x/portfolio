import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  h?: number;
  w?: number;
}

const Frame = ({ children, className, w = 24, h = 16 }: Props) => {
  return (
    <div className={`relative ${className}`}>
      {children}
      <div className="absolute takeScreen">
        <div className="div relative">
          <div
            style={{
              width: `${w}px`,
              height: `${h}px`,
            }}
            className="border-l border-t absolute top-0 left-0"
          ></div>
          <div
            style={{
              width: `${w}px`,
              height: `${h}px`,
            }}
            className="h-4 w-6 border-r border-b absolute bottom-0 right-0"
          ></div>
        </div>
      </div>
    </div>
  );
};
export default Frame;
