"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";

export const classes = ["Nursery", "LKG", "UKG", "Class I", "Class II", "Class III", "Class IV", "Class V", "Class VI", "Class VII", "Class VIII", "Class IX", "Class X"];

type Status = { state: "idle" | "sending" | "sent" | "error"; message?: string };

const field =
  "w-full rounded-xl border border-line bg-cream/50 px-4 py-3 text-ink outline-none transition placeholder:text-muted/50 focus:border-royal focus:bg-white focus:ring-4 focus:ring-royal/10";
const label = "mb-1.5 block text-sm font-medium text-navy";

/** Admission application — sent to the school office through /api/contact. */
export default function AdmissionForm() {
  const [status, setStatus] = useState<Status>({ state: "idle" });

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus({ state: "sending" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...Object.fromEntries(new FormData(form)), subject: "Admission Enquiry" }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Something went wrong. Please try again.");
      form.reset();
      setStatus({ state: "sent" });
    } catch (err) {
      setStatus({ state: "error", message: (err as Error).message });
    }
  }

  if (status.state === "sent") {
    return (
      <div className="flex flex-col items-center py-14 text-center">
        <CheckCircle2 className="h-14 w-14 text-emerald-500" />
        <h3 className="mt-5 font-display text-2xl font-semibold text-navy">Application received!</h3>
        <p className="mt-2 max-w-sm text-muted">
          Thank you. Our admissions office will call you within two working days to guide you through the next steps.
        </p>
        <button type="button" onClick={() => setStatus({ state: "idle" })} className="mt-6 text-sm font-semibold text-royal hover:underline">
          Apply for another child
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-5 sm:grid-cols-2">
      <p className="text-xs font-bold uppercase tracking-widest text-crimson sm:col-span-2">Student details</p>
      <label className="block">
        <span className={label}>Child’s full name *</span>
        <input name="childName" required minLength={2} maxLength={80} placeholder="Student name" className={field} />
      </label>
      <label className="block">
        <span className={label}>Date of birth</span>
        <input name="dob" type="date" className={field} />
      </label>
      <label className="block sm:col-span-2">
        <span className={label}>Class applying for *</span>
        <select name="classApplying" required defaultValue="" className={field}>
          <option value="" disabled>
            Select a class
          </option>
          {classes.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
      </label>

      <p className="mt-2 text-xs font-bold uppercase tracking-widest text-crimson sm:col-span-2">Parent / guardian details</p>
      <label className="block">
        <span className={label}>Parent / guardian name *</span>
        <input name="name" required minLength={2} maxLength={80} autoComplete="name" placeholder="Your full name" className={field} />
      </label>
      <label className="block">
        <span className={label}>Phone *</span>
        <input name="phone" type="tel" required pattern="[0-9+\s\-]{10,15}" autoComplete="tel" placeholder="+91 98xxx xxxxx" className={field} />
      </label>
      <label className="block sm:col-span-2">
        <span className={label}>Email</span>
        <input name="email" type="email" maxLength={120} autoComplete="email" placeholder="you@example.com" className={field} />
      </label>
      <label className="block sm:col-span-2">
        <span className={label}>Anything we should know?</span>
        <textarea name="message" maxLength={2000} rows={3} placeholder="Previous school, questions, preferred visit time…" className={`${field} resize-y`} />
      </label>
      <input name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

      {status.state === "error" && (
        <p role="alert" className="rounded-xl bg-crimson/10 px-4 py-3 text-sm font-medium text-crimson sm:col-span-2">
          {status.message}
        </p>
      )}

      <div className="sm:col-span-2">
        <button
          type="submit"
          disabled={status.state === "sending"}
          className="group inline-flex items-center gap-3 rounded-full bg-crimson py-2 pl-7 pr-2 font-bold text-white shadow-xl shadow-crimson/30 transition hover:bg-crimson-dark disabled:opacity-70"
        >
          {status.state === "sending" ? "Submitting…" : "Submit Application"}
          <span className="grid h-10 w-10 place-items-center rounded-full bg-white text-crimson transition group-hover:rotate-[-45deg]">
            {status.state === "sending" ? <Loader2 className="h-4 w-4 animate-spin" /> : <ArrowRight className="h-4 w-4" />}
          </span>
        </button>
      </div>
    </form>
  );
}
