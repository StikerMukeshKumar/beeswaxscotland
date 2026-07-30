import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-bark text-cream pt-[100px] pb-10">
      <div className="wrap">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-[50px] mb-20">
          <div>
            <div className="font-display text-3xl mb-4">Beeswax Scotland</div>
            <p className="text-cream/60 text-[.9rem] max-w-[32ch]">
              Handcrafted natural skincare, traditionally poured in the Scottish Highlands.
            </p>
          </div>
          <div>
            <h4 className="text-[.78rem] tracking-wide uppercase text-honey mb-5">Shop</h4>
            <ul className="list-none p-0 m-0 flex flex-col gap-3">
              <li><Link href="#products" className="text-[.9rem] text-cream/70 hover:text-honey">Balms</Link></li>
              <li><Link href="#products" className="text-[.9rem] text-cream/70 hover:text-honey">Soaps</Link></li>
              <li><Link href="#products" className="text-[.9rem] text-cream/70 hover:text-honey">Candles</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-[.78rem] tracking-wide uppercase text-honey mb-5">Company</h4>
            <ul className="list-none p-0 m-0 flex flex-col gap-3">
              <li><Link href="#story" className="text-[.9rem] text-cream/70 hover:text-honey">Our Story</Link></li>
              <li><Link href="#awards" className="text-[.9rem] text-cream/70 hover:text-honey">Awards</Link></li>
              <li><Link href="#" className="text-[.9rem] text-cream/70 hover:text-honey">Wholesale</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-[.78rem] tracking-wide uppercase text-honey mb-5">Follow</h4>
            <ul className="list-none p-0 m-0 flex flex-col gap-3">
              <li><Link href="#" className="text-[.9rem] text-cream/70 hover:text-honey">Instagram</Link></li>
              <li><Link href="#" className="text-[.9rem] text-cream/70 hover:text-honey">Pinterest</Link></li>
              <li><Link href="#" className="text-[.9rem] text-cream/70 hover:text-honey">Facebook</Link></li>
            </ul>
          </div>
        </div>
        <div className="flex justify-between border-t border-cream/10 pt-8 text-[.8rem] text-cream/50 flex-wrap gap-3.5">
          <span>© 2026 Beeswax Scotland. All rights reserved.</span>
          <span>Design and Develop by <a href="http://mukeshdevtech.com/">MukeshDev Tech</a></span>
        </div>
      </div>
    </footer>
  );
}
