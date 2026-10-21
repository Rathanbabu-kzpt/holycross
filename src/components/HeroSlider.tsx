"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight, Phone } from "lucide-react";
import { slides } from "@/content/home";
import { school } from "@/content/site";
import { BirdFlock, Butterfly } from "./decor/Flying";

const INTERVAL = 6500;

export default function HeroSlider() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchX = useRef<number | null>(null);
  const count = slides.length;

  const go = useCallback((i: number) => setIndex(((i % count) + count) % count), [count]);

  useEffect(() => {
    if (paused) return;
    const t = window.setTimeout(() => go(index + 1), INTERVAL);
    return () => window.clearTimeout(t);
  }, [index, paused, go]);

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Highlights"
      className={`relative h-[100svh] min-h-[640px] max-h-[960px] overflow-hidden bg-navy text-white ${paused ? "paused" : ""}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 50) go(index + (dx < 0 ? 1 : -1));
        touchX.current = null;
      }}
    >
      {/* Slides */}
      {slides.map((s, i) => {
        const active = i === index;
        return (
          <div
            key={s.image}
            aria-hidden={!active}
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${count}`}
            className={`absolute inset-0 transition-opacity duration-[1200ms] ease-out ${
              active ? "z-10 opacity-100" : "z-0 opacity-0"
            }`}
          >
            <div key={active ? `on-${index}` : "off"} className={`absolute inset-0 ${active ? "kenburns" : ""}`}>
              <Image
                src={s.image}
                alt=""
                fill
                priority={i === 0}
                sizes="100vw"
                className="object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/70 to-navy/10" />
            <div className="absolute inset-0 bg-gradient-to-t from-navy via-transparent to-navy/40" />

            {active && (
              <div className="relative mx-auto flex h-full max-w-7xl items-center px-4 pt-24 sm:px-6">
                <div className="max-w-2xl">
                  <p className="fade-up inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-semibold text-gold backdrop-blur-md">
                    <span className="h-2 w-2 rounded-full bg-gold" />
                    {s.eyebrow}
                  </p>
                  <h1
                    className="fade-up mt-6 font-display text-5xl font-bold leading-[1.02] tracking-tight sm:text-7xl lg:text-[5.5rem]"
                    style={{ animationDelay: "120ms" }}
                  >
                    {s.title} <span className="text-gradient-light">{s.highlight}</span>
                  </h1>
                  <p
                    className="fade-up mt-6 max-w-xl text-lg leading-relaxed text-white/80 sm:text-xl"
                    style={{ animationDelay: "240ms" }}
                  >
                    {s.text}
                  </p>
                  <div className="fade-up mt-10 flex flex-wrap gap-4" style={{ animationDelay: "360ms" }}>
                    <Link
                      href={s.cta.href}
                      className="group inline-flex items-center gap-3 rounded-full bg-crimson py-2 pl-7 pr-2 font-bold text-white shadow-2xl shadow-crimson/40 transition hover:bg-crimson-dark"
                    >
                      {s.cta.label}
                      <span className="grid h-10 w-10 place-items-center rounded-full bg-white text-crimson transition group-hover:rotate-[-45deg]">
                        <ArrowRight className="h-4 w-4" />
                      </span>
                    </Link>
                    <a
                      href={school.phoneHref}
                      className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-7 py-3.5 font-bold backdrop-blur-md transition hover:bg-white hover:text-navy"
                    >
                      <Phone className="h-4 w-4" /> Call {school.phone}
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}

      {/* Birds crossing the sky */}
      <BirdFlock className="top-[13%] z-[15] h-56" />
      <div aria-hidden className="pointer-events-none absolute inset-0 z-[15] hidden md:block">
        <Butterfly id="hero-1" palette="sunset" size={52} style={{ top: "62%", left: "48%" }} duration={16} />
        <Butterfly id="hero-2" palette="rose" size={40} style={{ top: "24%", right: "26%" }} duration={13} delay={-6} />
        <Butterfly id="hero-3" palette="mint" size={36} style={{ top: "72%", right: "8%" }} duration={15} delay={-3} />
        <Butterfly id="hero-4" palette="royal" size={44} style={{ top: "16%", left: "62%" }} duration={17} delay={-10} />
      </div>

      {/* Controls */}
      <div className="absolute inset-x-0 bottom-0 z-20">
        <div className="mx-auto flex max-w-7xl items-end justify-between gap-6 px-4 pb-8 sm:px-6 sm:pb-10">
          <div className="grid flex-1 grid-cols-4 gap-3 sm:gap-5 lg:max-w-3xl">
            {slides.map((s, i) => (
              <button
                key={s.label}
                type="button"
                onClick={() => go(i)}
                aria-label={`Go to slide ${i + 1}: ${s.label}`}
                aria-current={i === index}
                className="group text-left"
              >
                <span className="block h-[3px] overflow-hidden rounded-full bg-white/25">
                  {i === index ? (
                    <span
                      key={index}
                      className="slide-progress block h-full bg-gold"
                      style={{ animationDuration: `${INTERVAL}ms` }}
                    />
                  ) : (
                    <span className={`block h-full bg-white/70 ${i < index ? "w-full" : "w-0"}`} />
                  )}
                </span>
                <span
                  className={`mt-3 hidden text-sm font-semibold transition sm:block ${
                    i === index ? "text-white" : "text-white/50 group-hover:text-white/80"
                  }`}
                >
                  <span className="mr-2 font-display text-gold">0{i + 1}</span>
                  {s.label}
                </span>
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => go(index - 1)}
              aria-label="Previous slide"
              className="grid h-12 w-12 place-items-center rounded-full border border-white/30 bg-white/10 backdrop-blur-md transition hover:bg-white hover:text-navy"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => go(index + 1)}
              aria-label="Next slide"
              className="grid h-12 w-12 place-items-center rounded-full bg-gold text-navy transition hover:bg-white"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Floating crest */}
      <div className="pointer-events-none absolute right-[6%] top-1/2 z-10 hidden -translate-y-1/2 xl:block">
        <div className="relative h-72 w-72">
          <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full animate-spin-slow" aria-hidden>
            <defs>
              <path id="crest-circle" d="M100,100 m-88,0 a88,88 0 1,1 176,0 a88,88 0 1,1 -176,0" />
            </defs>
            <text className="fill-white/80 text-[13px] font-bold uppercase tracking-[0.32em]">
              <textPath href="#crest-circle">Wisdom is Light • Holy Cross High School • </textPath>
            </text>
          </svg>
          <div className="absolute inset-10 animate-float">
            <Image src="/brand/logo-512.png" alt="" fill sizes="200px" className="drop-shadow-[0_25px_40px_rgba(0,0,0,0.55)]" />
          </div>
        </div>
      </div>
    </section>
  );
}
