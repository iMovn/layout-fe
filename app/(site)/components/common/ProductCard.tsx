// components/ProductCard.tsx
"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Star } from "lucide-react";
import { ProductType } from "../../types/product";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn, formatCurrency } from "@/lib/utils";

type Props = {
  product: ProductType;
};

export default function ProductCard({ product }: Props) {
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  const colorOptions = product.attributes?.color || [];
  const selectedVariant = colorOptions.find((c) => c.name === selectedColor);

  const displayImage = selectedVariant?.image || product.image;

  const prices = useMemo(() => {
    if (colorOptions.length > 0) {
      const priceList = colorOptions
        .map((c) => c.price)
        .filter((p): p is number => typeof p === "number");
      const min = Math.min(...priceList);
      const max = Math.max(...priceList);
      return { min, max };
    }
    return { min: product.price || 0, max: product.price || 0 };
  }, [colorOptions, product.price]);

  const displayPrice =
    selectedVariant?.price ?? (prices.min === prices.max ? prices.min : null);
  const originalPrice = product.originalPrice || 0;
  const discountPercent =
    originalPrice && displayPrice
      ? Math.round(100 - (displayPrice / originalPrice) * 100)
      : null;

  const isContactPrice =
    (!displayPrice || displayPrice === 0) &&
    (!prices.min || !prices.max || prices.min === 0 || prices.max === 0);

  return (
    <div className="rounded-lg border shadow-sm group hover:shadow-md hover:border-primary-400 duration-300 transition-all flex flex-col h-full">
      {/* Image with transition */}
      <Link
        href={`/${product.slug}.html`}
        className="block relative w-full aspect-[1/1] overflow-hidden rounded-t-lg group"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={displayImage}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0"
          >
            <div className="relative w-full h-full">
              <Image
                src={displayImage}
                alt={product.name || "san-pham-mau"}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105 rounded-t-lg"
                sizes="100%"
              />
              <span className="pointer-events-none absolute inset-0 before:content-[''] before:absolute before:top-0 before:bottom-0 before:left-[-100%] before:w-[60%] before:bg-white before:opacity-20 before:skew-x-[-20deg] before:blur-sm group-hover:before:animate-flash-glide"></span>
            </div>
          </motion.div>
        </AnimatePresence>

        {discountPercent && (
          <span className="absolute top-2 right-2 bg-danger-500 text-white text-body-tiny-500 px-2 py-1 rounded-lg">
            -{discountPercent}%
          </span>
        )}
      </Link>

      <div className="flex flex-col gap-1 flex-1 mt-2 mx-3">
        {/* Brand */}
        {product.brand && (
          <div className="text-label4 text-gray-800">
            <span className="bg-gray-300 shadow-sm rounded-md px-2 py-1">
              {product.brand || ""}
            </span>
          </div>
        )}
        {/* Name */}
        <Link
          href={`/${product.slug}.html`}
          className="font-semibold text-body-md-600 hover:text-red-600 line-clamp-2 min-h-[2.8em] capitalize"
        >
          {product.name}
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1 mt-1 text-warning-500 text-xs">
          {Array.from({ length: 5 }).map((_, i) => {
            const rating = product.rating ?? 0;
            const fillPercent = Math.max(0, Math.min(1, rating - i)); // giá trị từ 0 → 1

            return (
              <div key={i} className="relative w-[14px] h-[14px]">
                {/* Sao viền */}
                <Star
                  size={14}
                  strokeWidth={1.5}
                  stroke="currentColor"
                  fill="none"
                  className="absolute top-0 left-0"
                />
                {/* Sao tô màu theo phần trăm */}
                <div
                  className="absolute top-0 left-0 overflow-hidden"
                  style={{ width: `${fillPercent * 100}%` }}
                >
                  <Star
                    size={14}
                    strokeWidth={1.5}
                    stroke="currentColor"
                    fill="currentColor"
                  />
                </div>
              </div>
            );
          })}
          <span className="text-body-sm-500 text-gray-400 ms-1">
            ({product.rating?.toFixed(1) ?? "0.0"})
          </span>
        </div>

        {/* Price */}
        <div className="mt-1 flex flex-wrap items-center gap-1 text-base font-semibold text-gray-800">
          {isContactPrice ? (
            <Link
              href="/lien-he"
              className="text-blue-600 font-semibold text-body-md-500 hover:underline"
            >
              Liên hệ
            </Link>
          ) : displayPrice !== null ? (
            <div className="have-price">
              <span className="text-danger-500 font-bold text-body-md-500 mr-1">
                {formatCurrency(displayPrice)}
              </span>
              {originalPrice > displayPrice && (
                <span className="text-body-tiny-500 line-through text-gray-400">
                  {formatCurrency(originalPrice)}
                </span>
              )}
            </div>
          ) : (
            <span className="text-danger-500 font-bold text-body-md-500">
              {formatCurrency(prices.min)} – {formatCurrency(prices.max)}
            </span>
          )}
        </div>

        {/* Color Options */}
        {colorOptions.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {colorOptions.map((color) => (
              <Button
                key={color.name}
                onClick={() => setSelectedColor(color.name)}
                className={cn(
                  "px-3 h-7 rounded-full border-2 transition-all duration-200",
                  selectedColor === color.name
                    ? "border-warning-600 scale-110"
                    : "border-gray-300 hover:scale-105"
                )}
                style={{ backgroundColor: color.name }}
                title={color.name}
              />
            ))}
          </div>
        )}
      </div>

      {/* Add to cart */}
      <div className="block mx-3 mb-5 mt-4">
        <Button
          disabled={!product.inStock}
          className="w-full flex items-center justify-center gap-2 !text-body-sm-500 bg-primary-700 text-white py-2 rounded-xl hover:bg-primary-600 transition disabled:opacity-50"
        >
          <ShoppingCart size={16} />
          {product.inStock ? "Thêm vào giỏ" : "Hết hàng"}
        </Button>
      </div>
    </div>
  );
}
