import type { ReactNode } from "react";
import "./Container.scss";

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

export const Container = ({ children }: ContainerProps) => {
  return <main className="container">{children}</main>;
};
