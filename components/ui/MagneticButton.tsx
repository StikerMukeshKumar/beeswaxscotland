"use client";

import Link from "next/link";
import { ReactNode } from "react";
import { useMagnetic } from "@/hooks/useMagnetic";

interface MagneticButtonProps {
  href: string;
  children: ReactNode;
  variant?: "solid" | "ghost";
  className?: string;
}

/**
 * A pill CTA that eases toward the cursor on hover and snaps back with a
 * light elastic ease on leave. Renders as a Next.js Link.
 */
export default function MagneticButton({
  href,
  children,
  variant = "solid",
  className = "",
}: MagneticButtonProps) {
  const ref = useMagnetic<HTMLAnchorElement>(0.4);

  return (
    <Link
      ref={ref}
      href={href}
      className={`btn ${variant === "solid" ? "btn-solid" : "btn-ghost"} ${className}`}
    >
      {children}
    </Link>
  );
}
