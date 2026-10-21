import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { school } from "@/content/site";

const SUBJECTS = new Set(["Admission Enquiry", "Campus Visit", "Fee Structure", "Transport", "General Enquiry"]);

function clean(v: unknown, max: number) {
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

const escape = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot filled → silently accept and drop.
  if (clean(body.website, 200)) return NextResponse.json({ ok: true });

  const name = clean(body.name, 80);
  const phone = clean(body.phone, 20);
  const email = clean(body.email, 120);
  const subject = clean(body.subject, 40);
  const message = clean(body.message, 2000);
  // Optional admission-form fields
  const childName = clean(body.childName, 80);
  const classApplying = clean(body.classApplying, 30);
  const dob = clean(body.dob, 20);

  if (name.length < 2) return NextResponse.json({ error: "Please enter your name." }, { status: 400 });
  if (!/^[0-9+\s-]{10,15}$/.test(phone))
    return NextResponse.json({ error: "Please enter a valid phone number." }, { status: 400 });
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  if (!SUBJECTS.has(subject)) return NextResponse.json({ error: "Please choose a subject." }, { status: 400 });
  if (!childName && message.length < 10)
    return NextResponse.json({ error: "Please write a slightly longer message." }, { status: 400 });
  if (childName && (childName.length < 2 || !classApplying))
    return NextResponse.json({ error: "Please enter the child’s name and class." }, { status: 400 });

  const admission = childName
    ? `\nChild: ${childName}\nClass applying for: ${classApplying}\nDate of birth: ${dob || "-"}`
    : "";
  const text = `Name: ${name}\nPhone: ${phone}\nEmail: ${email || "-"}\nSubject: ${subject}${admission}\n\n${message || "-"}`;

  // Without SMTP settings (e.g. local development) the enquiry is logged instead of emailed.
  if (!process.env.SMTP_HOST) {
    console.info("[contact] SMTP not configured — enquiry received:\n" + text);
    return NextResponse.json({ ok: true, simulated: true });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: Number(process.env.SMTP_PORT) === 465,
      auth: process.env.SMTP_USER ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS } : undefined,
    });
    await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: process.env.CONTACT_TO || school.email,
      replyTo: email || undefined,
      subject: `[Website] ${subject} — ${name}`,
      text,
      html: `<pre style="font-family:inherit;white-space:pre-wrap">${escape(text)}</pre>`,
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] failed to send", err);
    return NextResponse.json(
      { error: "We couldn't send your message right now. Please call the school office." },
      { status: 502 }
    );
  }
}
