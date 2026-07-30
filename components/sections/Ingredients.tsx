"use client";

import { useEffect, useRef } from "react";
import { registerGsap } from "@/lib/gsap";
import { revealUpChildren } from "@/animations/revealUp";
import { INGREDIENTS } from "@/constants/ingredients";

export default function Ingredients() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGsap();
    const triggers = revealUpChildren(sectionRef);
    return () => triggers.forEach((t) => t.scrollTrigger?.kill());
  }, []);

  return (
    <section ref={sectionRef} id="ingredients" className="py-[140px] bg-bg">
      <div className="wrap">
        <span data-reveal className="eyebrow block">
          Ingredient Showcase
        </span>
        <h2
          data-reveal
          className="mt-3.5 mb-10 text-[clamp(2rem,3.6vw,3.1rem)] text-bark"
        >
          Hover to explore what&apos;s inside
        </h2>
        <div className="border-t border-bark/15">
          {INGREDIENTS.map((ing) => (
            <div key={ing.id} data-reveal className="ing-row">
              <div className="ing-fill" />
              <h3>{ing.name}</h3>
              <div className="flex gap-10 text-[.82rem] text-bark-soft text-right relative z-[2]">
                <span>Origin: {ing.origin}</span>
                <span>{ing.benefit}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
