import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://impact.livog.com"),
  title: {
    default: "UI Library Build Impact",
    template: "%s | UI Library Build Impact",
  },
  description:
    "Explore how popular UI libraries affect the size of your Next.js build.",
  keywords: [
    "Next.js",
    "UI library",
    "bundle size",
    "build impact",
    "performance",
  ],
  openGraph: {
    title: "UI Library Build Impact",
    description:
      "Understand how each UI library changes the size of your Next.js bundles.",
    url: "https://impact.livog.com",
    siteName: "UI Library Build Impact",
    images: [
      {
        url: "/vercel.svg",
        width: 1200,
        height: 630,
        alt: "UI Library Impact",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "UI Library Build Impact",
    description:
      "Check how different UI libraries influence your Next.js build size.",
    images: ["/vercel.svg"],
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
