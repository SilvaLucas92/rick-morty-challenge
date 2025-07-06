import React from "react";
import "./Badge.scss";

type BadgeColor = "red" | "green" | "blue" | "gray";

interface BadgeProps {
  color?: BadgeColor;
  children: React.ReactNode;
}

export const Badge = ({ children, color = "blue" }: BadgeProps) => {
  return <span className={`badge badge--${color}`}>{children}</span>;
};
