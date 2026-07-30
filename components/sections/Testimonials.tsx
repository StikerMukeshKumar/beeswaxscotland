"use client";

import { useEffect, useRef } from "react";
import { gsap, registerGsap } from "@/lib/gsap";
import { revealUpChildren } from "@/animations/revealUp";
import { TESTIMONIALS } from "@/constants/testimonials";

const MARQUEE_WORDS = "Handcrafted · Small Batch · Ethically Sourced · Traditionally Poured";

export default function Testimonials() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGsap();
    const triggers = revealUpChildren(sectionRef);

    let marqueeTween: gsap.core.Tween | undefined;
    if (trackRef.current) {
      marqueeTween = gsap.to(trackRef.current, { xPercent: -50, duration: 18, ease: "none", repeat: -1 });
    }

    return () => {
      triggers.forEach((t) => t.scrollTrigger?.kill());
      marqueeTween?.kill();
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-[140px] pb-[90px] bg-bark text-cream overflow-hidden">
      <div className="wrap">
        <div className="mb-[70px]">
          <span data-reveal className="eyebrow block">
            Transformations
          </span>
          <h2 data-reveal className="text-[clamp(2rem,3.6vw,3.1rem)] text-cream mt-2.5">
            What our customers notice
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-7 mb-[70px]">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.name}
              data-reveal
              className="bg-cream/5 border border-cream/[.14] rounded-2xl p-8"
            >
              <div className="text-honey tracking-[3px] mb-4">★★★★★</div>
              <p className="text-[.98rem] leading-[1.7] text-cream/85 mb-5">{t.quote}</p>
              <div className="text-[.82rem] text-honey-light">
                — {t.name}, {t.location}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="marquee">
        <div ref={trackRef} className="marquee-track">
          <span>
            {MARQUEE_WORDS} · {MARQUEE_WORDS} ·
          </span>
        </div>
      </div>
    </section>
  );
}
