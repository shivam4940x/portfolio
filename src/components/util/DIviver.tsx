import type { ReactNode } from "react";

type DiviverProps = {
  children?: ReactNode;
  className?: string;
};

const Diviver = ({ children, className }: DiviverProps) => {
  return (
    <div
      className={`border-t border-b /50 h-8 px-[var(--side)] flex justify-between ${className}`}
    >
      <div className="w-8"></div>
      <div className="/50 border-l bg-secondary grow">
        {children}
      </div>
      <div className="w-8"></div>
    </div>
  );
};

export default Diviver;
