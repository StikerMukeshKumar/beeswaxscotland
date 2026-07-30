"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";

/**
 * Fullscreen loading screen: a honeycomb mark fills from the bottom like
 * honey being poured, then the whole screen wipes away to reveal the hero.
 * Calls onDone once the wipe finishes so the hero can start its reveal.
 */
export default function Loader({ onDone }: { onDone: () => void }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const rectRef = useRef<SVGRectElement>(null);
  const wordRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(true);

  useEffect(() => {
    const tl = gsap.timeline({
      defaults: { ease: "power3.out" },
      onComplete: () => {
        setMounted(false);
        onDone();
      },
    });

    tl.to(rectRef.current, { attr: { y: 16, height: 100 }, duration: 1.1 })
      .to(wordRef.current, { opacity: 1, duration: 0.3 }, "-=0.6")
      .to(rootRef.current, { yPercent: -100, duration: 0.9, ease: "power4.inOut", delay: 0.2 });

    return () => {
      tl.kill();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!mounted) return null;

  return (
    <div ref={rootRef} id="loader">
      <div style={{ position: "relative", width: 120, height: 120 }}>
        <svg viewBox="0 0 120 120" width="100%" height="100%">
          <polygon
            points="60,4 110,32 110,88 60,116 10,88 10,32"
            fill="none"
            stroke="rgba(245,239,226,.25)"
            strokeWidth={1.5}
          />
          <clipPath id="fillClip">
            <rect ref={rectRef} x="10" y="116" width="100" height="0" />
          </clipPath>
          <polygon
            points="60,4 110,32 110,88 60,116 10,88 10,32"
            fill="#E3B341"
            clipPath="url(#fillClip)"
          />
        </svg>
      </div>
      <div ref={wordRef} className="loader-word" style={{ opacity: 0 }}>
        Beeswax Scotland
      </div>
    </div>
  );
}
