import Image from "next/image";
import { CheckCircle2, type LucideIcon } from "lucide-react";
import Reveal from "./Reveal";

type Props = {
  id: string;
  index: number;
  icon: LucideIcon;
  eyebrow: string;
  title: string;
  text: string;
  points: string[];
  image: string;
  imageAlt: string;
  /** Put the photo on the right instead of the left. */
  flip?: boolean;
};

const accents = [
  "from-crimson to-[#ff6a3d]",
  "from-royal to-[#7b5cff]",
  "from-[#f59e0b] to-gold",
  "from-[#059669] to-[#34d399]",
];

/** Photo + text block used for each facility / activity section. */
export default function FeatureSplit({ id, index, icon: Icon, eyebrow, title, text, points, image, imageAlt, flip }: Props) {
  const accent = accents[index % accents.length];
  return (
    <section id={id} className="scroll-mt-28 py-12 lg:py-16">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16">
        <Reveal className={`relative ${flip ? "lg:order-2" : ""}`}>
          <div className={`absolute -inset-3 rotate-2 rounded-[2.5rem] bg-gradient-to-br opacity-20 ${accent}`} aria-hidden />
          <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] shadow-xl">
            <Image src={image} alt={imageAlt} fill sizes="(min-width:1024px) 600px, 100vw" className="object-cover transition duration-700 hover:scale-105" />
          </div>
          <span
            className={`absolute -bottom-6 ${flip ? "-left-2 sm:-left-6" : "-right-2 sm:-right-6"} grid h-20 w-20 place-items-center rounded-3xl bg-gradient-to-br text-white shadow-2xl ${accent}`}
          >
            <Icon className="h-9 w-9" />
          </span>
        </Reveal>

        <Reveal delay={120}>
          <p className="eyebrow text-crimson">
            <span className="font-display text-base text-navy/30">0{index + 1}</span>
            <span className="h-px w-6 bg-current" /> {eyebrow}
          </p>
          <h2 className="mt-3 font-display text-4xl font-bold leading-tight tracking-tight text-navy sm:text-5xl">{title}</h2>
          <p className="mt-5 text-lg leading-relaxed text-muted">{text}</p>
          <ul className="mt-7 grid gap-3 sm:grid-cols-2">
            {points.map((p) => (
              <li key={p} className="flex items-start gap-2.5 rounded-2xl bg-white px-4 py-3 font-medium text-navy ring-1 ring-line">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-crimson" /> {p}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
