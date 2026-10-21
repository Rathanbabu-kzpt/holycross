"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";

const subjects = ["Admission Enquiry", "Campus Visit", "Fee Structure", "Transport", "General Enquiry"];

type Status = { state: "idle" | "sending" | "sent" | "error"; message?: string };

const field =
  "w-full rounded-xl border border-line bg-cream/50 px-4 py-3 text-ink outline-none transition placeholder:text-muted/50 focus:border-royal focus:bg-white focus:ring-4 focus:ring-royal/10";
const label = "mb-1.5 block text-sm font-medium text-navy";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>({ state: "idle" });

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus({ state: "sending" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
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
        <h3 className="mt-5 font-display text-2xl font-semibold text-navy">Thank you!</h3>
        <p className="mt-2 max-w-sm text-muted">
          Your message has been received. Our office will get back to you within one working day.
        </p>
        <button
          type="button"
          onClick={() => setStatus({ state: "idle" })}
          className="mt-6 text-sm font-semibold text-royal hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-5 sm:grid-cols-2">
      <label className="block">
        <span className={label}>Name *</span>
        <input name="name" required minLength={2} maxLength={80} autoComplete="name" placeholder="Parent / guardian name" className={field} />
      </label>
      <label className="block">
        <span className={label}>Phone *</span>
        <input name="phone" type="tel" required pattern="[0-9+\s\-]{10,15}" autoComplete="tel" placeholder="+91 98xxx xxxxx" className={field} />
      </label>
      <label className="block">
        <span className={label}>Email</span>
        <input name="email" type="email" maxLength={120} autoComplete="email" placeholder="you@example.com" className={field} />
      </label>
      <label className="block">
        <span className={label}>Subject *</span>
        <select name="subject" required defaultValue="Admission Enquiry" className={field}>
          {subjects.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </label>
      <label className="block sm:col-span-2">
        <span className={label}>Message *</span>
        <textarea
          name="message"
          required
          minLength={10}
          maxLength={2000}
          rows={5}
          placeholder="How can we help you?"
          className={`${field} resize-y`}
        />
      </label>
      {/* Honeypot: hidden from people, tempting for bots */}
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
          {status.state === "sending" ? "Sending…" : "Send Message"}
          <span className="grid h-10 w-10 place-items-center rounded-full bg-white text-crimson transition group-hover:rotate-[-45deg]">
            {status.state === "sending" ? <Loader2 className="h-4 w-4 animate-spin" /> : <ArrowRight className="h-4 w-4" />}
          </span>
        </button>
      </div>
    </form>
  );
}
