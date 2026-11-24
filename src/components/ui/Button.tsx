import { forwardRef } from "react";
import { motion } from "framer-motion";
import { cn } from "../../utils/cn";

type ButtonVariant = "primary" | "secondary" | "ghost";

interface ButtonProps {
  variant?: ButtonVariant;
  href?: string;
  external?: boolean;
  className?: string;
  children?: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  "aria-label"?: string;
}

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-primary text-[#04100a] font-semibold shadow-lg shadow-primary/20 hover:shadow-[0_0_28px_-2px_rgba(61,255,154,0.55)] hover:bg-[#6dffb3] border border-primary/80",
  secondary:
    "bg-transparent text-primary font-semibold border border-primary/60 hover:border-primary hover:bg-primary/10 hover:shadow-[0_0_24px_-6px_rgba(61,255,154,0.45)]",
  ghost:
    "text-text-muted border border-border/50 bg-transparent hover:text-text-primary hover:border-border hover:bg-bg-secondary/60",
};

const baseClasses =
  "btn-shine inline-flex items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary disabled:pointer-events-none disabled:opacity-50";

const motionProps = {
  whileHover: { scale: 1.02, y: -1 },
  whileTap: { scale: 0.98 },
  transition: { type: "spring" as const, stiffness: 400, damping: 25 },
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      href,
      external,
      children,
      type = "button",
      disabled,
      onClick,
      "aria-label": ariaLabel,
    },
    ref,
  ) => {
    const classes = cn(baseClasses, variants[variant], className);

    if (href) {
      return (
        <motion.a
          href={href}
          className={classes}
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
          aria-label={ariaLabel ?? (typeof children === "string" ? children : undefined)}
          {...motionProps}
        >
          {children}
        </motion.a>
      );
    }

    return (
      <motion.button
        ref={ref}
        type={type}
        disabled={disabled}
        onClick={onClick}
        className={classes}
        aria-label={ariaLabel}
        {...motionProps}
      >
        {children}
      </motion.button>
    );
  },
);

Button.displayName = "Button";
