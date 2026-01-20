import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Header from "@/components/Header";
import MobileNavigation from "@/components/MobileNavigation";
import Footer from "@/components/Footer";
import { getDictionary } from "@/lib/getDictionary";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Auto Market ",
  description: "Auto Market For Buy and Sale Cars",
};

export default async function RootLayout({
  children,
  // params,
}: Readonly<{
  children: React.ReactNode;
  // params: Promise<{ locale: "en" | "ku" }>;
}>) {
  // const { locale } = await params;
  // const dict = await getDictionary(locale);
  return (
    <html>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        <ToastContainer />
        <main className="pb-20">{children}</main>
        <MobileNavigation />
        <Footer />
      </body>
    </html>
  );
}
