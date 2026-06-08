"use client";

import { ButtonHTMLAttributes } from "react";
import s from "./Button.module.css";

type PropsType = {
  className?: string;
  disabled?: boolean;
  title: string;
  variant?: "filled" | "outlined" | "secondary";
  onClick: () => void;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({
  className,
  disabled,
  title,
  variant = "filled",
  onClick,
  ...restProps
}: PropsType) => {
  return (
    <button
      className={`${s.button} ${s[variant]} ${className || ""}`}
      onClick={onClick}
      disabled={disabled}
      {...restProps}
    >
      {title}
    </button>
  );
};
