"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

/**
 * A two-part custom cursor: a small dot that tracks the mouse exactly,
 * and a lagging ring that eases toward it and grows on interactive
 * elements (anything with [data-cursor-grow]).
 */
export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mx = 0,
      my = 0,
      rx = 0,
      ry = 0;

    function handleMove(e: MouseEvent) {
      mx = e.clientX;
      my = e.clientY;
      dot!.style.left = `${mx}px`;
      dot!.style.top = `${my}px`;
    }

    function tick() {
      rx += (mx - rx) * 0.15;
      ry += (my - ry) * 0.15;
      ring!.style.left = `${rx}px`;
      ring!.style.top = `${ry}px`;
    }

    window.addEventListener("mousemove", handleMove);
    gsap.ticker.add(tick);

    const growTargets = document.querySelectorAll<HTMLElement>(
      "a, button, [data-cursor-grow]"
    );
    const onEnter = () => ring.classList.add("grow");
    const onLeave = () => ring.classList.remove("grow");
    growTargets.forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    return () => {
      window.removeEventListener("mousemove", handleMove);
      gsap.ticker.remove(tick);
      growTargets.forEach((el) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
    };
  }, []);

  return (
    <>
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
    </>
  );
}
