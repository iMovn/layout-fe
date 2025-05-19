// components/layouts/product/RelatedProductsSection.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { ShoppingCart, Loader2 } from "lucide-react";
import { useCart } from "react-use-cart";
import { RelatedProduct } from "@/app/(site)/types/product";

interface RelatedProductsListProps {
  products: RelatedProduct[];
}

export default function RelatedProducts({
  products,
}: RelatedProductsListProps) {
  const { addItem } = useCart();
  const [addingId, setAddingId] = useState<number | null>(null);

  // Format giá tiền
  const formatCurrency = (price: number): string => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  // Tính phần trăm giảm giá
  const calculateDiscountPercentage = (
    price: number,
    discountPrice: number
  ): number => {
    if (!price || !discountPrice || price <= 0 || discountPrice >= price) {
      return 0;
    }
    return Math.round(((price - discountPrice) / price) * 100);
  };

  // Xử lý thêm vào giỏ hàng
  const handleAddToCart = async (
    e: React.MouseEvent,
    product: RelatedProduct
  ) => {
    e.preventDefault();
    setAddingId(product.id);

    try {
      addItem(
        {
          id: product.id.toString(),
          name: product.name,
          price: product.discount_price || product.price,
          image: product.image_url,
          slug: product.slug,
          metadata: {
            originalId: product.id,
            slug: product.slug,
            stock: product.stock,
            categories: product.categories,
          },
        },
        1
      );

      console.log("Đã thêm vào giỏ hàng:", product.name);
    } catch (error) {
      console.error("Lỗi khi thêm vào giỏ:", error);
    } finally {
      setTimeout(() => setAddingId(null), 500);
    }
  };

  if (!products || products.length === 0) {
    return <div className="text-center py-4">Không có sản phẩm liên quan.</div>;
  }

  console.log("Rendering related products:", products.length);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {products.map((product) => (
        <div
          key={product.id}
          className="bg-white rounded-lg shadow border border-gray-200 transition-all duration-300 hover:shadow-md flex flex-col h-full"
        >
          {/* Hình sản phẩm */}
          <Link
            href={`/${product.slug}.html`}
            className="block relative w-full aspect-square overflow-hidden rounded-t-lg group"
          >
            <Image
              src={product.image_url || "/product-default.jpg"}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            {product.discount_price && (
              <div className="absolute top-2 right-2 bg-red-600 text-white text-xs py-0.5 px-1.5 rounded-md">
                -
                {calculateDiscountPercentage(
                  product.price,
                  product.discount_price
                )}
                %
              </div>
            )}
          </Link>

          <div className="p-3 flex flex-col flex-grow">
            <Link href={`/${product.slug}.html`}>
              <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 min-h-[2.8em] hover:text-primary_layout transition-colors">
                {product.name}
              </h3>
            </Link>

            {product.description && (
              <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                {product.description}
              </p>
            )}

            {/* Giá cả */}
            <div className="mt-auto pt-2">
              {product.discount_price ? (
                <div className="space-y-1">
                  <div className="text-sm font-bold text-red-600">
                    {formatCurrency(product.discount_price)}
                  </div>
                  <div className="text-xs line-through text-gray-400">
                    {formatCurrency(product.price)}
                  </div>
                </div>
              ) : (
                <div className="text-sm font-bold text-red-600">
                  {formatCurrency(product.price)}
                </div>
              )}

              <button
                onClick={(e) => handleAddToCart(e, product)}
                disabled={addingId === product.id}
                className="w-full mt-2 py-1.5 text-xs bg-primary_layout hover:bg-hover_layout text-white rounded flex items-center justify-center"
              >
                {addingId === product.id ? (
                  <Loader2 className="w-3 h-3 animate-spin" />
                ) : (
                  <>
                    <ShoppingCart className="w-3 h-3 mr-1" /> Thêm vào giỏ
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
