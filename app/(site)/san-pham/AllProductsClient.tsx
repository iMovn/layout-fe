// components/products/SanPhamListClient.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useState } from "react";
import { useCart } from "react-use-cart";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import { Loader2, OctagonAlert, ShoppingCart } from "lucide-react";
import { Product } from "../types/detail/products";

interface Props {
  products: Product[];
}

export default function AllProductsClient({ products }: Props) {
  const [addingId, setAddingId] = useState<number | null>(null);
  const { addItem } = useCart();

  const handleAddToCart = useCallback(
    async (product: Product) => {
      setAddingId(product.id);
      try {
        addItem({
          id: product.id.toString(),
          name: product.name,
          price: product.price,
          image: product.image_url,
          brand: product.brands,
          slug: product.slug,
          metadata: {
            originalId: product.id,
            slug: product.slug,
            brand: product.brands,
          },
        });
      } catch (error) {
        console.error("Lỗi khi thêm vào giỏ:", error);
      } finally {
        setTimeout(() => setAddingId(null), 500);
      }
    },
    [addItem]
  );

  return (
    <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <div
          key={product.id}
          className="border rounded-lg p-4 shadow hover:shadow-md transition"
        >
          <Link
            href={`/${product.slug}`}
            className="block mt-2 relative w-full aspect-[1/1] overflow-hidden rounded-t-lg group"
          >
            <div className="relative w-full h-full">
              <Image
                src={product.image_url}
                alt={product.name}
                fill
                sizes="100%"
                className="object-cover transition-transform duration-300 group-hover:scale-105 rounded-t-lg"
                priority
              />
              <span className="pointer-events-none absolute inset-0 before:content-[''] before:absolute before:top-0 before:bottom-0 before:left-[-100%] before:w-[60%] before:bg-white before:opacity-20 before:skew-x-[-20deg] before:blur-sm group-hover:before:animate-flash-glide"></span>
            </div>
          </Link>

          <div className="group_info mb-4 mx-3 flex flex-col flex-grow">
            <div className="mt-3 flex-grow min-h-0">
              <h3 className="text-lg font-semibold text-gray-800 mb-1 line-clamp-2 min-h-[2.8em]">
                {product.name}
              </h3>
            </div>

            <div className="mt-auto">
              <div className="flex justify-between items-center gap-2 mb-2">
                <div className="price_l -space-y-1">
                  <div className="salePrice">
                    <span className="text-body-sm-500 font-bold text-danger-600 whitespace-nowrap">
                      {formatCurrency(product.price)}
                    </span>
                  </div>
                </div>
              </div>

              {product.price ? (
                <Button
                  className="w-full mt-auto bg-primary_custom hover:bg-primary-400"
                  onClick={() => handleAddToCart(product)}
                  disabled={addingId === product.id}
                  size="sm"
                >
                  {addingId === product.id ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <ShoppingCart className="w-4 h-4 mr-2" />
                  )}
                  {addingId === product.id ? "Đang thêm..." : "Thêm vào giỏ"}
                </Button>
              ) : (
                <Button asChild size="sm">
                  <Link
                    href="/lien-he"
                    className="w-full flex items-center justify-center bg-warning-500 hover:bg-warning-600 text-white py-2 rounded-md text-sm transition-colors"
                  >
                    <OctagonAlert className="w-4 h-4 mr-2" />
                    Liên hệ
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      ))}
    </main>
  );
}
