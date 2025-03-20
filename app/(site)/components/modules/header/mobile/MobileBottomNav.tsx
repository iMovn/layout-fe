"use client";

import { Home, Menu, Phone, ShoppingCart } from "lucide-react";
import Link from "next/link";

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
    slug: "/gio-hang",
    icon: <ShoppingCart className="w-5 h-5 mb-0.5 text-white" />,
    label: 2,
  },
];

export default function MobileBottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-r from-success-600 to-secondary-700 border-t shadow-md flex justify-around items-center h-14 ms:hidden">
      {MainMobile.map((item, index) => {
        const content = (
          <div className="flex flex-col items-center text-xs text-gray-300 text-body-tiny-500 font-normal hover:text-primary transition relative">
            {item.icon}
            {item.name}
            {item.label !== undefined && (
              <span className="absolute -top-1 -right-2 bg-warning-600 text-white text-[10px] px-1.5 rounded-full">
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
          <button
            key={index}
            onClick={item.onClick}
            className="focus:outline-none"
          >
            {content}
          </button>
        );
      })}
    </nav>
  );
}
