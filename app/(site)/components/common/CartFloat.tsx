"use client";
import { useCart } from "react-use-cart";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function CartFloatIcon() {
  const { totalItems } = useCart(); // Sử dụng totalItems từ hook

  const pathname = usePathname();
  const isCheckoutPage = pathname === "/thanh-toan";

  // Ẩn icon khi ở trang thanh toán
  if (isCheckoutPage) return null;

  return (
    <div className="ms:block hidden">
      <Link
        href="/thanh-toan"
        className="fixed top-1/2 right-6 bg-primary_custom p-3 rounded-full shadow-lg"
      >
        <div className="relative">
          <ShoppingCart className="text-gray-700 w-6 h-6" />
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-warning-600 text-white text-body-tiny-500 font-bold w-5 h-5 flex items-center justify-center rounded-full animate-bounce">
              {totalItems}
            </span>
          )}
        </div>
      </Link>
    </div>
  );
}
