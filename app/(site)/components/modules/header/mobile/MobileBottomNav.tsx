"use client";

import { Home, Menu, Phone, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useCart } from "react-use-cart";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export default function MobileBottomNav() {
  const { totalItems } = useCart(); // Sử dụng totalItems từ hook
  const [isMounted, setIsMounted] = useState(false);

  // Chỉ render trên client-side
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const MainMobile = [
    {
      name: "Trang chủ",
      slug: "/",
      icon: <Home className="w-5 h-5 mb-0.5 text-white" />,
    },
    {
      name: "Menu",
      onClick: () => window.dispatchEvent(new Event("toggle-menu")),
      icon: <Menu className="w-5 h-5 mb-0.5 text-white" />,
    },
    {
      name: "Liên hệ",
      slug: "/lien-he",
      icon: <Phone className="w-5 h-5 mb-0.5 text-white" />,
    },
    {
      name: "Giỏ hàng",
      slug: "/thanh-toan",
      icon: <ShoppingCart className="w-5 h-5 mb-0.5 text-white" />,
      label: totalItems > 0 ? totalItems : undefined,
    },
  ];
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-r from-success-600 to-secondary-700 border-t shadow-md flex justify-around items-center h-14 ms:hidden">
      {MainMobile.map((item, index) => {
        const content = (
          <div className="flex flex-col items-center text-xs text-gray-300 text-body-tiny-500 font-normal hover:text-primary transition relative">
            {item.icon}
            {item.name}
            {item.label !== undefined && item.label > 0 && (
              <span className="absolute -top-2 -right-2 bg-warning-600 text-white text-[11px] px-1.5 py-1 rounded-full animate-bounce">
                {item.label}
              </span>
            )}
          </div>
        );

        return item.slug ? (
          <Link href={item.slug} key={index}>
            {content}
          </Link>
        ) : (
          <Button
            key={index}
            onClick={item.onClick}
            className="focus:outline-none"
          >
            {content}
          </Button>
        );
      })}
    </nav>
  );
}
