import type { Metadata } from "next";
import Image from "next/image";
import {
  CalendarCheck,
  CheckCircle2,
  ClipboardList,
  FileText,
  IndianRupee,
  MessageCircle,
  PenLine,
  Phone,
  School,
  UserCheck,
  Users,
  Wallet,
} from "lucide-react";
import AdmissionForm from "@/components/AdmissionForm";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { ButterflySwarm } from "@/components/decor/Flying";
import { school } from "@/content/site";

export const metadata: Metadata = {
  title: "Admissions",
  description: `Admissions ${school.admissionYear} at ${school.name}, ${school.place}: process, eligibility, fee details and online application.`,
};

const steps = [
  { icon: Phone, title: "Enquire", text: "Call the office or fill in the online form below." },
  { icon: School, title: "Visit the campus", text: "Meet our teachers and see the classrooms for yourself." },
  { icon: FileText, title: "Submit the form", text: "Complete the application with the required documents." },
  { icon: MessageCircle, title: "Interaction", text: "A friendly interaction with the child and parents." },
  { icon: CalendarCheck, title: "Confirm admission", text: "Complete the formalities — welcome to Holy Cross!" },
];

const documents = [
  "Birth certificate of the child",
  "Aadhaar card of the child",
  "Recent passport-size photographs",
  "Transfer certificate (Class II onwards)",
  "Previous year’s report card (Class II onwards)",
  "Aadhaar / ID proof of parent",
];

// Indicative guideline only — confirm with the office for the current year.
const eligibility = [
  { stage: "Pre-Primary", rows: [["Nursery", "3+ years"], ["LKG", "4+ years"], ["UKG", "5+ years"]] },
  { stage: "Primary", rows: [["Class I", "6+ years"], ["Classes II – V", "As per previous class"]] },
  { stage: "Upper Primary & High School", rows: [["Classes VI – VII", "Pass in previous class"], ["Classes VIII – X", "Pass in previous class + TC"]] },
];

const feePoints = [
  { icon: IndianRupee, title: "Affordable & transparent", text: "Clear class-wise fee details with no hidden charges." },
  { icon: Wallet, title: "Convenient payment", text: "Fees can be paid in instalments through the year — the office will explain the schedule." },
  { icon: Users, title: "Sibling support", text: "Ask the office about any concessions available for siblings." },
];

