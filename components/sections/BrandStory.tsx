"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap, registerGsap } from "@/lib/gsap";
import { revealUpChildren } from "@/animations/revealUp";

const TIMELINE = [
  { year: "2009", event: "Three hives, one kitchen table" },
  { year: "2014", event: "First workshop opens in Aberdeenshire" },
  { year: "2019", event: "Certified organic & cruelty free" },
  { year: "2024", event: "Awarded Scotland's Natural Beauty Prize" },
];

export default function BrandStory() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGsap();
    const triggers = revealUpChildren(sectionRef);

    const frame = frameRef.current;
    let imgTween: gsap.core.Tween | undefined;
    let frameTween: gsap.core.Tween | undefined;
    if (frame) {
      const img = frame.querySelector("img");
      if (img) {
        gsap.set(img, { scale: 1.25 });
        imgTween = gsap.to(img, {
          scale: 1,
          duration: 1.4,
          ease: "power3.out",
          scrollTrigger: { trigger: frame, start: "top 80%" },
        });
      }
      frameTween = gsap.fromTo(
        frame,
        { clipPath: "inset(0 0 100% 0)" },
        {
          clipPath: "inset(0 0 0% 0)",
          duration: 1.2,
          ease: "power4.inOut",
          scrollTrigger: { trigger: frame, start: "top 85%" },
        }
      );
    }

    return () => {
      triggers.forEach((t) => t.scrollTrigger?.kill());
      imgTween?.scrollTrigger?.kill();
      frameTween?.scrollTrigger?.kill();
    };
  }, []);

  return (
    <section ref={sectionRef} id="story" className="bg-bg py-[170px_0_150px] pt-[170px] pb-[150px]">
      <div className="wrap grid grid-cols-1 md:grid-cols-[.9fr_1.1fr] gap-20 items-center">
        <div ref={frameRef} className="story-frame">
          <div className="ring" />
          <Image
            src="/images/our-story.png"
            alt="Founder tending the hives in the Scottish countryside"
            fill
            sizes="(max-width: 768px) 100vw, 45vw"
            style={{ objectFit: "cover" }}
          />
        </div>

        <div>
          <span data-reveal className="eyebrow block">
            Our Story
          </span>
          <h2 data-reveal className="text-[clamp(2rem,3.6vw,3.1rem)] leading-tight mb-7 text-bark mt-3">
            Poured by hand, on a small croft in the Scottish Highlands
          </h2>
          <p data-reveal className="text-[1.02rem] leading-[1.85] text-bark-soft max-w-[46ch] mb-5">
            It began with three hives, a wood-fired stove and a family recipe passed down
            through generations. What we couldn&apos;t buy in a shop, we learned to make
            ourselves — patiently, honestly, in small batches that never leave our workshop
            until they&apos;re right.
          </p>
          <p data-reveal className="text-[1.02rem] leading-[1.85] text-bark-soft max-w-[46ch] mb-5">
            Today, every jar is still poured by hand. No shortcuts, no mass production —
            just time, care and the wax our bees give us each summer.
          </p>

          <div className="mt-11 border-t border-bark/10">
            {TIMELINE.map((row) => (
              <div
                key={row.year}
                data-reveal
                className="flex justify-between py-[18px] border-b border-bark/10 text-[.92rem]"
              >
                <span className="font-display text-[1.15rem] text-honey-deep">{row.year}</span>
                <span>{row.event}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
