"use client";

import { RefObject } from "react";
import { gsap, registerGsap } from "@/lib/gsap";

/**
 * Fades + lifts every [data-reveal] descendant of `containerRef`
 * as it enters the viewport.
 */
export function revealUpChildren<T extends HTMLElement>(
  containerRef: RefObject<T | null>
) {
  registerGsap();

  const container = containerRef.current;
  if (!container) return [];

  const targets = container.querySelectorAll<HTMLElement>("[data-reveal]");

  return Array.from(targets).map((el) =>
    gsap.from(el, {
      opacity: 0,
      y: 34,
      duration: 0.9,
      ease: "power3.out",
      scrollTrigger: {
        trigger: el,
        start: "top 88%",
      },
    })
  );
}