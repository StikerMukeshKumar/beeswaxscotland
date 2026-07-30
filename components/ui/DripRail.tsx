"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, registerGsap } from "@/lib/gsap";

/**
 * The site's signature element: a honey drip that fills down a rail on the
 * left edge of the screen in step with overall scroll progress, ending in
 * a glowing droplet. A visual callback to "traditionally poured."
 */
export default function DripRail() {
  const fillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGsap();
    const fill = fillRef.current;
    if (!fill) return;

    const tween = gsap.to(fill, {
      height: "100%",
      ease: "none",
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.3,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <div className="drip-rail" aria-hidden="true">
      <div ref={fillRef} className="drip-fill">
        <div className="drip-bead" />
      </div>
    </div>
  );
}
