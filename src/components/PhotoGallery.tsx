"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";

export type Photo = { src: string; alt: string; category: string };

/** Filterable photo grid with a keyboard-friendly lightbox. */
export default function PhotoGallery({ photos }: { photos: Photo[] }) {
  const categories = ["All", ...Array.from(new Set(photos.map((p) => p.category)))];
  const [filter, setFilter] = useState("All");
  const [open, setOpen] = useState<number | null>(null);
  const shown = filter === "All" ? photos : photos.filter((p) => p.category === filter);

  // Two featured (double-size) tiles in the full view; 2×4 + 13 singles fills 7 even rows of 3.
  const isBig = (i: number) => filter === "All" && (i === 0 || i === 7);

  const step = useCallback(
    (d: number) => setOpen((i) => (i === null ? i : (i + d + shown.length) % shown.length)),
    [shown.length]
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, step]);

  return (
    <>
      <div className="flex flex-wrap justify-center gap-2" role="tablist" aria-label="Filter photos">
        {categories.map((c) => (
          <button
            key={c}
            type="button"
            role="tab"
            aria-selected={filter === c}
            onClick={() => setFilter(c)}
            className={`rounded-full px-5 py-2.5 text-sm font-bold transition ${
              filter === c ? "bg-navy text-white shadow-lg" : "bg-white text-navy ring-1 ring-line hover:bg-cream"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="mt-10 grid grid-flow-dense auto-rows-[16rem] gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((p, i) => (
          <button
            key={p.src + filter}
            type="button"
            onClick={() => setOpen(i)}
            className={`group relative block h-full w-full overflow-hidden rounded-3xl shadow-md ${
              isBig(i) ? "sm:col-span-2 sm:row-span-2" : ""
            }`}
            aria-label={`Open photo: ${p.alt}`}
          >
            <Image
              src={p.src}
              alt={p.alt}
              fill
              sizes={isBig(i) ? "(min-width:640px) 66vw, 100vw" : "(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"}
              className="object-cover transition duration-700 group-hover:scale-110"
            />
            <span className="absolute inset-0 flex items-end justify-between bg-gradient-to-t from-navy/80 via-transparent to-transparent p-5 text-left text-white opacity-0 transition duration-300 group-hover:opacity-100">
              <span>
                <span className="block text-xs font-bold uppercase tracking-widest text-gold">{p.category}</span>
                <span className="block font-semibold">{p.alt}</span>
              </span>
              <span className="grid h-10 w-10 place-items-center rounded-full bg-white/20 backdrop-blur">
                <Expand className="h-4 w-4" />
              </span>
            </span>
          </button>
        ))}
      </div>

      {open !== null && shown[open] && (
        <div role="dialog" aria-modal="true" aria-label="Photo viewer" className="fixed inset-0 z-[70] flex items-center justify-center bg-navy/95 p-4 backdrop-blur-sm">
          <button type="button" onClick={() => setOpen(null)} aria-label="Close" className="absolute right-4 top-4 grid h-12 w-12 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white hover:text-navy">
            <X className="h-6 w-6" />
          </button>
          <button type="button" onClick={() => step(-1)} aria-label="Previous photo" className="absolute left-2 grid h-12 w-12 place-items-center rounded-full bg-white/10 text-white transition hover:bg-gold hover:text-navy sm:left-6">
            <ChevronLeft className="h-6 w-6" />
          </button>
          <figure className="max-h-full max-w-5xl">
            <Image
              src={shown[open].src}
              alt={shown[open].alt}
              width={1400}
              height={1000}
              sizes="90vw"
              className="max-h-[80vh] w-auto rounded-2xl object-contain shadow-2xl"
            />
            <figcaption className="mt-4 text-center text-white/80">
              {shown[open].alt} · <span className="text-gold">{open + 1} / {shown.length}</span>
            </figcaption>
          </figure>
          <button type="button" onClick={() => step(1)} aria-label="Next photo" className="absolute right-2 grid h-12 w-12 place-items-center rounded-full bg-white/10 text-white transition hover:bg-gold hover:text-navy sm:right-6">
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
      )}
    </>
  );
}
