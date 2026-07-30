export interface Product {
  id: string;
  name: string;
  category: string;
  price: string;
  image: string;
  alt: string;
}

export interface Ingredient {
  id: string;
  name: string;
  origin: string;
  benefit: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface WhyPanel {
  eyebrow: string;
  title: string;
  body: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  location: string;
}

export interface Award {
  year: string;
  title: string;
  body: string;
}
