// ClientLayout.tsx (CLIENT COMPONENT)
"use client";
import "./globals.css";
import { mulish } from "./fonts";
import Header from "./components/modules/header";
import MobileBottomNav from "./components/modules/header/mobile/MobileBottomNav";
import Footer from "./components/modules/footer";
import { Toaster } from "@/components/ui/sonner";
import { CartProvider } from "react-use-cart";

import dynamic from "next/dynamic";

const CartFloatIcon = dynamic(() => import("./components/common/CartFloat"), {
  ssr: false,
});
const MobileMenu = dynamic(
  () => import("./components/modules/header/mobile/MobileMenuSlide"),
  {
    ssr: false,
  }
);

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className={`${mulish.className} antialiased flex-row`}>
          {children}
        </main>
        <Footer />

        <MobileMenu />
        <MobileBottomNav />
        <CartFloatIcon />
        <Toaster position="top-right" richColors />
      </div>
    </CartProvider>
  );
}
