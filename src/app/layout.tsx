import type { Metadata } from "next";
import { DM_Sans, Instrument_Serif } from "next/font/google";
import "./globals.css";

const sans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});
const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://dyn.codes"),
  alternates: { canonical: "/" },
  title: "Dean Rabbani | Fullstack Developer & Web Development",
  description:
    "Independent fullstack developer in Depok, Indonesia. Thoughtful websites and business software, including PoundasiERP, Attala Wedding, TamiasPOS, and PorLapor. Let’s build your next idea.",
  keywords: [
    "Dean Rabbani",
    "fullstack developer",
    "web developer Indonesia",
    "website development",
    "Depok",
    "PoundasiERP",
    "TamiasPOS",
    "Attala Wedding",
    "PorLapor",
  ],
  openGraph: {
    title: "Dean Rabbani | Thoughtful code. Real-world impact.",
    description:
      "Websites and software built around your business. Explore selected work and start a conversation.",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/images/dean-ciremai.webp",
        width: 1090,
        height: 1244,
        alt: "Dean Rabbani at Mount Ciremai",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dean Rabbani | Fullstack Developer",
    description:
      "Thoughtful websites and software for real-world business needs.",
    images: ["/images/dean-ciremai.webp"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${sans.variable} ${serif.variable}`}>{children}</body>
    </html>
  );
}
