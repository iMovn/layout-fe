"use client";

import { useState } from "react";
import {
  Truck,
  ShieldCheck,
  RefreshCw,
  Check,
  ShoppingCart,
  Loader2,
  CircleX,
} from "lucide-react";
import { useCart } from "react-use-cart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { CartPopup } from "../../common/CartPopup";
import { ProductDetail } from "@/app/(site)/types/product";
import Image from "next/image";
import Link from "next/link";

export default function ProductSingle({ product }: { product: ProductDetail }) {
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(product.image_url);
  const [isAdding, setIsAdding] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { addItem } = useCart();

  // Kiểm tra tình trạng stock
  const isInStock = (): boolean => {
    // Nếu stock là 0 hoặc null thì là hết hàng
    if (product.stock === 0 || product.stock === null) return false;
    // Nếu stock không được định nghĩa (undefined), coi như còn hàng
    if (product.stock === undefined) return true;
    // Nếu stock > 0, còn hàng
    return product.stock > 0;
  };

  // Format giá tiền
  const formatCurrency = (price: number): string => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  // Tính phần trăm giảm giá
  const calculateDiscountPercentage = (): number => {
    if (
      !product.price ||
      !product.discount_price ||
      product.discount_price >= product.price
    ) {
      return 0;
    }
    return Math.round(
      ((product.price - product.discount_price) / product.price) * 100
    );
  };

  // Xử lý thêm vào giỏ hàng
  const handleAddToCart = async () => {
    setIsAdding(true);
    try {
      addItem(
        {
          id: product.id.toString(),
          name: product.name,
          price: product.discount_price || product.price,
          image: product.image_url,
          brand: product.brands?.[0]?.name || "",
          slug: product.slug,
          metadata: {
            originalId: product.id,
            slug: product.slug,
            stock: product.stock,
            categories: product.categories,
          },
        },
        quantity
      );

      // Hiển thị popup giỏ hàng
      setIsCartOpen(true);
    } catch (error) {
      console.error("Lỗi khi thêm vào giỏ:", error);
    } finally {
      setTimeout(() => setIsAdding(false), 500);
    }
  };

  // Tăng số lượng
  const increaseQuantity = () => {
    // Nếu stock null hoặc 0, không cho tăng số lượng
    if (product.stock === null || product.stock === 0) return;

    // Nếu có stock, giới hạn số lượng theo stock
    const maxStock = product.stock || 100; // Nếu undefined thì giới hạn tối đa 100
    if (quantity < maxStock) {
      setQuantity((prev) => prev + 1);
    }
  };

  // Giảm số lượng
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Phần hình ảnh bên trái */}
      <div className="space-y-4">
        <div className="aspect-square overflow-hidden rounded-lg border border-gray-200">
          <Image
            src={selectedImage}
            alt={product.name}
            width={500}
            height={500}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Thumbnail gallery */}
        <div className="grid grid-cols-5 gap-2">
          <button
            onClick={() => setSelectedImage(product.image_url)}
            className={`aspect-square rounded-md overflow-hidden border-2 ${
              selectedImage === product.image_url
                ? "border-primary"
                : "border-gray-200"
            }`}
          >
            <Image
              src={product.image_url}
              alt={product.name}
              width={500}
              height={500}
              className="w-full h-full object-cover"
            />
          </button>

          {/* Thêm các hình ảnh khác nếu có */}
          {/* {product.galleries?.map((gallery: any, index: number) => (
            <button 
              key={index}
              onClick={() => setSelectedImage(gallery.image_url)}
              className={`aspect-square rounded-md overflow-hidden border-2 ${selectedImage === gallery.image_url ? 'border-primary' : 'border-gray-200'}`}
            >
              <img 
                src={gallery.image_url} 
                alt={`${product.name} - ${index + 1}`} 
                className="w-full h-full object-cover"
              />
            </button>
          ))} */}
        </div>
      </div>

      {/* Phần thông tin sản phẩm bên phải */}
      <div className="space-y-6">
        <div>
          {/* Thương hiệu */}
          {product.brands?.[0] && (
            <p className="text-gray-500 text-sm">{product.brands[0].name}</p>
          )}

          {/* Tên sản phẩm */}
          <h1 className="text-2xl font-bold text-gray-900 mt-1">
            {product.name}
          </h1>

          {/* Đánh giá */}
          <div className="flex items-center mt-2">
            <div className="flex items-center">
              {[0, 1, 2, 3, 4].map((rating) => (
                <svg
                  key={rating}
                  className="w-4 h-4 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 15.585l-5.93 3.117 1.13-6.59-4.798-4.679 6.633-.964L10 0l2.965 6.469 6.633.964-4.798 4.679 1.13 6.59z"
                    clipRule="evenodd"
                  />
                </svg>
              ))}
            </div>
            <p className="text-xs text-gray-500 ml-2">5.0 (12 đánh giá)</p>
          </div>
        </div>

        {/* Giá */}
        <div className="space-y-1">
          {product.discount_price ? (
            <>
              <div className="flex items-center gap-3">
                <span className="text-2xl font-bold text-red-600">
                  {formatCurrency(product.discount_price)}
                </span>
                <span className="text-lg line-through text-gray-400">
                  {formatCurrency(product.price)}
                </span>
                <span className="bg-red-600 text-white text-sm px-2 py-1 rounded-md">
                  -{calculateDiscountPercentage()}%
                </span>
              </div>
              <p className="text-xs text-green-600">
                Tiết kiệm:{" "}
                {formatCurrency(product.price - product.discount_price)}
              </p>
            </>
          ) : (
            <span className="text-2xl font-bold text-red-600">
              {formatCurrency(product.price)}
            </span>
          )}
        </div>

        {/* Tình trạng kho */}
        <div className="flex items-center">
          <span className="text-sm text-gray-700 mr-2">Tình trạng:</span>
          {isInStock() ? (
            <span className="text-sm text-green-600 flex items-center">
              <Check className="w-4 h-4 mr-1" />
              {product.stock !== undefined && product.stock !== null
                ? `Còn hàng (${product.stock})`
                : "Còn hàng"}
            </span>
          ) : (
            <span className="text-sm text-red-600 flex items-center">
              <CircleX className="w-4 h-4 mr-1" /> Hết hàng
            </span>
          )}
        </div>

        {/* Mô tả ngắn */}
        <div className="text-sm text-gray-600">
          <p>{product.description}</p>
        </div>

        {/* Thông tin bổ sung */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          {product.brands?.[0] && (
            <div>
              <span className="font-medium text-gray-700">Thương hiệu:</span>{" "}
              <span>{product.brands[0].name}</span>
            </div>
          )}

          {product.origins?.[0] && (
            <div>
              <span className="font-medium text-gray-700">Xuất xứ:</span>{" "}
              <span>{product.origins[0].name}</span>
            </div>
          )}

          {product.categories?.[0] && (
            <div>
              <span className="font-medium text-gray-700">Danh mục:</span>{" "}
              <span>{product.categories[0].name}</span>
            </div>
          )}
        </div>

        {/* Chọn số lượng - chỉ hiển thị nếu còn hàng */}
        {isInStock() && (
          <div className="space-y-4">
            <div className="flex items-center">
              <span className="text-sm text-gray-700 mr-4">Số lượng:</span>
              <div className="flex items-center border border-gray-300 rounded-md">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={decreaseQuantity}
                  disabled={quantity <= 1}
                  className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                >
                  -
                </Button>
                <span className="px-4 py-1 text-gray-800">{quantity}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={increaseQuantity}
                  disabled={
                    product.stock !== undefined &&
                    product.stock !== null &&
                    quantity >= product.stock
                  }
                  className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                >
                  +
                </Button>
              </div>
            </div>

            {/* Nút thêm vào giỏ hàng */}
            <Button
              onClick={handleAddToCart}
              disabled={isAdding}
              className="w-full"
            >
              {isAdding ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Đang thêm...
                </>
              ) : (
                <>
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Thêm vào giỏ hàng
                </>
              )}
            </Button>
          </div>
        )}

        {/* Button liên hệ khi hết hàng */}
        {!isInStock() && (
          <div className="space-y-4">
            <Button
              asChild
              className="w-full bg-warning-500 hover:bg-warning-600 text-white"
            >
              <Link href="/lien-he">
                <ShoppingCart className="w-5 h-5 mr-2" />
                Liên hệ đặt hàng
              </Link>
            </Button>
          </div>
        )}

        {/* Dịch vụ & cam kết */}
        <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg text-sm">
          <div className="flex items-start gap-2">
            <Truck className="w-5 h-5 text-green-600 mt-0.5" />
            <div>
              <p className="font-medium">Giao hàng miễn phí</p>
              <p className="text-gray-600">Cho đơn hàng từ 500.000đ</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <ShieldCheck className="w-5 h-5 text-green-600 mt-0.5" />
            <div>
              <p className="font-medium">Bảo hành chính hãng</p>
              <p className="text-gray-600">12 tháng theo nhà sản xuất</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <RefreshCw className="w-5 h-5 text-green-600 mt-0.5" />
            <div>
              <p className="font-medium">Đổi trả dễ dàng</p>
              <p className="text-gray-600">7 ngày đầu tiên</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs thông tin chi tiết */}
      <div className="col-span-1 md:col-span-2 mt-8">
        <Tabs defaultValue="details" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="details">Thông tin chi tiết</TabsTrigger>
            <TabsTrigger value="specs">Thông số kỹ thuật</TabsTrigger>
            <TabsTrigger value="reviews">Đánh giá</TabsTrigger>
          </TabsList>
          <TabsContent value="details" className="mt-4">
            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={{
                __html: product.content || product.description || "",
              }}
            />
          </TabsContent>
          <TabsContent value="specs" className="mt-4">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Thông số kỹ thuật</h3>
              {product.specifications ? (
                // Nếu specifications là chuỗi HTML, hiển thị bằng dangerouslySetInnerHTML
                <div
                  className="prose max-w-none"
                  dangerouslySetInnerHTML={{ __html: product.specifications }}
                />
              ) : (
                <p className="text-gray-500">Chưa có thông tin</p>
              )}
            </div>
          </TabsContent>
          <TabsContent value="reviews" className="mt-4">
            <div className="text-center py-8">
              <p className="text-gray-500">Chưa có đánh giá nào.</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* CartPopup component */}
      <CartPopup open={isCartOpen} onOpenChange={setIsCartOpen} />
    </div>
  );
}
