export const profile = {
  name: "Dean Rabbani",
  email: "deanrabbani20@gmail.com",
  location: "Depok, Indonesia",
  github: "https://github.com/dynrbni",
  linkedin: "https://www.linkedin.com/in/muhammad-dean-rabbani-7475862b2/",
  instagram: "https://instagram.com/dynrbni",
} as const;

export type Project = {
  name: string;
  category: "Business systems" | "Websites";
  label: string;
  description: string;
  detail: string;
  features: readonly string[];
  image: string;
  imageAlt: string;
  tone: string;
  href: string;
  linkLabel: string;
};

export const projects: readonly Project[] = [
  {
    name: "PoundasiERP",
    category: "Business systems",
    label: "Enterprise resource planning",
    description:
      "Bringing the moving parts of a business into one connected workspace.",
    detail:
      "An ERP web application that brings inventory, sales, purchasing, finance, and people operations into a shared system. Built around the day-to-day workflows behind a growing business.",
    features: [
      "Inventory and warehouse workflows",
      "Sales, purchasing, and accounting modules",
      "Role-based access and approval workflows",
    ],
    image: "/images/poundasi-erp.webp",
    imageAlt: "The PoundasiERP enterprise portal and role-based sign-in screen",
    tone: "sage",
    href: "https://poundasi-erp.vercel.app",
    linkLabel: "Open application",
  },
  {
    name: "Attala Wedding",
    category: "Websites",
    label: "Wedding organizer website",
    description:
      "An elegant digital home for a brand that creates once-in-a-lifetime moments.",
    detail:
      "A brand website for a wedding organizer in Depok and Jakarta. The experience presents the services, wedding gallery, and consultation options in a visual story that helps couples take the next step.",
    features: [
      "Service and brand presentation",
      "Wedding photography gallery",
      "Consultation and contact journey",
    ],
    image: "/images/attala-wedding.webp",
    imageAlt:
      "Attala Wedding website showing its wedding photography and Dari Mimpi Menjadi Kenyataan headline",
    tone: "sand",
    href: "https://attalawedding.com",
    linkLabel: "Visit website",
  },
  {
    name: "TamiasPOS",
    category: "Business systems",
    label: "Point of sale system",
    description:
      "A practical point of sale system for keeping sales, stock, and reports in sync.",
    detail:
      "A point of sale product for everyday business operations, with a web experience and a React Native cashier application. It connects transactions, product inventory, and reporting in one workflow.",
    features: [
      "Cashier and transaction workflows",
      "Product and inventory management",
      "Business reports and mobile cashier app",
    ],
    image: "/images/tamias-pos.webp",
    imageAlt:
      "TamiasPOS live website with its business management headline and dashboard preview",
    tone: "mint",
    href: "https://tamias-pos.vercel.app",
    linkLabel: "Visit website",
  },
  {
    name: "PorLapor",
    category: "Business systems",
    label: "Public reporting platform",
    description:
      "Making it easier to raise a concern and follow what happens next.",
    detail:
      "A public reporting application for submitting community concerns and tracking their progress. The workflow connects a citizen-facing report submission experience with tools for administrators to review and manage reports.",
    features: [
      "Public report submission",
      "Report status tracking",
      "Administrative reporting workflow",
    ],
    image: "/images/porlapor.webp",
    imageAlt: "PorLapor reporting platform captured from the local application",
    tone: "blue",
    href: "https://github.com/dynrbni/porlapor",
    linkLabel: "View repository",
  },
];

export const services = [
  {
    number: "01",
    name: "Websites that mean business.",
    description:
      "A considered online presence that tells your story, presents your services, and gives customers a clear way to reach you.",
    tags: "Company profiles · Landing pages · Brand websites",
  },
  {
    number: "02",
    name: "Software around your workflow.",
    description:
      "Custom web applications for the way your team actually works. From reporting portals to POS and internal business systems.",
    tags: "Web applications · Dashboards · Business systems",
  },
  {
    number: "03",
    name: "Connected from front to back.",
    description:
      "Interfaces, APIs, and databases built together, with attention to the details that make a product useful day after day.",
    tags: "API development · Database integration · Deployment",
  },
] as const;
