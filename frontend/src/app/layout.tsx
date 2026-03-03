import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Toaster } from "react-hot-toast";
import FloatingActions from "@/components/layout/FloatingActions";
import ScrollManager from "@/components/layout/ScrollManager";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Aura India — Premium Indian Women's Fashion",
  description:
    "Discover premium Indian ethnic wear — anarkalis, kurti sets, half sarees, co-ord sets and more. Handcrafted with love for the modern Indian woman.",
  keywords: "Indian ethnic wear, anarkali, kurti, half saree, Indian women fashion, ethnic fashion India",
  openGraph: {
    title: "Aura India — Premium Indian Women's Fashion",
    description: "Celebrating Indian women through premium handcrafted fashion.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              fontFamily: "Jost, sans-serif",
              fontSize: "14px",
              background: "#1a1412",
              color: "#fffcf8",
              borderRadius: 0,
            },
            success: { iconTheme: { primary: "#c8956c", secondary: "#fff" } },
          }}
        />
        <Navbar />
        <Suspense fallback={null}>
          <ScrollManager />
        </Suspense>
        <main style={{ minHeight: "calc(100vh - 73px)" }}>{children}</main>
        <FloatingActions />
        <Footer />
      </body>
    </html>
  );
}
