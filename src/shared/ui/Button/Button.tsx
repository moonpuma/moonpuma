"use client";

import s from "./Button.module.css";

type PropsType = {
  className?: string;
  disabled?: boolean;
  title: string;
  variant?: "filled" | "outlined" | "secondary";
  onClick: () => void;
};

export const Button = ({
  className,
  disabled,
  title,
  variant = "filled",
  onClick,
}: PropsType) => {
  return (
    <button
      className={`${s[variant]} ${className || ""}`}
      onClick={onClick}
      disabled={disabled}
    >
      {title}
    </button>
  );
};
