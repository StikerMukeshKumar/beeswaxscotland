"use client";

import { RefObject } from "react";
import { gsap, ScrollTrigger, registerGsap } from "@/lib/gsap";

/**
 * Fades + lifts every [data-reveal] descendant of `containerRef` into place
 * as it enters the viewport. Call inside a useEffect/useGSAP context;
 * returns the ScrollTrigger instances so callers can clean them up.
 */
export function revealUpChildren(containerRef: RefObject<HTMLElement>) {
  registerGsap();
  if (!containerRef.current) return [];

  const targets = containerRef.current.querySelectorAll<HTMLElement>("[data-reveal]");
  const triggers = Array.from(targets).map((el) =>
    gsap.from(el, {
      opacity: 0,
      y: 34,
      duration: 0.9,
      ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 88%" },
    })
  );
  return triggers;
}
