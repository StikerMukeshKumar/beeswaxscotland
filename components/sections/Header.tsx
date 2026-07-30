"use client";

import Link from "next/link";
import { NAV_LINKS } from "@/constants/nav";
import MagneticButton from "@/components/ui/MagneticButton";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full z-[500] flex items-center justify-between px-[6vw] py-[26px]">
      <div className="font-display text-2xl tracking-wide text-bark">
        Beeswax <span className="text-honey-deep">Scotland</span>
      </div>

      <nav className="hidden md:block">
        <ul className="flex gap-10 list-none m-0 p-0">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-[.82rem] tracking-wide uppercase text-bark hover:text-honey-deep transition-colors"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <MagneticButton href="#products" variant="ghost" className="border-bark text-bark hidden sm:inline-flex">
        Shop Now
      </MagneticButton>
    </header>
  );
}
