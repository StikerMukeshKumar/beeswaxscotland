"use client";

import { useEffect, useRef } from "react";
import { gsap, registerGsap } from "@/lib/gsap";
import { revealUpChildren } from "@/animations/revealUp";
import { AWARDS } from "@/constants/awards";

export default function Awards() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGsap();
    const triggers = revealUpChildren(sectionRef);

    let cardsTween: gsap.core.Tween | undefined;
    if (scrollRef.current) {
      cardsTween = gsap.from(scrollRef.current.querySelectorAll(".a-card"), {
        opacity: 0,
        x: 60,
        stagger: 0.12,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
      });
    }

    const scrollEl = scrollRef.current;
    const onWheel = (e: WheelEvent) => {
      if (!scrollEl) return;
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        scrollEl.scrollLeft += e.deltaY;
      }
    };
    scrollEl?.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      triggers.forEach((t) => t.scrollTrigger?.kill());
      cardsTween?.scrollTrigger?.kill();
      scrollEl?.removeEventListener("wheel", onWheel);
    };
  }, []);

  return (
    <section ref={sectionRef} id="awards" className="py-[140px] bg-bg">
      <div className="wrap">
        <div className="mb-[60px]">
          <span data-reveal className="eyebrow block">
            Recognition
          </span>
          <h2 data-reveal className="text-[clamp(2rem,3.6vw,3.1rem)] text-bark mt-2.5">
            Awards &amp; certificates
          </h2>
        </div>

        <div ref={scrollRef} className="awards-scroll flex gap-6 overflow-x-auto pb-5">
          {AWARDS.map((award) => (
            <div key={award.year} className="a-card">
              <div className="text-[.78rem] tracking-wide text-honey-deep uppercase">{award.year}</div>
              <h3 className="font-display text-2xl mt-3.5 mb-2.5 text-bark">{award.title}</h3>
              <p className="text-[.85rem] text-bark-soft">{award.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
