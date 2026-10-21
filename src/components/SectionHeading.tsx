import type { ReactNode } from "react";
import Reveal from "./Reveal";

type Props = {
  eyebrow: string;
  title: ReactNode;
  intro?: string;
  align?: "center" | "left";
  light?: boolean;
};

export default function SectionHeading({ eyebrow, title, intro, align = "center", light = false }: Props) {
  const centered = align === "center";
  return (
    <Reveal className={`${centered ? "mx-auto text-center" : ""} max-w-2xl`}>
      <span className={`eyebrow ${light ? "text-gold" : "text-crimson"} ${centered ? "justify-center" : ""}`}>
        <span className="h-px w-6 bg-current" />
        {eyebrow}
        {centered && <span className="h-px w-6 bg-current" />}
      </span>
      <h2
        className={`mt-4 font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-[3.5rem] ${
          light ? "text-white" : "text-navy"
        }`}
      >
        {title}
      </h2>
      {intro && (
        <p className={`mt-5 text-base leading-relaxed sm:text-lg ${light ? "text-white/70" : "text-muted"}`}>
          {intro}
        </p>
      )}
    </Reveal>
  );
}
