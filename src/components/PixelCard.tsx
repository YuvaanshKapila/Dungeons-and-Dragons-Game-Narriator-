import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface PixelCardProps {
  children: ReactNode;
  title?: string;
  className?: string;
  variant?: "default" | "highlight" | "danger";
}

export const PixelCard = ({
  children,
  title,
  className,
  variant = "default",
}: PixelCardProps) => {
  const baseClasses = "relative border-2 bg-gradient-to-br p-6";

  const variants = {
    default: "from-card to-card/80 border-border",
    highlight: "from-card to-primary/10 border-primary/30",
    danger: "from-card to-destructive/10 border-destructive/30",
  };

  return (
    <div className={cn(baseClasses, variants[variant], className)}>
      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-white/5 pointer-events-none" />
      
      {title && (
        <div className="mb-4 pb-3 border-b border-border/30">
          <h3 className="pixel-text text-lg text-foreground font-pixel">{title}</h3>
        </div>
      )}

      <div className="relative z-10">{children}</div>

      <div className="absolute top-0 left-0 w-2 h-2 bg-primary/50" />
      <div className="absolute top-0 right-0 w-2 h-2 bg-primary/50" />
      <div className="absolute bottom-0 left-0 w-2 h-2 bg-primary/50" />
      <div className="absolute bottom-0 right-0 w-2 h-2 bg-primary/50" />
    </div>
  );
};
