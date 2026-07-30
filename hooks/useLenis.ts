"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger, registerGsap } from "@/lib/gsap";

/**
 * Mounts Lenis smooth scroll once for the whole app and syncs its RAF loop
 * with GSAP's ticker so ScrollTrigger stays in lockstep with the smoothed
 * scroll position. Mount this a single time, high up the tree (e.g. in the
 * homepage's client wrapper).
 */
export function useLenis() {
  useEffect(() => {
    registerGsap();

    const lenis = new Lenis({
      lerp: 0.09,
      smoothWheel: true,
    });

    lenis.on("scroll", ScrollTrigger.update);

    function raf(time: number) {
      lenis.raf(time * 1000);
    }
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);
}
