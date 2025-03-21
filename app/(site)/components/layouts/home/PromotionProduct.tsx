"use client";

import { useState } from "react";
import { ProductType } from "@/app/(site)/types/product";
import { Button } from "@/components/ui/button";
import { ChevronDown, Loader2 } from "lucide-react";
import ProductCard from "../../common/ProductCard";

const promotionProducts: ProductType[] = [
  {
    id: 1,
    name: "Khoan pin Tolsen 21V Chính Hãng Tolsen Uy Tín TPHCM ",
    slug: "khoan-pin-tolsen-21v",
    image: "/products/home/spdm1.jpg",
    description: "Máy khoan pin đa năng",
    rating: 4.3,
    brand: "Tolsen",
    attributes: {
      color: [
        // { name: "#EC9410", price: 1890000, image: "/products/home/spdm2.jpg" },
        // { name: "#3989D6", price: 1950000, image: "/products/home/spdm1.jpg" },
        // { name: "#000", price: 1850000, image: "/products/home/spdm3.jpg" },
      ],
    },
    price: 2200000,
    originalPrice: 2290000,
    inStock: true,
  },
  {
    id: 2,
    name: "Máy cắt sắt Total 2200W chính hãng",
    slug: "may-cat-sat-total",
    image: "/products/home/spdm2.jpg",
    description: "Cắt mạnh, bền bỉ",
    rating: 0,
    brand: "Total",
    price: 2200000,
    originalPrice: 0,
    inStock: false,
  },
  {
    id: 3,
    name: "Máy bắt vít Makita 12V Siêu bền",
    slug: "may-bat-vit-makita",
    image: "/products/home/spdm3.jpg",
    description: "Chuyên dụng gia đình",
    rating: 3.3,
    brand: "Makita",
    attributes: {
      color: [],
    },
    price: 1890000,
    originalPrice: 2190000,
    inStock: true,
  },
  {
    id: 4,
    name: "Máy cắt gạch Bosch 1200W chống giật",
    slug: "may-cat-gach-bosch",
    image: "/products/home/spdm4.jpg",
    description: "Dễ cắt, chính xác",
    rating: 1.8,
    brand: "Bosch",
    attributes: {
      color: [],
    },
    price: 1690000,
    originalPrice: 0,
    inStock: true,
  },
  // ... thêm nhiều sản phẩm khác nếu muốn
  {
    id: 5,
    name: "Khoan pin Tolsen 21V thông minh hơn",
    slug: "khoan-pin-tolsen-21v",
    image: "/products/home/spdm1.jpg",
    description: "Máy khoan pin đa năng",
    rating: 4.5,
    brand: "Tolsen",
    attributes: {
      color: [
        // { name: "#FB2C36", price: 1890000, image: "/products/home/spdm2.jpg" },
        // { name: "#0EA2B1", price: 1950000, image: "/products/home/spdm1.jpg" },
        // { name: "#000", price: 1850000, image: "/products/home/spdm3.jpg" },
      ],
    },
    price: 2200000,
    originalPrice: 2290000,
    inStock: true,
  },
  {
    id: 6,
    name: "Máy cắt sắt Total 2200W tiết kiệm điện",
    slug: "may-cat-sat-total",
    image: "/products/home/spdm2.jpg",
    description: "Cắt mạnh, bền bỉ",
    rating: 4.8,
    brand: "Total",
    price: 2200000,
    originalPrice: 2600000,
    inStock: false,
  },
  {
    id: 7,
    name: "Máy bắt vít Makita 12V An toàn tay",
    slug: "may-bat-vit-makita",
    image: "/products/home/spdm3.jpg",
    description: "Chuyên dụng gia đình",
    rating: 4.2,
    brand: "Makita",
    attributes: {
      color: [
        // { name: "#0EA2B1", price: 1950000, image: "/products/home/spdm1.jpg" },
      ],
    },
    price: 1200000,
    originalPrice: 1890000,
    inStock: true,
  },
  {
    id: 8,
    name: "Máy cắt gạch Bosch 1200W",
    slug: "may-cat-gach-bosch",
    image: "/products/home/spdm4.jpg",
    description: "Dễ cắt, chính xác",
    rating: 4.4,
    brand: "Bosch",
    price: undefined,
    inStock: true,
  },
  {
    id: 9,
    name: "Máy bắt vít Makita 12V chống văng",
    slug: "may-bat-vit-makita",
    image: "/products/home/spdm1.jpg",
    description: "Chuyên dụng gia đình",
    rating: 4.2,
    brand: "Makita",
    attributes: {
      color: [
        // { name: "#FB2C36", price: 1890000, image: "/products/home/spdm2.jpg" },
      ],
    },
    price: 1300000,
    originalPrice: 1890000,
    inStock: true,
  },
  {
    id: 10,
    name: "Máy cắt gạch Bosch 1200W",
    slug: "may-cat-gach-bosch",
    image: "/products/home/spdm2.jpg",
    description: "Dễ cắt, chính xác",
    rating: 4.4,
    brand: "Bosch",
    price: undefined,
    inStock: true,
  },
];

export default function PromotionProduct() {
  const [visibleCount, setVisibleCount] = useState(6);

  const visibleProducts = promotionProducts.slice(0, visibleCount);

  const [isLoading, setIsLoading] = useState(false);
  const handleLoadMore = () => {
    setIsLoading(true);
    setTimeout(() => {
      setVisibleCount((prev) => prev + 6);
      setIsLoading(false);
    }, 1000); // giả lập thời gian loading, bạn thay bằng await fetch nếu dùng API
  };

  return (
    <section className="promotion-product mt-9">
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-6 gap-3">
        {visibleProducts.map((item) => (
          <ProductCard key={item.id} product={item} />
        ))}
      </div>
      {visibleCount < promotionProducts.length && (
        <div className="text-center mt-4">
          <Button
            onClick={handleLoadMore}
            disabled={isLoading}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin" size={16} />
                Đang tải...
              </>
            ) : (
              <>
                Xem thêm <ChevronDown size={16} />
              </>
            )}
          </Button>
        </div>
      )}
    </section>
  );
}
