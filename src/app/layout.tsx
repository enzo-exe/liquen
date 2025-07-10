import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/nav";
import { Children } from "react";
import toast, { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Find Mountain Guides",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="" >
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >

          <div className="relative h-screen ">
            
            <Navbar/>
            {children}
            <Toaster position="top-right" />
          </div>
        
      </body>
    </html>
  );
}
