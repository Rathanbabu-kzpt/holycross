"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowRight, ChevronDown, Mail, Menu, Phone, Sparkles, X } from "lucide-react";
import Logo from "./Logo";
import SocialIcons from "./SocialIcons";
import { nav, school } from "@/content/site";

// Icon tile colours cycle through the brand palette.
const tones = [
  "bg-crimson/10 text-crimson group-hover/item:bg-crimson group-hover/item:text-white",
  "bg-royal/10 text-royal group-hover/item:bg-royal group-hover/item:text-white",
  "bg-gold/25 text-[#a77a00] group-hover/item:bg-gold group-hover/item:text-navy",
  "bg-emerald-500/10 text-emerald-600 group-hover/item:bg-emerald-500 group-hover/item:text-white",
  "bg-violet-500/10 text-violet-600 group-hover/item:bg-violet-500 group-hover/item:text-white",
  "bg-orange-500/10 text-orange-600 group-hover/item:bg-orange-500 group-hover/item:text-white",
];

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

// Fixed header: transparent over each page's dark hero, turning solid white once the page scrolls.
export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  // Desktop dropdown is driven by CSS hover/focus; this lets a click on a link close it immediately.
  const [suppressed, setSuppressed] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const closeAll = () => {
    setMobileOpen(false);
    setExpanded(null);
  };

  const solid = scrolled;
  const linkBase = solid ? "text-ink/80 hover:text-navy" : "text-white/85 hover:text-white";

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50">
        {/* Utility bar — collapses on scroll */}
        <div
          className={`hidden overflow-hidden border-b border-white/10 text-white/75 transition-all duration-300 md:block ${
            solid ? "h-0 border-transparent opacity-0" : "h-10 opacity-100"
          }`}
        >
          <div className="mx-auto flex h-10 max-w-7xl items-center justify-between px-6 text-[13px]">
            <div className="flex items-center gap-6">
              <span className="flex items-center gap-2">
                <Phone className="h-3.5 w-3.5 text-gold" />
                {school.phones.map((p, i) => (
                  <span key={p.href} className="flex items-center gap-2">
                    {i > 0 && <span className="text-white/30">/</span>}
                    <a href={p.href} className="transition hover:text-gold">{p.label}</a>
                  </span>
                ))}
              </span>
              <a href={`mailto:${school.email}`} className="flex items-center gap-2 transition hover:text-gold">
                <Mail className="h-3.5 w-3.5 text-gold" /> {school.email}
              </a>
            </div>
            <div className="flex items-center gap-5">
              <Link href="/admissions" className="flex items-center gap-2 font-semibold text-gold transition hover:text-white">
                <Sparkles className="h-3.5 w-3.5" /> Admissions open for {school.admissionYear}
              </Link>
              <span className="h-4 w-px bg-white/20" aria-hidden />
              <SocialIcons />
            </div>
          </div>
        </div>

        <div
          className={`transition-all duration-300 ${
            solid
              ? "bg-white/90 shadow-[0_10px_40px_-15px_rgba(11,20,55,0.3)] backdrop-blur-xl"
              : "bg-transparent"
          }`}
        >
          <div className={`relative mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 transition-all duration-300 sm:px-6 ${solid ? "h-20" : "h-24 sm:h-28"}`}>
            <Logo light={!solid} />

            {/* Desktop nav */}
            <nav aria-label="Main" className="hidden xl:block">
              <ul className="flex items-center gap-0.5">
                {nav.map((item) => {
                  const active = isActive(pathname, item.href);
                  const activeCls = solid ? "text-crimson" : "text-gold";
                  if (item.href === "/") {
                    // Home as a round icon button
                    return (
                      <li key={item.label} className="mr-2">
                        <Link
                          href="/"
                          aria-label="Home"
                          title="Home"
                          aria-current={active ? "page" : undefined}
                          className={`grid h-11 w-11 place-items-center rounded-full transition hover:-translate-y-0.5 ${
                            active
                              ? "bg-gold text-navy shadow-lg shadow-gold/30"
                              : solid
                                ? "bg-cream text-navy ring-1 ring-line hover:bg-gold"
                                : "bg-white/10 text-white ring-1 ring-white/25 backdrop-blur-md hover:bg-gold hover:text-navy"
                          }`}
                        >
                          <item.icon className="h-5 w-5" />
                        </Link>
                      </li>
                    );
                  }
                  if (item.href === "/contact") {
                    // Contact Us as the call-to-action button
                    return (
                      <li key={item.label} className="ml-3">
                        <Link
                          href="/contact"
                          aria-current={active ? "page" : undefined}
                          className={`group/cta inline-flex items-center gap-2.5 whitespace-nowrap rounded-full py-1.5 pl-5 pr-1.5 text-[15px] font-bold transition hover:-translate-y-0.5 ${
                            active
                              ? "bg-gold text-navy shadow-lg shadow-gold/30"
                              : "bg-crimson text-white shadow-lg shadow-crimson/30 hover:bg-crimson-dark"
                          }`}
                        >
                          Contact Us
                          <span className={`grid h-8 w-8 place-items-center rounded-full transition group-hover/cta:rotate-12 ${active ? "bg-navy text-gold" : "bg-white text-crimson"}`}>
                            <Phone className="h-4 w-4" />
                          </span>
                        </Link>
                      </li>
                    );
                  }
                  if (!item.children) {
                    return (
                      <li key={item.label}>
                        <Link
                          href={item.href}
                          className={`relative whitespace-nowrap rounded-full px-3.5 py-2 text-[15px] font-semibold transition ${
                            active ? activeCls : linkBase
                          }`}
                        >
                          {item.label}
                          {active && <span className="absolute left-1/2 -bottom-1 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-current" />}
                        </Link>
                      </li>
                    );
                  }
                  return (
                    <li key={item.label} className="group" onMouseLeave={() => setSuppressed(null)}>
                      <Link
                        href={item.href}
                        aria-haspopup="true"
                        onNavigate={() => setSuppressed(item.label)}
                        className={`relative flex items-center gap-1 whitespace-nowrap rounded-full px-3.5 py-2 text-[15px] font-semibold transition ${
                          active ? activeCls : linkBase
                        }`}
                      >
                        {item.label}
                        <ChevronDown className="h-4 w-4 opacity-70 transition-transform duration-300 group-hover:rotate-180" />
                        {active && <span className="absolute left-1/2 -bottom-1 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-current" />}
                      </Link>

                      {/* Mega menu */}
                      <div
                        className={`invisible absolute inset-x-4 top-full z-50 translate-y-3 pt-3 opacity-0 transition-all duration-300 sm:inset-x-6 ${
                          suppressed === item.label
                            ? ""
                            : "group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100"
                        }`}
                      >
                        <div className="overflow-hidden rounded-[2rem] bg-white shadow-[0_50px_100px_-30px_rgba(11,20,55,0.5)] ring-1 ring-black/5">
                          <div className="grid grid-cols-12">
                            {/* Intro */}
                            <div className="relative col-span-3 overflow-hidden bg-gradient-to-br from-crimson via-crimson-dark to-[#7a0f1c] p-8 text-white">
                              <div className="dot-grid absolute inset-0 opacity-60" aria-hidden />
                              <div className="absolute -bottom-16 -right-16 h-48 w-48 rounded-full bg-gold/30 blur-3xl" aria-hidden />
                              <div className="relative flex h-full flex-col">
                                <span className="grid h-14 w-14 place-items-center rounded-2xl bg-white text-crimson shadow-lg shadow-black/20">
                                  <item.icon className="h-6 w-6" />
                                </span>
                                <p className="mt-6 font-display text-2xl font-bold">{item.label}</p>
                                <p className="mt-2 text-sm leading-relaxed text-white/85">{item.intro}</p>
                                <Link
                                  href={item.href}
                                  onNavigate={() => setSuppressed(item.label)}
                                  className="group/all mt-auto inline-flex items-center gap-2 pt-6 text-sm font-bold text-gold"
                                >
                                  View all
                                  <ArrowRight className="h-4 w-4 transition group-hover/all:translate-x-1" />
                                </Link>
                              </div>
                            </div>

                            {/* Items */}
                            <ul className="col-span-6 grid content-start grid-cols-2 gap-1 p-5">
                              {item.children.map((child, i) => (
                                <li key={child.label}>
                                  <Link
                                    href={child.href}
                                    onNavigate={() => {
                                      setSuppressed(item.label);
                                      (document.activeElement as HTMLElement | null)?.blur();
                                    }}
                                    className="group/item flex items-start gap-4 rounded-2xl p-3.5 transition hover:bg-cream"
                                  >
                                    <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl transition duration-300 ${tones[i % tones.length]}`}>
                                      <child.icon className="h-5 w-5" />
                                    </span>
                                    <span className="min-w-0">
                                      <span className="flex items-center gap-1.5 text-[15px] font-bold text-navy">
                                        {child.label}
                                        <ArrowRight className="h-3.5 w-3.5 -translate-x-1 text-crimson opacity-0 transition group-hover/item:translate-x-0 group-hover/item:opacity-100" />
                                      </span>
                                      {child.description && <span className="mt-0.5 block text-sm text-muted">{child.description}</span>}
                                    </span>
                                  </Link>
                                </li>
                              ))}
                            </ul>

                            {/* Feature card */}
                            {item.feature && (
                              <div className="col-span-3 p-4 pl-0">
                                <Link
                                  href={item.feature.cta.href}
                                  onNavigate={() => setSuppressed(item.label)}
                                  className="group/feat relative flex h-full min-h-64 flex-col justify-end overflow-hidden rounded-3xl p-5 text-white"
                                >
                                  <Image
                                    src={item.feature.image}
                                    alt=""
                                    fill
                                    sizes="320px"
                                    className="object-cover transition duration-700 group-hover/feat:scale-110"
                                  />
                                  <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/50 to-transparent" />
                                  <div className="relative">
                                    <p className="font-display text-xl font-bold leading-tight">{item.feature.title}</p>
                                    <p className="mt-1 text-sm text-white/80">{item.feature.text}</p>
                                    <span className="mt-4 inline-flex items-center gap-2 rounded-full bg-gold py-1.5 pl-4 pr-1.5 text-sm font-bold text-navy">
                                      {item.feature.cta.label}
                                      <span className="grid h-7 w-7 place-items-center rounded-full bg-navy text-gold transition group-hover/feat:rotate-[-45deg]">
                                        <ArrowRight className="h-3.5 w-3.5" />
                                      </span>
                                    </span>
                                  </div>
                                </Link>
                              </div>
                            )}
                          </div>

                          {/* Help strip */}
                          <div className="flex items-center justify-between gap-4 border-t border-line bg-cream/60 px-8 py-3.5 text-sm text-muted">
                            <span className="flex items-center gap-2">
                              <Sparkles className="h-4 w-4 text-gold" /> Admissions open for {school.admissionYear}
                            </span>
                            <span className="flex items-center gap-5">
                              <a href={school.phoneHref} className="flex items-center gap-1.5 font-semibold text-navy transition hover:text-crimson">
                                <Phone className="h-4 w-4 text-crimson" /> {school.phone}
                              </a>
                              <a href={`mailto:${school.email}`} className="flex items-center gap-1.5 font-semibold text-navy transition hover:text-crimson">
                                <Mail className="h-4 w-4 text-crimson" /> {school.email}
                              </a>
                            </span>
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="flex items-center gap-3 xl:hidden">
              <button
                type="button"
                onClick={() => setMobileOpen(true)}
                className={`grid h-11 w-11 place-items-center rounded-full transition xl:hidden ${
                  solid ? "bg-navy text-white" : "bg-white/15 text-white ring-1 ring-white/25 backdrop-blur-md"
                }`}
                aria-label="Open menu"
                aria-expanded={mobileOpen}
              >
                <Menu className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <div className={`fixed inset-0 z-[60] xl:hidden ${mobileOpen ? "" : "pointer-events-none"}`} aria-hidden={!mobileOpen}>
        <div
          onClick={closeAll}
          className={`absolute inset-0 bg-navy/60 backdrop-blur-sm transition-opacity duration-300 ${mobileOpen ? "opacity-100" : "opacity-0"}`}
        />
        <aside
          className={`absolute right-0 top-0 flex h-full w-full max-w-sm flex-col bg-white shadow-2xl transition-transform duration-300 ${
            mobileOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex h-20 items-center justify-between border-b border-line px-4">
            <Logo />
            <button
              type="button"
              onClick={closeAll}
              className="grid h-11 w-11 place-items-center rounded-full bg-cream text-navy"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-4 py-4">
            <ul className="space-y-1">
              {nav.map((item) => {
                const active = isActive(pathname, item.href);
                const open = expanded === item.label;
                return (
                  <li key={item.label}>
                    {item.children ? (
                      <>
                        <button
                          type="button"
                          onClick={() => setExpanded(open ? null : item.label)}
                          aria-expanded={open}
                          className={`flex w-full items-center justify-between rounded-2xl px-4 py-3.5 text-left font-semibold ${
                            active || open ? "bg-royal-light text-royal" : "text-navy"
                          }`}
                        >
                          <span className="flex items-center gap-3">
                            <span className={`grid h-9 w-9 place-items-center rounded-xl ${active || open ? "bg-royal text-white" : "bg-cream text-royal"}`}>
                              <item.icon className="h-4 w-4" />
                            </span>
                            {item.label}
                          </span>
                          <ChevronDown className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} />
                        </button>
                        <div className={`grid transition-all duration-300 ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                          <ul className="ml-8 overflow-hidden border-l-2 border-royal/15 pl-3">
                            <li>
                              <Link
                                href={item.href}
                                onNavigate={closeAll}
                                className="flex items-center gap-2 rounded-xl px-2 py-2 text-sm font-bold text-crimson transition hover:bg-cream"
                              >
                                View all {item.label} <ArrowRight className="h-3.5 w-3.5" />
                              </Link>
                            </li>
                            {item.children.map((child, i) => (
                              <li key={child.label}>
                                <Link
                                  href={child.href}
                                  onNavigate={closeAll}
                                  className="group/item flex items-center gap-3 rounded-xl px-2 py-2 text-sm font-medium text-muted transition hover:bg-cream hover:text-navy"
                                >
                                  <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg ${tones[i % tones.length]}`}>
                                    <child.icon className="h-4 w-4" />
                                  </span>
                                  {child.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </>
                    ) : (
                      <Link
                        href={item.href}
                        onNavigate={closeAll}
                        className={`flex items-center gap-3 rounded-2xl px-4 py-3.5 font-semibold ${active ? "bg-royal-light text-royal" : "text-navy"}`}
                      >
                        <span className={`grid h-9 w-9 place-items-center rounded-xl ${active ? "bg-royal text-white" : "bg-cream text-royal"}`}>
                          <item.icon className="h-4 w-4" />
                        </span>
                        {item.label}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>
          <div className="space-y-3 border-t border-line p-4">
            <div className="flex justify-center gap-4 text-sm text-muted">
              {school.phones.map((p) => (
                <a key={p.href} href={p.href} className="flex items-center gap-1.5">
                  <Phone className="h-3.5 w-3.5" /> {p.label}
                </a>
              ))}
            </div>
            <SocialIcons size="md" onLight className="justify-center pt-1" />
          </div>
        </aside>
      </div>
    </>
  );
}
