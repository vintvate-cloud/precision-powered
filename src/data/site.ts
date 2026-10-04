// Every value in this file is copied verbatim from https://motomanicev.com/
// (homepage, contact page, header and footer) as of Oct 2026. Do not add
// facts that are not present on the source site.
import productsJson from "./products.json";

export type Product = {
  slug: string;
  name: string;
  category: string;
  description: string[];
  images: string[];
};

export const products = productsJson as Product[];

export const company = {
  name: "Motomanic",
  tagline: "Powering the Future of Electric Mobility",
  intro:
    "Motomanic is a leading supplier of high-performance PMSM motors, controllers, and EV conversion kits, helping businesses and individuals transition to smarter, cleaner electric vehicles. From powerful motor systems to ready-to-install battery packs, we deliver reliable, efficient, and affordable EV solutions — all backed by real-world performance and trusted customer support.",
  established: "2020",
  city: "Bhopal, Madhya Pradesh",
  clients: "100+",
  aboutHeading: "Empowering India's Shift to Electric Mobility",
  about: [
    "Established in 2020 and based in Bhopal, Madhya Pradesh, Motomanic is a trusted name in the electric vehicle components industry. We specialize in high-performance PMSM motors, motor controllers, battery packs, and complete EV kits for electric bikes, golf carts, and industrial vehicles.",
    "We serve OEMs, retrofitters, dealers, and EV enthusiasts with ready-to-install, performance-tested solutions designed to meet India’s growing demand for electric mobility. With a focus on quality, customer satisfaction, and technical expertise, Motomanic has become a preferred choice for over 100+ clients nationwide.",
  ],
  plantImage: "https://motomanicev.com/wp-content/uploads/2025/08/plant-3-1024x768.jpg",
  logo: "https://motomanicev.com/wp-content/uploads/2025/08/logo-90x90-1.webp",
  marquee: [
    "High-efficiency drivetrains",
    "EV-ready components",
    "Engineered for performance",
    "High torque. Low maintenance.",
    "Eco-friendly",
    "Sustainable",
  ],
};

export const founder = {
  name: "Mr. Ashutosh Gupta",
  role: "Founder, Motomanic",
  image:
    "https://motomanicev.com/wp-content/uploads/2025/09/WhatsApp-Image-2025-09-11-at-09.53.20_5ff31d05-746x1024.jpg",
  bio: "Founded by Ashutosh Gupta, a seasoned leader with over 20 years of experience in the automobile industry, Motomanic is a bold, future-driven company committed to transforming India’s mobility landscape through sustainable electric vehicle (EV) innovation. Headquartered in Bhopal, Madhya Pradesh, Motomanic is more than an EV manufacturer—it is a movement towards cleaner, smarter, and more connected transportation.",
};

export const chapters = [
  {
    label: "Founder's Vision",
    body: [
      "Ashutosh Gupta brings two decades of deep-rooted industry expertise, spanning traditional automotive engineering to modern EV technologies. With a visionary mindset and hands-on leadership, he launched Motomanic to bridge the gap between legacy mobility and a sustainable future, with a focus on affordability, performance, and real-world utility tailored to the Indian demographic.",
    ],
  },
  {
    label: "Core Values",
    list: [
      ["Innovation with Purpose", "Creating vehicles that are practical, affordable, and technologically advanced."],
      ["Sustainability", "Reducing carbon footprints without compromising on performance."],
      ["Empowerment", "Uplifting communities through green jobs, local manufacturing, and clean transportation."],
      ["Resilience", "Building solutions for India’s unique terrain, climate, and infrastructure challenges."],
    ],
  },
  {
    label: "Company Mission",
    list: [
      ["01", "Accelerate the adoption of electric vehicles in Tier 2 and Tier 3 cities."],
      ["02", "Design and build reliable, high-efficiency EVs that cater to both individual consumers and commercial fleets."],
      ["03", "Foster local innovation and manufacturing by nurturing engineering talent in Madhya Pradesh and central India."],
      ["04", "Contribute to India’s larger goal of becoming a global hub for clean mobility."],
    ],
  },
  {
    label: "The Road Ahead",
    body: [
      "Under Ashutosh Gupta’s leadership, Motomanic is set to redefine electric mobility for the Indian heartland. With multiple EV models in the development pipeline and strategic plans for scaling up production, charging infrastructure, and service networks, the company envisions a future where clean mobility is not a luxury, but a standard—accessible to every Indian.",
      "Motomanic is not just building vehicles. It’s powering a movement—one that drives India towards energy independence, environmental responsibility, and engineering excellence.",
    ],
  },
] as { label: string; body?: string[]; list?: [string, string][] }[];

export type Category = {
  slug: string;
  name: string;
  image: string;
  parent?: string;
};

// Top-level categories as listed in the site's navigation menu.
export const categories: Category[] = [
  { slug: "pmsm-motor-and-controller", name: "PMSM Motor and Controller", image: "https://motomanicev.com/wp-content/uploads/2025/09/10Kw-PMSM-Motor-and-Controller-1-1024x793.jpg" },
  { slug: "differentials", name: "Differentials", image: "https://motomanicev.com/wp-content/uploads/2025/09/4-Ton-42-52-56-Inch-differential-1024x768.jpg" },
  { slug: "front-axles-with-steering-systems", name: "Front Axles with Steering Systems", image: "https://motomanicev.com/wp-content/uploads/2025/09/Front-Axle-with-Steering-system-4-Ton.jpg" },
  { slug: "material-handling-solutions", name: "Material Handling Solutions", image: "https://motomanicev.com/wp-content/uploads/2025/08/electric-trolley-500kg-load-capacity-500x500-1.webp" },
  { slug: "golf-carts", name: "Golf Carts", image: "https://motomanicev.com/wp-content/uploads/2025/08/golf-cart-6-seater-500x500-1.webp" },
  { slug: "li-ion-battery-packs", name: "Li-Ion Battery Packs", image: "https://motomanicev.com/wp-content/uploads/2025/09/72v-100AH-LFP-c-Battery-Pack-1024x768.jpg" },
  { slug: "our-r-and-d-projects", name: "Our R & D Projects", image: "" },
];

