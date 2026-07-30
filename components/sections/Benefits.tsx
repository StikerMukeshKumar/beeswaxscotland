"use client";

import { useEffect, useRef } from "react";
import { gsap, registerGsap } from "@/lib/gsap";
import { revealUpChildren } from "@/animations/revealUp";

const BENEFITS = [
  { icon: "✿", title: "Cruelty Free", body: "Never tested on animals" },
  { icon: "🌿", title: "Vegan Friendly", body: "Plant-based where beeswax isn't the hero" },
  { icon: "♻", title: "Plastic Free", body: "Glass, tin and paper only" },
  { icon: "◐", title: "Small Batch", body: "Poured in runs of 50 jars or fewer" },
  { icon: "✓", title: "Dermatologist Tested", body: "Gentle enough for sensitive skin" },
];

export default function Benefits() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGsap();
    const triggers = revealUpChildren(sectionRef);

    let lineTween: gsap.core.Tween | undefined;
    if (lineRef.current) {
      lineTween = gsap.to(lineRef.current.querySelector("em"), {
        scaleX: 1,
        duration: 1.4,
        ease: "power2.inOut",
        scrollTrigger: { trigger: sectionRef.current, start: "top 60%" },
      });
    }

    return () => {
      triggers.forEach((t) => t.scrollTrigger?.kill());
      lineTween?.scrollTrigger?.kill();
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-[140px] bg-cream relative overflow-hidden">
      <div className="wrap">
        <div className="mb-[60px]">
          <span data-reveal className="eyebrow block">
            What You Won&apos;t Find
          </span>
          <h2 data-reveal className="text-[clamp(2rem,3.6vw,3.1rem)] text-bark mt-2.5">
            Made without compromise
          </h2>
        </div>

        <div ref={lineRef} className="benefits-line">
          <em />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5 relative z-[1]">
          {BENEFITS.map((b) => (
            <div key={b.title} data-reveal className="text-center">
              <div className="w-[78px] h-[78px] mx-auto mb-5 rounded-full bg-bg border border-sage/30 flex items-center justify-center text-2xl text-sage">
                {b.icon}
              </div>
              <h4 className="font-display text-xl text-bark mb-1.5">{b.title}</h4>
              <p className="text-[.82rem] text-bark-soft">{b.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
