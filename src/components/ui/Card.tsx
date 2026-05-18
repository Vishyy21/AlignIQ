import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export function Card({ children, className, glow = false, style }: { children: ReactNode, className?: string, glow?: boolean, style?: React.CSSProperties }) {
  return (
    <div className={cn("bg-surface border border-border-primary rounded-xl overflow-hidden transition-all duration-300", glow && "glow-card", className)} style={style}>
      {children}
    </div>
  );
}
