"use client";

import Link from "next/link";
import {
  ShoppingCart,
  Check,
  CircleX,
  Loader2,
  OctagonAlert,
} from "lucide-react";
import { MouseEvent, useCallback, useState } from "react";
import { useCart } from "react-use-cart";
import Image from "next/image";
import { CartPopup } from "../../common/CartPopup";
import { Button } from "@/components/ui/button";
import { ProductDetail, RelatedProduct } from "@/app/(site)/types/product";
import { ProductItem } from "@/app/(site)/types/category/product";

// Union type để có thể xử lý cả ProductDetail và ProductItem
type ProductType = ProductDetail | RelatedProduct | ProductItem;

interface ProductCardProps {
  products?: ProductType[];
  product?: ProductType;
}

export default function ProductCard({ products, product }: ProductCardProps) {
  const { addItem } = useCart();
  const [addingId, setAddingId] = useState<number | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Tạo mảng sản phẩm từ props
  const productItems = products || (product ? [product] : []);

  const calculateDiscountPercentage = (
    price: number,
    discountPrice: number
  ): number => {
    if (!price || !discountPrice || price <= 0 || discountPrice >= price)
      return 0;
    return Math.round(((price - discountPrice) / price) * 100);
  };

  const formatCurrency = (price: number): string => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  // Hàm kiểm tra xem sản phẩm có còn hàng không
  const isInStock = (product: ProductType): boolean => {
    // Nếu stock là 0 hoặc null thì là hết hàng
    if (product.stock === 0 || product.stock === null) return false;
    // Nếu stock không được định nghĩa (undefined), coi như còn hàng
    if (product.stock === undefined) return true;
    // Nếu stock > 0, còn hàng
    return product.stock > 0;
  };

  // Hàm lấy số lượng tồn kho an toàn
  const getStockDisplay = (product: ProductType): string => {
    if (product.stock === undefined) return "Còn hàng";
    if (product.stock === null || product.stock === 0) return "Hết hàng";
    // return `Còn hàng (${product.stock})`; có kem theo số lượng trong kho
    return `Còn hàng`;
  };

  const handleAddToCart = useCallback(
    async (e: MouseEvent<HTMLButtonElement>, product: ProductType) => {
      e.preventDefault();
      setAddingId(product.id);

      try {
        addItem(
          {
            id: product.id.toString(),
            name: product.name,
            price: product.discount_price || product.price || 0,
            image: product.image_url,
            brand: product.brands?.[0]?.name || "",
            slug: product.slug,
            metadata: {
              originalId: product.id,
              slug: product.slug,
              stock: product.stock !== null ? product.stock : undefined,
              categories: product.categories,
            },
          },
          1
        );

        // Hiển thị popup giỏ hàng sau khi thêm thành công
        setIsCartOpen(true);

        console.log("Đã thêm vào giỏ hàng:", product.name);
      } catch (error) {
        console.error("Lỗi khi thêm vào giỏ:", error);
      } finally {
        setTimeout(() => setAddingId(null), 500);
      }
    },
    [addItem]
  );

  // Kiểm tra nếu không có sản phẩm
  if (productItems.length === 0) {
    return <div className="text-center p-4">Không có sản phẩm</div>;
  }

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {productItems.map((product) => (
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
                priority={productItems.indexOf(product) < 6}
              />
              <span className="pointer-events-none absolute inset-0 before:content-[''] before:absolute before:top-0 before:bottom-0 before:left-[-100%] before:w-[60%] before:bg-white before:opacity-20 before:skew-x-[-20deg] before:blur-sm group-hover:before:animate-flash-glide"></span>
            </Link>

            <div className="p-3 flex flex-col flex-grow">
              {/* Thông tin sản phẩm */}
              <div className="mb-2">
                {product.brands?.[0] && (
                  <p className="text-xs text-gray-500">
                    {product.brands[0].name}
                  </p>
                )}
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
              </div>

              {/* Giá cả */}
              <div className="mt-auto">
                <div className="flex justify-between items-center gap-2 mb-2">
                  <div className="space-y-1">
                    {product.discount_price ? (
                      <>
                        <div className="text-sm font-bold text-red-600">
                          {formatCurrency(product.discount_price)}
                        </div>
                        <div className="text-xs line-through text-gray-400">
                          {formatCurrency(product.price)}
                        </div>
                      </>
                    ) : (
                      <div className="text-sm font-bold text-red-600">
                        {formatCurrency(product.price)}
                      </div>
                    )}
                  </div>
                  {product.discount_price && (
                    <div className="bg-danger-700 text-white text-xs py-0.5 px-1.5 rounded-md">
                      -
                      {calculateDiscountPercentage(
                        product.price,
                        product.discount_price
                      )}
                      %
                    </div>
                  )}
                </div>

                {/* Tình trạng hàng - Hiển thị trạng thái tồn kho */}
                <div className="text-xs mb-3 flex items-center gap-1">
                  {isInStock(product) ? (
                    <>
                      <Check className="w-3 h-3 text-green-600" />
                      <span className="text-gray-700">
                        {getStockDisplay(product)}
                      </span>
                    </>
                  ) : (
                    <>
                      <CircleX className="w-3 h-3 text-red-600" />
                      <span className="text-gray-700">Hết hàng</span>
                    </>
                  )}
                </div>

                {/* Nút hành động */}
                {isInStock(product) ? (
                  <Button
                    className="w-full mt-auto bg-primary_custom hover:bg-primary-400"
                    onClick={(e) => handleAddToCart(e, product)}
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
      </div>

      {/* CartPopup component */}
      <CartPopup open={isCartOpen} onOpenChange={setIsCartOpen} />
    </>
  );
}
