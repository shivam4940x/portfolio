import { useRouteTransition } from "@/hooks/useRouteTransition";
import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

const TransitionLink = ({
  to,
  children,
  className,
  fn,
}: {
  to: string;
  children: ReactNode;
  className?: string;
  fn?: () => void;
}) => {
  const navigate = useNavigate();
  const { beforeLoading } = useRouteTransition();
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (fn) {
      fn();
    }
    beforeLoading(() => {
      navigate(to);
    });
  };

  return (
    <a className={className} onClick={handleClick}>
      {children}
    </a>
  );
};
export default TransitionLink;