export default function AdmissionsPage() {
  return (
    <>
      <PageHero
        crumb="Admissions"
        title="Admissions open"
        highlight={school.admissionYear}
        intro="Join the Holy Cross family. Here’s everything you need — from the admission process to applying online."
        image="/images/hero-1.jpg"
        sections={[
          { label: "Process", href: "#process", icon: ClipboardList },
          { label: "Eligibility", href: "#eligibility", icon: UserCheck },
          { label: "Fee Structure", href: "#fees", icon: IndianRupee },
          { label: "Apply Online", href: "#apply", icon: PenLine },
        ]}
      />

      {/* PROCESS */}
      <section id="process" className="relative scroll-mt-28 overflow-hidden py-20 lg:py-28">
        <ButterflySwarm id="adm-p" count={3} seed={9} />
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading
            eyebrow="Admission Process"
            title={<>Five simple <span className="text-gradient">steps</span></>}
            intro="Our admissions team is with you at every step — just reach out."
          />
          <div className="relative mt-16">
            <div className="absolute left-[10%] right-[10%] top-10 hidden h-0.5 bg-gradient-to-r from-crimson via-gold to-royal md:block" aria-hidden />
          <ol className="relative grid gap-6 md:grid-cols-5">
            {steps.map((s, i) => (
              <Reveal as="li" key={s.title} delay={i * 90} className="relative text-center">
                <span className="relative mx-auto grid h-20 w-20 place-items-center rounded-full bg-white text-crimson shadow-xl ring-4 ring-cream">
                  <s.icon className="h-8 w-8" />
                  <span className="absolute -right-1 -top-1 grid h-8 w-8 place-items-center rounded-full bg-navy font-display text-sm font-bold text-gold">
                    {i + 1}
                  </span>
                </span>
                <p className="mt-5 font-display text-xl font-semibold text-navy">{s.title}</p>
                <p className="mt-1.5 text-muted">{s.text}</p>
              </Reveal>
            ))}
          </ol>
          </div>

          <Reveal className="mt-20 grid items-center gap-10 overflow-hidden rounded-[2.5rem] bg-white p-6 ring-1 ring-line sm:p-10 lg:grid-cols-5">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] lg:col-span-2">
              <Image src="/images/gallery-05.jpg" alt="Student studying at her desk" fill sizes="(min-width:1024px) 420px, 100vw" className="object-cover" />
            </div>
            <div className="lg:col-span-3">
              <p className="eyebrow text-crimson">
                <FileText className="h-4 w-4" /> Documents required
              </p>
              <h3 className="mt-3 font-display text-3xl font-bold text-navy">Keep these ready</h3>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {documents.map((d) => (
                  <li key={d} className="flex items-start gap-2.5 font-medium text-navy">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-crimson" /> {d}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm text-muted">The office will confirm the complete list when you apply.</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ELIGIBILITY */}
      <section id="eligibility" className="relative scroll-mt-28 bg-white py-20 lg:py-28">
        <div className="dot-grid-dark absolute inset-0" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading
            eyebrow="Eligibility & Age Criteria"
            title={<>Which class is <span className="text-gradient">right?</span></>}
            intro="An indicative age guide for each class. The office will confirm the exact criteria for the current academic year."
          />
          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {eligibility.map((e, i) => (
              <Reveal key={e.stage} delay={i * 100}>
                <div className="h-full overflow-hidden rounded-[2rem] bg-cream ring-1 ring-line">
                  <div className={`px-7 py-5 text-white ${["bg-crimson", "bg-royal", "bg-navy"][i]}`}>
                    <p className="font-display text-xl font-semibold">{e.stage}</p>
                  </div>
                  <ul className="divide-y divide-line px-7">
                    {e.rows.map(([cls, age]) => (
                      <li key={cls} className="flex items-center justify-between gap-4 py-4">
                        <span className="font-semibold text-navy">{cls}</span>
                        <span className="rounded-full bg-white px-3 py-1 text-sm font-semibold text-crimson ring-1 ring-line">{age}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FEES */}
      <section id="fees" className="relative scroll-mt-28 overflow-hidden bg-navy py-20 text-white lg:py-28">
        <div className="dot-grid absolute inset-0" aria-hidden />
        <div className="absolute -right-20 top-0 h-80 w-80 rounded-full bg-crimson/30 blur-[120px]" aria-hidden />
        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2">
          <div>
            <SectionHeading
              light
              align="left"
              eyebrow="Fee Structure"
              title={<>Quality education, <span className="text-gradient-light">affordable fees</span></>}
              intro="Fees vary by class. Contact the school office for the current fee structure for your child’s class — we’re happy to explain every detail."
            />
            <Reveal delay={150} className="mt-8 flex flex-wrap gap-4">
              <a
                href="#apply"
                className="inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3.5 font-bold text-navy transition hover:bg-white"
              >
                Request fee details
              </a>
              <a
                href={school.phoneHref}
                className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-7 py-3.5 font-bold backdrop-blur-md transition hover:bg-white hover:text-navy"
              >
                <Phone className="h-4 w-4" /> {school.phone}
              </a>
            </Reveal>
          </div>
          <div className="space-y-4">
            {feePoints.map((f, i) => (
              <Reveal key={f.title} delay={i * 100}>
                <div className="flex gap-5 rounded-3xl bg-white/[0.07] p-6 ring-1 ring-white/10">
                  <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-gold to-[#f59e0b] text-navy">
                    <f.icon className="h-6 w-6" />
                  </span>
                  <div>
                    <p className="font-display text-xl font-semibold">{f.title}</p>
                    <p className="mt-1 text-white/70">{f.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* APPLY */}
      <section id="apply" className="relative scroll-mt-28 overflow-hidden py-20 lg:py-28">
        <ButterflySwarm id="adm-a" count={3} seed={29} />
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <div className="relative h-full min-h-[28rem] overflow-hidden rounded-[2rem] shadow-xl">
              <Image src="/images/hero-3.jpg" alt="Parent and child reading together" fill sizes="(min-width:1024px) 500px, 100vw" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/40 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-8 text-white">
                <p className="eyebrow text-gold">
                  <span className="h-px w-6 bg-current" /> Apply Online
                </p>
                <p className="mt-3 font-display text-3xl font-bold leading-tight">Start your child’s journey today</p>
                <p className="mt-3 text-white/80">Fill in the form and our admissions office will call you to take it forward.</p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={100} className="lg:col-span-7">
            <div className="h-full rounded-[2rem] bg-white p-6 ring-1 ring-line sm:p-10">
              <h2 className="font-display text-4xl font-bold tracking-tight text-navy">
                Application <span className="text-gradient">form</span>
              </h2>
              <p className="mt-2 text-muted">Takes less than two minutes. Fields marked * are required.</p>
              <div className="mt-8">
                <AdmissionForm />
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
