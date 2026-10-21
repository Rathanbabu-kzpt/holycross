import Image from "next/image";
import Link from "next/link";
import { ChevronRight, type LucideIcon } from "lucide-react";
import FadeUp from "./FadeUp";
import { Butterfly } from "./decor/Flying";

type Props = {
  crumb: string;
  title: string;
  highlight?: string;
  intro: string;
  image: string;
  /** Quick-jump pills to sections on the page. */
  sections?: { label: string; href: string; icon: LucideIcon }[];
};

/** Banner used at the top of every inner page (same look as the Contact page). */
export default function PageHero({ crumb, title, highlight, intro, image, sections }: Props) {
  const slug = crumb.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  return (
    <section className="relative overflow-hidden bg-navy text-white">
      <Image src={image} alt="" fill priority sizes="100vw" className="kenburns object-cover" />
      <div className="absolute inset-0 bg-navy/80" />
      <div className="absolute inset-0 bg-gradient-to-b from-navy/40 via-transparent to-navy" />
      <div aria-hidden className="pointer-events-none absolute inset-0 hidden md:block">
        <Butterfly id={`hero-${slug}-1`} palette="sunset" size={46} style={{ top: "34%", left: "12%" }} duration={15} />
        <Butterfly id={`hero-${slug}-2`} palette="rose" size={38} style={{ top: "28%", right: "14%" }} duration={13} delay={-6} />
      </div>

      <div className="relative mx-auto max-w-5xl px-4 pb-20 pt-40 text-center sm:px-6 lg:pb-24 lg:pt-48">
        <FadeUp>
          <nav
            aria-label="Breadcrumb"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm text-white/70 backdrop-blur-md"
          >
            <Link href="/" className="transition hover:text-gold">Home</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="font-semibold text-gold">{crumb}</span>
          </nav>
        </FadeUp>
        <FadeUp delay={120}>
          <h1 className="mt-6 font-display text-5xl font-bold leading-[1.02] tracking-tight sm:text-7xl">
            {title} {highlight && <span className="text-gradient-light">{highlight}</span>}
          </h1>
        </FadeUp>
        <FadeUp delay={240}>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/80">{intro}</p>
        </FadeUp>
        {sections && (
          <FadeUp delay={360} className="mt-10 flex flex-wrap justify-center gap-2.5">
            {sections.map((s) => (
              <a
                key={s.href}
                href={s.href}
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur-md transition hover:-translate-y-0.5 hover:bg-gold hover:text-navy"
              >
                <s.icon className="h-4 w-4" /> {s.label}
              </a>
            ))}
          </FadeUp>
        )}
      </div>
    </section>
  );
}
