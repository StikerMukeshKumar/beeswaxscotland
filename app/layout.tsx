import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Beeswax Scotland — Nature's Finest Care, Handcrafted in Scotland",
  description:
    "Pure beeswax skincare, traditionally poured in Scotland. Organic, ethically sourced, handmade in small batches.",
  metadataBase: new URL("https://beeswaxscotland.example"),
  openGraph: {
    title: "Beeswax Scotland",
    description: "Pure beeswax skincare, traditionally poured in Scotland.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="bg-bg text-[#222222] font-body antialiased">
        {children}
      </body>
    </html>
  );
}
