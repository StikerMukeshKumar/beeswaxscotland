"use client";

import { useEffect, useRef } from "react";
import MagneticButton from "@/components/ui/MagneticButton";
import { gsap, ScrollTrigger, registerGsap } from "@/lib/gsap";

interface HeroProps {
  /** Hero's entrance animation waits for this to flip true (loader finished). */
  ready: boolean;
}

export default function Hero({ ready }: HeroProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const combRef = useRef<HTMLDivElement>(null);
  const pollenLayerRef = useRef<HTMLDivElement>(null);

  // Entrance animation, gated on the loader finishing.
  useEffect(() => {
    if (!ready) return;
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
    tl.from(".hero-eyebrow span", { yPercent: 120, duration: 0.9 })
      .from(".hero-line span", { yPercent: 120, duration: 1, stagger: 0.12 }, "-=0.6")
      .from(".hero-sub span", { opacity: 0, y: 14, duration: 0.6, stagger: 0.08 }, "-=0.5")
      .from(".hero-actions .btn", { opacity: 0, y: 20, duration: 0.6, stagger: 0.1 }, "-=0.4");
    return () => {
      tl.kill();
    };
  }, [ready]);

  // Floating pollen + parallax comb, independent of the loader.
  useEffect(() => {
    registerGsap();
    const layer = pollenLayerRef.current;
    if (!layer) return;

    const particles: HTMLDivElement[] = [];
    for (let i = 0; i < 26; i++) {
      const p = document.createElement("div");
      p.className = "pollen";
      const s = gsap.utils.random(2, 6);
      p.style.width = `${s}px`;
      p.style.height = `${s}px`;
      p.style.left = `${gsap.utils.random(0, 100)}%`;
      p.style.top = `${gsap.utils.random(0, 100)}%`;
      layer.appendChild(p);
      particles.push(p);
      gsap.to(p, {
        y: gsap.utils.random(-140, -260),
        x: `+=${gsap.utils.random(-60, 60)}`,
        opacity: gsap.utils.random(0.2, 0.7),
        duration: gsap.utils.random(6, 14),
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: gsap.utils.random(0, 4),
      });
    }

    const parallax = gsap.to(combRef.current, {
      y: 120,
      scrollTrigger: { trigger: heroRef.current, start: "top top", end: "bottom top", scrub: true },
    });

    return () => {
      particles.forEach((p) => p.remove());
      parallax.scrollTrigger?.kill();
      parallax.kill();
    };
  }, []);

  return (
    <section ref={heroRef} className="hero">
      <div className="hero-noise" />
      <div ref={combRef} className="hero-comb">
        <svg viewBox="0 0 400 400" fill="none" width="100%" height="100%">
          <g stroke="#E3B341" strokeWidth={1} opacity={0.5}>
            <polygon points="100,10 150,40 150,100 100,130 50,100 50,40" />
            <polygon points="200,10 250,40 250,100 200,130 150,100 150,40" />
            <polygon points="150,100 200,130 200,190 150,220 100,190 100,130" />
            <polygon points="250,100 300,130 300,190 250,220 200,190 200,130" />
            <polygon points="100,190 150,220 150,280 100,310 50,280 50,220" />
            <polygon points="200,190 250,220 250,280 200,310 150,280 150,220" />
          </g>
        </svg>
      </div>
      <div ref={pollenLayerRef} className="absolute inset-0 pointer-events-none" aria-hidden="true" />

      <div className="relative z-10 w-full px-[6vw] pb-[7vw]">
        <div className="hero-eyebrow overflow-hidden mb-[18px]">
          <span className="eyebrow inline-block">
            A Scottish Heritage House · Est. Traditionally Poured
          </span>
        </div>
        <h1>
          <span className="hero-line">
            <span>Nature&apos;s Finest Care,</span>
          </span>
          <span className="hero-line">
            <span>Handcrafted in Scotland</span>
          </span>
        </h1>
        <div className="hero-sub flex gap-6 mt-6 text-[.95rem] text-bark-soft flex-wrap">
          <span>Organic</span>
          <span>Award Winning</span>
          <span>Traditionally Poured</span>
        </div>
        <div className="hero-actions flex gap-4 mt-11 flex-wrap">
          <MagneticButton href="#products" variant="solid">
            Explore Collection
          </MagneticButton>
          <MagneticButton href="#story" variant="ghost" className="border-bark/35 text-bark">
            Watch Our Story
          </MagneticButton>
        </div>
      </div>

      <div className="scroll-cue absolute right-[6vw] bottom-[7vw] [writing-mode:vertical-rl] tracking-[.3em] text-[.72rem] uppercase text-bark-soft flex items-center gap-3.5">
        <div className="stick">
          <i />
        </div>
        Scroll
      </div>
    </section>
  );
}
