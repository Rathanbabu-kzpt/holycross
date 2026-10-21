import Image from "next/image";
import { ArrowUp, ArrowUpRight, Heart, Mail, MapPin, Phone } from "lucide-react";
import { school } from "@/content/site";

const directionsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${school.name} ${school.mapQuery}`)}`;

export default function Footer() {
  const tiles = [
    {
      icon: Phone,
      label: "Call us",
      value: school.phone,
      href: school.phoneHref,
      cls: "from-crimson to-[#ff6a3d] shadow-crimson/30 text-white",
    },
    {
      icon: Mail,
      label: "Email us",
      value: school.email,
      href: `mailto:${school.email}`,
      cls: "from-royal to-[#7b5cff] shadow-royal/30 text-white",
    },
    {
      icon: MapPin,
      label: "Visit us",
      value: "Get directions",
      href: directionsHref,
      cls: "from-[#f59e0b] to-gold shadow-gold/30 text-navy",
    },
  ];

  return (
    <footer className="relative mt-24 bg-navy text-white/65">
      {/* Crest sitting on the top edge */}
      <div className="absolute left-1/2 top-0 z-10 -translate-x-1/2 -translate-y-1/2">
        <div className="grid h-28 w-28 place-items-center rounded-full bg-navy shadow-2xl ring-[6px] ring-gold/90">
          <Image src="/brand/logo-512.png" alt="" width={88} height={88} className="h-[5.5rem] w-[5.5rem]" />
        </div>
      </div>

      <div className="relative overflow-hidden">
        {/* Soft campus photo wash */}
        <Image src="/images/hero-1.jpg" alt="" fill sizes="100vw" className="object-cover opacity-[0.07]" />
        <div className="dot-grid absolute inset-0 opacity-60" aria-hidden />
        <div className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-royal/35 blur-[130px]" aria-hidden />
        <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-crimson/30 blur-[130px]" aria-hidden />

        <div className="relative mx-auto max-w-7xl px-4 pt-24 sm:px-6">
          {/* Brand line */}
          <div className="text-center">
            <p className="font-display text-3xl font-bold text-white sm:text-5xl">{school.name}</p>
            <p className="mt-3 font-display text-lg">
              {school.place} · <span className="text-gradient-light font-semibold">{school.motto}</span>
            </p>
          </div>

          {/* Colourful contact tiles */}
          <div className="mx-auto mt-12 grid max-w-5xl gap-4 sm:grid-cols-3">
            {tiles.map((t) => (
              <a
                key={t.label}
                href={t.href}
                target={t.href.startsWith("http") ? "_blank" : undefined}
                rel={t.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className={`group flex items-center gap-4 rounded-3xl bg-gradient-to-br p-5 shadow-xl transition duration-300 hover:-translate-y-1.5 ${t.cls}`}
              >
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-white/20 ring-1 ring-white/30">
                  <t.icon className="h-5 w-5" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-xs font-bold uppercase tracking-widest opacity-75">{t.label}</span>
                  <span className="block truncate font-display text-lg font-semibold">{t.value}</span>
                </span>
                <ArrowUpRight className="h-5 w-5 shrink-0 opacity-70 transition group-hover:rotate-45 group-hover:opacity-100" />
              </a>
            ))}
          </div>

          {/* Bottom bar */}
          <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/10 py-7 text-center text-sm md:flex-row md:text-left">
            <p>
              © {school.name}, {school.place}. All rights reserved.
            </p>
            <p className="flex items-center gap-1.5">
              Made with
              <Heart className="h-4 w-4 animate-pulse fill-crimson text-crimson" aria-label="love" />
              by
              <a
                href="https://nevatrix.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-white underline-offset-4 transition hover:text-gold hover:underline"
              >
                Nevatrix
              </a>
            </p>
            <a href="#" className="group inline-flex items-center gap-3 font-semibold text-white">
              Back to top
              <span className="grid h-10 w-10 place-items-center rounded-full bg-gold text-navy transition group-hover:-translate-y-1">
                <ArrowUp className="h-4 w-4" />
              </span>
            </a>
          </div>
        </div>
      </div>
      <div className="h-1.5 bg-gradient-to-r from-crimson via-gold to-royal" />
    </footer>
  );
}
