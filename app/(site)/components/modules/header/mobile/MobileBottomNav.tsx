"use client";

import { Home, Menu, Phone, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useCart } from "react-use-cart";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export default function MobileBottomNav() {
  const { totalItems } = useCart();
  const [isMounted, setIsMounted] = useState(false);

  // Chỉ render trên client-side
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const MainMobile = [
    {
      id: 1,
      name: "Trang chủ",
      slug: "/",
      icon: <Home className="w-5 h-5 mb-0.5 text-white" />,
    },
    {
      id: 2,
      name: "Menu",
      onClick: () => window.dispatchEvent(new Event("toggle-menu")),
      icon: <Menu className="w-5 h-5 mb-0.5 text-white" />,
    },
    {
      id: 3,
      name: "Liên hệ",
      slug: "/lien-he",
      icon: <Phone className="w-5 h-5 mb-0.5 text-white" />,
    },
    {
      id: 4,
      name: "Giỏ hàng",
      slug: "/thanh-toan",
      icon: <ShoppingCart className="w-5 h-5 mb-0.5 text-white" />,
      label: totalItems > 0 ? totalItems : undefined,
    },
  ];

  if (!isMounted) return null;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-r from-success-600 to-secondary-700 border-t shadow-md flex justify-around items-center h-14 md:hidden">
      {MainMobile.map((item) => {
        const content = (
          <div
            key={item.id}
            className="flex flex-col items-center text-xs text-gray-300 hover:text-white transition relative py-1 px-2"
          >
            {item.icon}
            <span className="text-body-tiny-500 font-normal">{item.name}</span>
            {item.label !== undefined && (
              <span className="absolute -top-1 -right-1 bg-warning-600 text-white text-[10px] h-5 w-5 flex items-center justify-center rounded-full animate-bounce">
                {item.label}
              </span>
            )}
          </div>
        );

        return item.slug ? (
          <Link
            href={item.slug}
            key={item.id}
            className="flex-1 flex justify-center"
            aria-label={item.name}
          >
            {content}
          </Link>
        ) : (
          <Button
            key={item.id}
            onClick={item.onClick}
            variant="ghost"
            className="flex-1 h-full focus:outline-none hover:bg-transparent"
            aria-label={item.name}
          >
            {content}
          </Button>
        );
      })}
    </nav>
  );
}
