import React from "react";
import "./Button.scss";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  disabled = false,
  ...props
}) => {
  return (
    <button className={"button"} disabled={disabled} {...props}>
      {children}
    </button>
  );
};
