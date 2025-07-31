import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface PixelButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "accent" | "danger";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  className?: string;
}

export const PixelButton = ({
  children,
  onClick,
  variant = "primary",
  size = "md",
  disabled = false,
  className,
}: PixelButtonProps) => {
  const baseClasses = "pixel-text font-pixel transition-all duration-150 relative overflow-hidden border-2";

  const variants = {
    primary: "bg-gradient-to-br from-primary to-primary/80 hover:from-primary-glow hover:to-primary text-primary-foreground border-primary/30 hover:border-primary-glow/50",
    secondary: "bg-gradient-to-br from-secondary to-secondary/80 hover:from-secondary-glow hover:to-secondary text-secondary-foreground border-secondary/30 hover:border-secondary-glow/50",
    accent: "bg-gradient-to-br from-accent to-accent/80 hover:from-accent-glow hover:to-accent text-accent-foreground border-accent/30 hover:border-accent-glow/50",
    danger: "bg-gradient-to-br from-destructive to-destructive/80 hover:from-destructive/90 hover:to-destructive text-destructive-foreground border-destructive/30 hover:border-destructive/50",
  };

  const sizes = {
    sm: "px-3 py-2 text-xs",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base",
  };

  const stateClasses = disabled
    ? "opacity-50 cursor-not-allowed"
    : "hover:shadow-[0_0_12px_hsl(var(--primary-glow)_/_0.5)] hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-none";

  return (
    <button
      onClick={disabled ? undefined : onClick}
      className={cn(baseClasses, variants[variant], sizes[size], stateClasses, className)}
      disabled={disabled}
    >
      <span className="relative z-10">{children}</span>
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
    </button>
  );
};
