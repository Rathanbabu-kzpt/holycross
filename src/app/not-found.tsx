import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <section className="relative overflow-hidden bg-navy text-white">
      <div className="absolute left-1/2 top-1/3 h-96 w-96 -translate-x-1/2 rounded-full bg-royal/40 blur-[120px]" aria-hidden />
      <div className="relative mx-auto flex max-w-2xl flex-col items-center px-4 pb-24 pt-40 text-center sm:pb-32 sm:pt-48">
        <Image src="/brand/logo-512.png" alt="" width={140} height={140} className="h-32 w-32 animate-float" />
        <p className="eyebrow mt-10 text-gold">Coming soon</p>
        <h1 className="mt-4 font-display text-4xl font-bold sm:text-5xl">This page is being prepared</h1>
        <p className="mt-5 text-lg text-white/70">
          We’re working on this section of our website. In the meantime, feel free to explore the home page or
          get in touch with the school office.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link href="/" className="inline-flex items-center gap-2 rounded-full bg-crimson px-7 py-3.5 font-bold transition hover:bg-crimson-dark">
            <ArrowLeft className="h-4 w-4" /> Back to Home
          </Link>
          <Link href="/contact" className="rounded-full border border-white/25 px-7 py-3.5 font-bold transition hover:bg-white hover:text-navy">
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}
