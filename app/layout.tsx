import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-headline",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Keybridge Residential | Architectural Living & Application Portal",
  description:
    "A dedicated application and resident portal for premier metropolitan residential communities.",
  icons: {
    icon: "/favicon.svg",
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${inter.variable} scroll-smooth`}
    >
      <body className="bg-ivory-100 text-charcoal-900 antialiased min-h-screen flex flex-col font-sans selection:bg-[#EAE0D2] selection:text-charcoal-950">
        {children}
      </body>
    </html>
  );
}
