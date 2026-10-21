import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Clock, Mail, MapPin, Navigation, Phone } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import FadeUp from "@/components/FadeUp";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { school } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description: `Get in touch with ${school.name}, ${school.place} for admissions, campus visits and general enquiries.`,
};

const directionsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${school.name} ${school.mapQuery}`)}`;

const faqs = [
  {
    q: "When do admissions open?",
    a: `Admissions for the ${school.admissionYear} academic year are open now. Seats are limited, so we recommend enquiring early.`,
  },
  {
    q: "Can we visit the campus before applying?",
    a: "Yes. Call the office or send us a message to book a convenient time for a campus visit.",
  },
  {
    q: "What documents are needed for admission?",
    a: "Typically the child’s birth certificate, Aadhaar card, passport-size photographs, and the transfer certificate and previous report card (for Class II onwards). The office will confirm the full list.",
  },
  {
    q: "Is school transport available?",
    a: "Yes, school buses cover Ghanpur (Stn.) and nearby villages. Contact the office for routes and availability.",
  },
  {
    q: "Which classes does the school offer?",
    a: "We offer Nursery, LKG and UKG, followed by Classes I to X.",
  },
  {
    q: "How can I find out about fees?",
    a: "Please call or message the school office — they will share the current fee structure for your child’s class.",
  },
];

function InfoRow({ icon: Icon, label, children }: { icon: typeof Phone; label: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-4">
      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-white/10 text-gold ring-1 ring-white/15">
        <Icon className="h-5 w-5" />
      </span>
      <div className="min-w-0">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/50">{label}</p>
        <div className="mt-1 font-semibold leading-relaxed text-white">{children}</div>
      </div>
    </div>
  );
}

export default function ContactPage() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-navy text-white">
        <Image src="/images/contact-hero.jpg" alt="" fill priority sizes="100vw" className="kenburns object-cover" />
        <div className="absolute inset-0 bg-navy/80" />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/40 via-transparent to-navy" />

        <div className="relative mx-auto max-w-4xl px-4 pb-24 pt-40 text-center sm:px-6 lg:pb-32 lg:pt-48">
          <FadeUp>
            <nav aria-label="Breadcrumb" className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm text-white/70 backdrop-blur-md">
              <Link href="/" className="transition hover:text-gold">Home</Link>
              <ChevronRight className="h-4 w-4" />
              <span className="font-semibold text-gold">Contact Us</span>
            </nav>
          </FadeUp>
          <FadeUp delay={120}>
            <h1 className="mt-6 font-display text-5xl font-bold leading-[1.02] tracking-tight sm:text-7xl">
              Get in <span className="text-gradient-light">touch</span>
            </h1>
          </FadeUp>
          <FadeUp delay={240}>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-white/80">
              Questions about admissions, a campus visit, or anything else — we’d love to hear from you.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* CARD CENTRED ON MAP */}
      <section className="relative">
        {/* Map fills the band behind the card */}
        <div className="absolute inset-0 bg-[#e8e6e1]">
          <iframe
            title={`Map showing ${school.name}, ${school.place}`}
            src={`https://maps.google.com/maps?q=${encodeURIComponent(school.mapQuery)}&z=14&output=embed`}
            className="h-full w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-cream to-transparent" />
        </div>

        <div className="relative mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:py-36">
          <FadeUp delay={300}>
            <div className="grid overflow-hidden rounded-[2.5rem] bg-white shadow-[0_50px_100px_-30px_rgba(11,20,55,0.55)] ring-1 ring-black/5 lg:grid-cols-5">
              {/* Contact details */}
              <div className="relative overflow-hidden bg-navy p-8 text-white sm:p-10 lg:col-span-2">
                <div className="dot-grid absolute inset-0 opacity-70" aria-hidden />
                <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-royal/60 blur-3xl" aria-hidden />
                <div className="absolute -bottom-20 -left-10 h-56 w-56 rounded-full bg-crimson/40 blur-3xl" aria-hidden />
                <div className="relative flex h-full flex-col">
                  <p className="eyebrow text-gold">
                    <span className="h-px w-6 bg-current" /> Contact details
                  </p>
                  <h2 className="mt-3 font-display text-3xl font-bold">We’re here to help</h2>

                  <div className="mt-9 space-y-7">
                    <InfoRow icon={MapPin} label="Address">
                      {school.address.line1}
                      <br />
                      {school.address.line2}, {school.address.line3}
                    </InfoRow>
                    <InfoRow icon={Phone} label="Phone">
                      {school.phones.map((p) => (
                        <a key={p.href} href={p.href} className="block transition hover:text-gold">
                          {p.label}
                        </a>
                      ))}
                    </InfoRow>
                    <InfoRow icon={Mail} label="Email">
                      <a href={`mailto:${school.email}`} className="break-all transition hover:text-gold">
                        {school.email}
                      </a>
                    </InfoRow>
                    <InfoRow icon={Clock} label="Office hours">
                      {school.hours.map((h) => (
                        <span key={h.days} className="block font-medium">
                          <span className="text-white/60">{h.days}:</span> {h.time}
                        </span>
                      ))}
                    </InfoRow>
                  </div>

                  <a
                    href={directionsHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group mt-10 inline-flex items-center gap-3 self-start rounded-full bg-gold py-2 pl-2 pr-6 font-bold text-navy transition hover:bg-white lg:mt-auto"
                  >
                    <span className="grid h-10 w-10 place-items-center rounded-full bg-navy text-gold transition group-hover:rotate-12">
                      <Navigation className="h-4 w-4" />
                    </span>
                    Get Directions
                  </a>
                </div>
              </div>

              {/* Form */}
              <div className="p-6 sm:p-10 lg:col-span-3 lg:p-12">
                <p className="eyebrow text-crimson">
                  <span className="h-px w-6 bg-current" /> Send an enquiry
                </p>
                <h2 className="mt-3 font-display text-4xl font-bold tracking-tight text-navy">
                  Drop us a <span className="text-gradient">message</span>
                </h2>
                <p className="mt-2 text-muted">We usually reply within one working day.</p>
                <div className="mt-8">
                  <ContactForm />
                </div>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading
            eyebrow="FAQs"
            title={<>Common <span className="text-gradient">questions</span></>}
            intro="Quick answers to what parents ask us most."
          />
          {/* Two independent columns of three, so opening one answer doesn't shift the other column */}
          <div className="mt-12 grid items-start gap-4 md:grid-cols-2">
            {[faqs.slice(0, 3), faqs.slice(3)].map((col, c) => (
              <div key={c} className="space-y-4">
                {col.map((f, i) => (
                  <Reveal key={f.q} delay={(c * 3 + i) * 70}>
                    <details name="faq" className="group rounded-3xl bg-white p-6 ring-1 ring-line transition open:shadow-[0_25px_50px_-25px_rgba(11,20,55,0.35)]">
                      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-lg font-semibold text-navy [&::-webkit-details-marker]:hidden">
                        {f.q}
                        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-cream text-xl text-navy ring-1 ring-line transition duration-300 group-open:rotate-45 group-open:bg-crimson group-open:text-white group-open:ring-crimson">
                          +
                        </span>
                      </summary>
                      <p className="mt-3 leading-relaxed text-muted">{f.a}</p>
                    </details>
                  </Reveal>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
