import type { CSSProperties, ElementType, ReactNode } from "react";

// CSS-only entrance animation for above-the-fold content (no JS, so it never delays first paint).
export default function FadeUp({
  children,
  as: Tag = "div",
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  as?: ElementType;
  delay?: number;
  className?: string;
}) {
  return (
    <Tag className={`fade-up ${className}`} style={{ animationDelay: `${delay}ms` } as CSSProperties}>
      {children}
    </Tag>
  );
}
