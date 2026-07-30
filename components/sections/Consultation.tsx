"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import MagneticButton from "@/components/ui/MagneticButton";

export default function Consultation() {
  const blobsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!blobsRef.current) return;
    const blobs = blobsRef.current.querySelectorAll(".blob");
    const tween = gsap.to(blobs, {
      y: "+=40",
      x: "+=20",
      duration: 8,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: 1.2,
    });
    return () => {
      tween.kill();
    };
  }, []);

  return (
    <section
      className="relative py-[150px] overflow-hidden text-cream"
      style={{ background: "linear-gradient(180deg,#221B16,#2C221A)" }}
    >
      <div ref={blobsRef}>
        <div className="blob" style={{ width: 420, height: 420, background: "var(--honey)", top: "-10%", left: "-8%" }} />
        <div className="blob" style={{ width: 340, height: 340, background: "var(--sage)", bottom: "-15%", right: "-6%" }} />
      </div>

      <div className="wrap">
        <div className="relative z-[2] max-w-[760px] mx-auto text-center border border-honey/35 rounded-[22px] px-[50px] py-20 bg-cream/[.03]">
          <span className="eyebrow">Free Consultation</span>
          <h2 className="mt-4 mb-4 text-[clamp(2rem,4.4vw,3.4rem)] text-cream">
            Not sure where to start?
          </h2>
          <p className="text-cream/70 max-w-[44ch] mx-auto mb-8">
            Tell us about your skin and we&apos;ll hand-pick a starter routine — no obligation,
            just honest advice from the people who make it.
          </p>
          <MagneticButton
            href="#"
            variant="solid"
            className="!bg-honey !text-bark"
          >
            Book Your Consultation
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
