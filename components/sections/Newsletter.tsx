"use client";

import { useEffect, useRef } from "react";
import { registerGsap } from "@/lib/gsap";
import { revealUpChildren } from "@/animations/revealUp";

export default function Newsletter() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGsap();
    const triggers = revealUpChildren(sectionRef);
    return () => triggers.forEach((t) => t.scrollTrigger?.kill());
  }, []);

  return (
    <section ref={sectionRef} className="py-[120px] bg-cream text-center">
      <div className="wrap">
        <span data-reveal className="eyebrow block">
          Stay in Touch
        </span>
        <h2 data-reveal className="text-[clamp(1.8rem,3vw,2.6rem)] text-bark mb-4 mt-3">
          Join the hive
        </h2>
        <p data-reveal className="text-bark-soft mb-9">
          New batches, seasonal scents and croft stories — a few times a season, never more.
        </p>
        <form
          data-reveal
          className="flex max-w-[480px] mx-auto border-b border-bark pb-3"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="email"
            required
            placeholder="Your email address"
            className="flex-1 bg-transparent border-none outline-none text-base text-bark"
          />
          <button className="bg-none border-none text-[.8rem] tracking-wide uppercase text-honey-deep">
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
}
