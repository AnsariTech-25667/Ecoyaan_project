import "./globals.css";

import { CheckoutProvider } from "@/context/CheckoutContext";
import type { Metadata } from "next";
import localFont from "next/font/local";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Ecoyaan Checkout",
  description: "Simplified e-commerce checkout flow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 text-gray-800 leading-relaxed`}
      >
        <CheckoutProvider>
          <main className="max-w-6xl mx-auto px-6 py-10">
            {children}
          </main>
        </CheckoutProvider>
      </body>
    </html>
  );
}
