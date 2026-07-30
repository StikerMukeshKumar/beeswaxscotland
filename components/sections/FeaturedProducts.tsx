"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap, registerGsap } from "@/lib/gsap";
import { revealUpChildren } from "@/animations/revealUp";
import { PRODUCTS } from "@/constants/products";
import { Product } from "@/types";

const CATEGORIES: Array<"All" | Product["category"]> = ["All", "Balms", "Soaps", "Candles"];

export default function FeaturedProducts() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<(typeof CATEGORIES)[number]>("All");

  const visible = active === "All" ? PRODUCTS : PRODUCTS.filter((p) => p.category === active);

  useEffect(() => {
    registerGsap();
    const triggers = revealUpChildren(sectionRef);
    return () => triggers.forEach((t) => t.scrollTrigger?.kill());
  }, []);

  // 3D tilt-on-mouse for each card.
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    const cards = Array.from(grid.querySelectorAll<HTMLElement>(".p-card"));

    const handlers = cards.map((card) => {
      const onMove = (e: MouseEvent) => {
        const rect = card.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width - 0.5;
        const py = (e.clientY - rect.top) / rect.height - 0.5;
        gsap.to(card, {
          rotateY: px * 10,
          rotateX: -py * 10,
          duration: 0.4,
          ease: "power2.out",
          transformPerspective: 800,
        });
      };
      const onLeave = () => {
        gsap.to(card, { rotateY: 0, rotateX: 0, duration: 0.6, ease: "power3.out" });
      };
      card.addEventListener("mousemove", onMove);
      card.addEventListener("mouseleave", onLeave);
      return { card, onMove, onLeave };
    });

    return () => {
      handlers.forEach(({ card, onMove, onLeave }) => {
        card.removeEventListener("mousemove", onMove);
        card.removeEventListener("mouseleave", onLeave);
      });
    };
  }, [visible.length]);

  return (
    <section ref={sectionRef} id="products" className="py-[170px] pb-[140px] bg-bg">
      <div className="wrap">
        <div className="flex justify-between items-end mb-[60px] gap-8 flex-wrap">
          <div>
            <span data-reveal className="eyebrow block">
              Featured Products
            </span>
            <h2 data-reveal className="text-[clamp(2rem,3.6vw,3.1rem)] text-bark mt-2.5">
              The current collection
            </h2>
          </div>
          <div className="flex gap-2.5 flex-wrap">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`text-[.78rem] tracking-wide uppercase px-[18px] py-[9px] rounded-full border transition-colors ${
                  active === cat
                    ? "bg-bark text-cream border-bark"
                    : "border-bark/20 bg-transparent text-bark"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {visible.map((product) => (
            <div key={product.id} data-reveal className="p-card">
              <div className="p-glow" />
              <div className="p-img">
                <Image
                  src={product.image}
                  alt={product.alt}
                  width={600}
                  height={630}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="p-cat">{product.category}</span>
              <h3 className="font-display text-2xl mt-2 mb-1.5 text-bark">{product.name}</h3>
              <p className="text-[.95rem] text-bark-soft">{product.price}</p>
              <div className="p-add" aria-label={`Add ${product.name} to cart`}>
                +
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
