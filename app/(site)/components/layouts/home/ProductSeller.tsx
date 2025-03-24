"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Check,
  ChevronDown,
  CircleX,
  Loader2,
  OctagonAlert,
  ShoppingCart,
} from "lucide-react";
import { ProductSellerType } from "@/app/(site)/types/product_cate";
import { formatCurrency } from "@/lib/utils";
import { productSellerData } from "../data/products";
import { useState } from "react";
import useIsMobile from "../../common/useIsMobile";

interface ProductSellerProps {
  products: ProductSellerType[];
}

export function ProductSeller({ products }: ProductSellerProps) {
  const [visibleCount, setVisibleCount] = useState(10);
  const isMobile = useIsMobile();
  const [isLoading, setIsLoading] = useState(false);

  const visibleProducts = products.slice(0, visibleCount);

  const handleLoadMore = () => {
    setIsLoading(true);
    setTimeout(() => {
      setVisibleCount((prev) => prev + (isMobile ? 6 : 5));
      setIsLoading(false);
    }, 1000);
  };

  return (
    <section className="py-10">
      <div className="product-items">
        <h2 className="text-2xl font-semibold mb-6">Sản phẩm bán chạy</h2>
        <div className="grid grid-cols-2 ms:grid-cols-5 gap-4">
          {visibleProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl shadow p-4 flex flex-col h-full"
            >
              <Link
                href={`/${product.slug}.html`}
                title={product.title}
                className="block relative w-full aspect-[1/1] overflow-hidden rounded-t-lg group"
              >
                <div className="relative w-full h-full">
                  <Image
                    src={product.image}
                    alt={product.title || "san-pham"}
                    fill
                    sizes="100%"
                    className="object-cover transition-transform duration-300 group-hover:scale-105 rounded-t-lg"
                  />
                  <span className="pointer-events-none absolute inset-0 before:absolute before:top-0 before:left-[-100%] before:w-[60%] before:bg-white before:opacity-20 before:skew-x-[-20deg] before:blur-sm group-hover:before:animate-flash-glide" />
                </div>
              </Link>
              <p className="text-sm text-gray-500 mb-1">{product.brand}</p>
              <h3 className="text-lg font-semibold text-gray-800 mb-1 line-clamp-2 min-h-[2.8em] capitalize">
                {product.title}
              </h3>
              <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                {product.description}
              </p>

              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="text-lg font-bold text-red-600 whitespace-nowrap">
                  {formatCurrency(product.salePrice)}
                </span>
                <span className="line-through text-gray-400 text-sm whitespace-nowrap">
                  {formatCurrency(product.originalPrice)}
                </span>
                <span className="text-sm text-green-600 whitespace-nowrap">
                  -{product.discountPercent}%
                </span>
              </div>

              <p className="text-sm mb-3 flex items-center gap-1">
                {product.inStock ? (
                  <>
                    <Check className="w-4 h-4 text-success-700" />
                    <span className="text-gray-700">Còn hàng</span>
                  </>
                ) : (
                  <>
                    <CircleX className="w-4 h-4 text-danger-700" />
                    <span className="text-gray-700">Hết hàng</span>
                  </>
                )}
              </p>

              {product.inStock ? (
                <Button
                  disabled={!product.inStock}
                  className="w-full mt-auto bg-success-500 hover:bg-success-600 text-white"
                  aria-label={`Thêm ${product.title} vào giỏ hàng`}
                >
                  <ShoppingCart className="w-4 h-4 mr-1" />
                  Thêm vào giỏ
                </Button>
              ) : (
                <Button asChild>
                  <Link
                    href="/lien-he"
                    className="w-full inline-flex items-center justify-center gap-2 text-sm font-medium py-2 px-4 bg-gray-200 text-danger-600 rounded-lg hover:bg-red-200 transition-colors"
                    aria-label={`Liên hệ về sản phẩm ${product.title}`}
                  >
                    <OctagonAlert className="w-4 h-4" />
                    Liên hệ
                  </Link>
                </Button>
              )}
            </div>
          ))}
        </div>

        {visibleCount < products.length && (
          <div className="text-center mt-6">
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
      </div>
    </section>
  );
}

export default function ProductSellerSection() {
  return <ProductSeller products={productSellerData} />;
}
