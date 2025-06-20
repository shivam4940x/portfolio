import type { ReactNode } from "react";

interface Props {
  children?: ReactNode;
  mx?: number;
  className?: string;
}

const Divider = ({ children, mx = 0, className }: Props) => {
  if (!children) {
    return (
      <div
        style={{
          paddingLeft: `${mx / 2}px`,
          paddingRight: `${mx / 2}px`,
        }}
      >
        <div className={`h-px w-full border-t ${className}`}></div>
      </div>
    );
  } else {
    return (
      <div
        style={{
          marginLeft: `${mx / 2}px`,
          marginRight: `${mx / 2}px`,
        }}
      >
        <div className={`h-px w-full border-t ${className}`}></div>
      </div>
    );
  }
};
export default Divider;
