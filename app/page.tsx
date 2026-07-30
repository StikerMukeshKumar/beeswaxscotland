"use client";

import { useState } from "react";
import { useLenis } from "@/hooks/useLenis";
import Loader from "@/components/ui/Loader";
import CustomCursor from "@/components/ui/CustomCursor";
import DripRail from "@/components/ui/DripRail";
import Header from "@/components/sections/Header";
import Hero from "@/components/sections/Hero";
import BrandStory from "@/components/sections/BrandStory";
import WhyBeeswax from "@/components/sections/WhyBeeswax";
import FeaturedProducts from "@/components/sections/FeaturedProducts";
import Benefits from "@/components/sections/Benefits";
import Ingredients from "@/components/sections/Ingredients";
import Testimonials from "@/components/sections/Testimonials";
import Awards from "@/components/sections/Awards";
import Consultation from "@/components/sections/Consultation";
import Newsletter from "@/components/sections/Newsletter";
import Footer from "@/components/sections/Footer";

export default function HomePage() {
  const [loaderDone, setLoaderDone] = useState(false);
  useLenis();

  return (
    <>
      <Loader onDone={() => setLoaderDone(true)} />
      <CustomCursor />
      <DripRail />
      <Header />
      <main>
        <Hero ready={loaderDone} />
        <BrandStory />
        <WhyBeeswax />
        <FeaturedProducts />
        <Benefits />
        <Ingredients />
        <Testimonials />
        <Awards />
        <Consultation />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
