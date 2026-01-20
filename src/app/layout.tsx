import type { Metadata } from "next";
import { Fira_Code } from "next/font/google";
import "./globals.css";

const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Dean Rabbani | Fullstack Web Developer",
  description: "A 17-year-old passionate developer crafting modern, performant and beautiful web experiences.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${firaCode.variable} font-mono antialiased text-white bg-[#0f0f17]`}>
        {children}
      </body>
    </html>
  );
}