export const subcategories: Category[] = [
  { slug: "electric-platform-truck", name: "Electric Platform Truck", parent: "material-handling-solutions", image: "" },
  { slug: "electric-tow-truck", name: "Electric Tow Truck", parent: "material-handling-solutions", image: "" },
  { slug: "electric-trolley", name: "Electric Trolley", parent: "material-handling-solutions", image: "" },
  { slug: "customised-solutions", name: "Customised Solutions", parent: "material-handling-solutions", image: "" },
];

export const allCategories = [...categories, ...subcategories];

export function productsIn(slug: string) {
  const subs = subcategories.filter((s) => s.parent === slug).map((s) => s.slug);
  return products.filter((p) => p.category === slug || subs.includes(p.category));
}

export function categoryImage(c: Category) {
  return c.image || productsIn(c.slug)[0]?.images[0] || "";
}

// "Trending Products" specs exactly as shown on the homepage.
export const trending: { slug: string; specs: [string, string][] }[] = [
  { slug: "6-ton-cap-drive-train-2", specs: [["Voltage", "6 V"], ["Power", "2 KW"], ["Speed", "250 RPM"]] },
  { slug: "all-drive-1", specs: [["Voltage", "72 V"], ["Power", "20 KW"], ["Speed", "4500 RPM"]] },
  { slug: "6-seater-golf-cart", specs: [["Loading Capacity", "500 Kgs"], ["KM per charge", "70 Km"], ["Speed", "30 Kmph"]] },
  { slug: "electric-platform-truck-3-tons", specs: [["Motor Voltage", "220 V"], ["Power", "1500 Watt"], ["Phase", "Three Phase"]] },
];
// The homepage "Smart Drive Train" motor cards reuse golf-cart style values
// (load capacity, km per charge) for motors. [DATA REQUIRES VERIFICATION] —
// intentionally not displayed.

export const testimonials = [
  { quote: "We’ve been using Motomanic’s PMSM motors and controllers for over a year. The liquid-cooled models have improved the efficiency of our machines, reducing energy consumption and downtime. Their customized electric trucks have made our material handling processes much smoother. Great service and reliable products every time!", name: "Ravi Kumar", role: "Operations Head, Forcefudge Manufacturing Pvt. Ltd." },
  { quote: "Motomanic’s electric platform trucks and trolleys have made a huge difference in our warehouse. They are powerful, easy to operate, and have significantly reduced our maintenance costs. The team even customized solutions for us, making our work much more efficient. Highly recommend their products and services.", name: "Priya Sharma", role: "Fleet Manager, Shanti Logistics Pvt. Ltd." },
  { quote: "Motomanic’s Li-Ion battery packs have been crucial to the success of our electric vehicles. The performance and energy efficiency are exceptional. Their team provided customized solutions that perfectly matched our needs, and the after-sales service has been impeccable. We’re extremely satisfied with their products and ongoing support.", name: "Vikas Reddy", role: "Product Manager, E-Smart Vehicles India Ltd." },
];

const L = "https://motomanicev.com/wp-content/uploads/2025/10/";
export const clients = [
  ["Mercury EV Tech", "Mercury-EV-Tech.png"], ["VIT", "VIT.png"], ["FARADIGM", "FARADIGM.png"], ["Rana Group", "Rana-Group.png"],
  ["Brainware University", "Brainware-University.png"], ["ARAI", "Arai-Logo.png"], ["TMTL", "TMTL-LOgo.png"], ["MACAWBER", "MACAWBER-Logo.png"],
  ["CAPCO", "CAPCO-Logo.png"], ["MECWIN", "MECWIN-Logo.png"], ["ARMADA", "ARMADA-Logo.png"], ["EDGEFORCE", "EDGEFORCE-Logo.png"],
  ["Technos Instruments", "TECHNOS-INSTRUMENTS-Logo.png"], ["Terranomous", "TERRANOMOUS-logo.png"], ["SHAKTI", "SHAKTI-Logo.png"], ["VOLEKTRA", "VOLEKTRA.png"],
  ["KRISHIGATI", "KRISHIGATI.png"], ["Gurunanak", "GURUNANAK.png"], ["EDGO Carts", "EDGO-Carts.png"], ["AK Auto Agency", "AK-AUto-Agency.png"],
].map(([name, file]) => ({ name, logo: L + file }));

export const contact = {
  phones: [
    { label: "Ordering", display: "+91-9229110501", tel: "+919229110501" },
    { label: "Sales & Marketing", display: "+91-6376224631", tel: "+916376224631" },
  ],
  email: "motomanic.evs@gmail.com",
  registeredOffice: "G-2/241, Gulmohar, Colony E-8, Arera Colony, Shahpura, Bhopal - 462039, Madhya Pradesh, India",
  plant: "Plot No - 8 Kotra, Kolar road Near Mandideep, Bhopal MP 462026",
  social: [
    { label: "Facebook", href: "https://www.facebook.com/motomanic.evs" },
    { label: "Instagram", href: "https://www.instagram.com/motomanic.ev" },
    { label: "YouTube", href: "https://youtube.com/@motomanicevs" },
  ],
};
