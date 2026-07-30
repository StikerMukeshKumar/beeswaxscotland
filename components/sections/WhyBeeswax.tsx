"use client";

import { useEffect, useRef } from "react";
import { gsap, registerGsap } from "@/lib/gsap";
import { WHY_PANELS } from "@/constants/why-panels";

const TINTS = ["#221B16", "#2A2015", "#241C15", "#2E2417", "#221B16"];

export default function WhyBeeswax() {
  const pinRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const panelsRef = useRef<(HTMLDivElement | null)[]>([]);
  const progressRef = useRef<(HTMLElement | null)[]>([]);
  const headingRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    registerGsap();
    const panels = panelsRef.current.filter(Boolean) as HTMLDivElement[];
    const progressBars = progressRef.current
      .filter(Boolean)
      .map((el) => el!.querySelector("em")) as HTMLElement[];

    if (!panels.length || !stageRef.current || !pinRef.current) return;

    gsap.set(panels[0], { opacity: 1 });
    gsap.set(progressBars[0], { scaleX: 1 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: pinRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.6,
        pin: stageRef.current,
      },
    })
    tl.to(
  headingRef.current,
  {
    opacity: 0,
    y: -150,
    ease: "power3.out",
    duration: 0.8,
  },
  0.8
);

    panels.forEach((panel, i) => {
      if (i > 0) {
        tl.to(panels[i - 1], { opacity: 0, y: -40, duration: 0.4 }, i)
          .fromTo(panel, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.4 }, i);
      }
      tl.to(progressBars, { scaleX: 0, duration: 0.01 }, i).to(
        progressBars[i],
        { scaleX: 1, duration: 0.3 },
        i
      );
      tl.to(stageRef.current, { backgroundColor: TINTS[i], duration: 0.4 }, i);
    });

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  return (
  <section ref={pinRef} id="why" className="why-pin">
  {/* Heading */}
  <div
    ref={headingRef}
    className="absolute top-[12vh] left-[6vw] z-20 pointer-events-none"
  >
    <span className="eyebrow text-honey">Why Beeswax</span>

    <h2 className="mt-2.5 text-[clamp(2.2rem,4vw,3.4rem)] text-cream">
      Five reasons it&apos;s
      <br />
      worth the wait
    </h2>
  </div>

  {/* Pinned Stage */}
  <div ref={stageRef} className="why-stage">
    <div className="relative w-full h-full">
      {WHY_PANELS.map((panel, i) => (
        <div
          key={panel.eyebrow}
          ref={(el) => {
            panelsRef.current[i] = el;
          }}
          className="why-panel"
        >
          <div>
            <div className="num">{panel.eyebrow}</div>

            <h3>{panel.title}</h3>

            <p>{panel.body}</p>
          </div>
        </div>
      ))}
    </div>

    <div className="why-progress absolute bottom-[8vh] left-[6vw] flex gap-2.5 z-[6]">
      {WHY_PANELS.map((panel, i) => (
        <i
          key={panel.eyebrow}
          ref={(el) => {
            progressRef.current[i] = el;
          }}
        >
          <em />
        </i>
      ))}
    </div>
  </div>
</section>
  );
}
