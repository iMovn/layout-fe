// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import { Button } from "@/components/ui/button";
// import {
//   Check,
//   ChevronDown,
//   CircleX,
//   Loader2,
//   OctagonAlert,
//   ShoppingCart,
// } from "lucide-react";
// import { formatCurrency } from "@/lib/utils";
// import { useState, useCallback, useEffect } from "react";
// import useIsMobile from "../../common/useIsMobile";
// import { productData } from "../data/products";
// import { useCart } from "react-use-cart";
// // import { toast } from "sonner";
// import { CartPopup } from "../../common/CartPopup";
// import { ProductItem } from "@/app/(site)/types/product";

// interface ProductSellerProps {
//   products: ProductItem[];
// }

// export function ProductSeller({ products }: ProductSellerProps) {
//   const isMobile = useIsMobile();
//   const [visibleCount, setVisibleCount] = useState(isMobile ? 6 : 10);
//   const [isLoading, setIsLoading] = useState(false);
//   const [addingId, setAddingId] = useState<number | null>(null);
//   const { addItem, inCart } = useCart(); // Sử dụng addItem và inCart từ react-use-cart
//   const [isCartOpen, setIsCartOpen] = useState(false);

//   // Cập nhật visibleCount khi isMobile thay đổi
//   useEffect(() => {
//     setVisibleCount(isMobile ? 6 : 10);
//   }, [isMobile]);

//   const visibleProducts = products.slice(0, visibleCount);

//   const handleLoadMore = useCallback(() => {
//     setIsLoading(true);
//     setTimeout(() => {
//       setVisibleCount((prev) => prev + (isMobile ? 6 : 5));
//       setIsLoading(false);
//     }, 500); // Giảm thời gian loading
//   }, [isMobile]);

//   const handleAddToCart = useCallback(
//     async (product: ProductItem) => {
//       setAddingId(product.id);
//       try {
//         addItem(
//           {
//             id: product.id.toString(), // Chuyển id number sang string
//             name: product.title,
//             price: product.salePrice,
//             image: product.image,
//             // Thêm các trường bổ sung nếu cần
//             brand: product.brand,
//             slug: product.slug,
//             metadata: {
//               // Dùng metadata cho các field không chuẩn
//               originalId: product.id,
//               slug: product.slug,
//               brand: product.brand,
//             },
//           },
//           1
//         );

//         setIsCartOpen(true); // Mở popup sau khi thêm

//         // toast.success("Đã thêm vào giỏ hàng", {
//         //   duration: 2000, // 2 giây
//         //   className: "font-sans",
//         //   description: product.title, // Hiển thị tên sản phẩm
//         //   position: "top-center",
//         //   action: {
//         //     label: "Xem giỏ",
//         //     onClick: () => (window.location.href = "/thanh-toan"),
//         //   },
//         // });
//       } catch (error) {
//         console.error("Lỗi khi thêm vào giỏ:", error);
//         // toast.error("Thêm vào giỏ thất bại", {
//         //   description: "Vui lòng thử lại",
//         // });
//       } finally {
//         setTimeout(() => setAddingId(null), 500); // Để hiệu ứng loading đủ thời gian hiển thị
//       }
//     },
//     [addItem]
//   );

//   // Tối ưu hiệu năng render sản phẩm
//   const renderProduct = useCallback(
//     (product: ProductType) => (
//       <div
//         key={product.id}
//         className="bg-white rounded-lg shadow border-[1px] border-gray-200 transition-colors duration-300 hover:border-primary_custom flex flex-col h-full hover:shadow-md"
//       >
//         <Link
//           href={product.slug}
//           title={product.title}
//           className="block relative w-full aspect-[1/1] overflow-hidden rounded-t-lg group"
//           prefetch={false}
//         >
//           <div className="relative w-full h-full">
//             <Image
//               src={product.image}
//               alt={product.title || "Sản phẩm"}
//               fill
//               sizes="100%"
//               className="object-cover transition-transform duration-300 group-hover:scale-105 rounded-t-lg"
//               priority={visibleProducts.indexOf(product) < 6} // Tải ảnh đầu tiên ưu tiên
//             />
//             <span className="pointer-events-none absolute inset-0 before:content-[''] before:absolute before:top-0 before:bottom-0 before:left-[-100%] before:w-[60%] before:bg-white before:opacity-20 before:skew-x-[-20deg] before:blur-sm group-hover:before:animate-flash-glide"></span>
//           </div>
//         </Link>
//         <div className="group_info mb-4 mx-3 flex flex-col flex-grow">
//           <div className="mt-3 flex-grow min-h-0">
//             <p className="text-sm text-gray-500 mb-1">{product.brand}</p>
//             <h3 className="text-lg font-semibold text-gray-800 mb-1 line-clamp-2 min-h-[2.8em]">
//               {product.title}
//             </h3>
//             <p className="text-sm text-gray-600 mb-2 line-clamp-2">
//               {product.description}
//             </p>
//           </div>

//           <div className="mt-auto">
//             <div className="flex justify-between items-center gap-2 mb-2">
//               <div className="price_l -space-y-1">
//                 <div className="salePrice">
//                   <span className="ms:text-body-md-500 text-body-sm-500 font-bold text-danger-600 whitespace-nowrap">
//                     {formatCurrency(product.salePrice)}
//                   </span>
//                 </div>
//                 <div className="originalPrice">
//                   {product.originalPrice > product.salePrice && (
//                     <span className="line-through text-gray-400 ms:text-body-sm-500 text-body-tiny-500 whitespace-nowrap">
//                       {formatCurrency(product.originalPrice)}
//                     </span>
//                   )}
//                 </div>
//               </div>
//               <div className="percent_r">
//                 {product.discountPercent > 0 && (
//                   <span className="ms:text-body-sm-500 text-body-tiny-500 bg-danger-500 ms:py-1 py-0.5 ms:px-2 px-1 rounded-md text-white whitespace-nowrap">
//                     -{product.discountPercent}%
//                   </span>
//                 )}
//               </div>
//             </div>

//             <div className="text-sm mb-3 flex items-center gap-1">
//               {product.inStock ? (
//                 <>
//                   <Check className="w-4 h-4 text-primary-600" />
//                   <span className="text-gray-700">Còn hàng</span>
//                 </>
//               ) : (
//                 <>
//                   <CircleX className="w-4 h-4 text-danger-600" />
//                   <span className="text-gray-700">Hết hàng</span>
//                 </>
//               )}
//             </div>

//             {product.inStock ? (
//               <Button
//                 className="w-full mt-auto bg-primary_custom hover:bg-primary-400"
//                 onClick={() => handleAddToCart(product)}
//                 disabled={addingId === product.id}
//                 size="sm"
//               >
//                 {addingId === product.id ? (
//                   <Loader2 className="w-4 h-4 mr-2 animate-spin" />
//                 ) : (
//                   <ShoppingCart className="w-4 h-4 mr-2" />
//                 )}
//                 {addingId === product.id ? "Đang thêm..." : "Thêm vào giỏ"}
//               </Button>
//             ) : (
//               <Button asChild size="sm">
//                 <Link
//                   href="/lien-he"
//                   className="w-full flex items-center justify-center bg-warning-500 hover:bg-warning-600 text-white py-2 rounded-md text-sm transition-colors"
//                 >
//                   <OctagonAlert className="w-4 h-4 mr-2" />
//                   Liên hệ
//                 </Link>
//               </Button>
//             )}
//           </div>
//         </div>
//       </div>
//     ),
//     [addingId, handleAddToCart, inCart, visibleProducts]
//   );

//   return (
//     <>
//       <section className="py-10 mx-auto">
//         <h2 className="text-heading3 font-bold mb-8 text-center">
//           Sản phẩm bán chạy
//         </h2>
//         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
//           {visibleProducts.map(renderProduct)}
//         </div>

//         {visibleCount < products.length && (
//           <div className="text-center mt-8">
//             <Button
//               onClick={handleLoadMore}
//               disabled={isLoading}
//               variant="outline"
//               className="min-w-[150px]"
//             >
//               {isLoading ? (
//                 <>
//                   <Loader2 className="animate-spin mr-2" size={16} />
//                   Đang tải...
//                 </>
//               ) : (
//                 <>
//                   Xem thêm <ChevronDown className="ml-2" size={16} />
//                 </>
//               )}
//             </Button>
//           </div>
//         )}
//       </section>
//       <CartPopup open={isCartOpen} onOpenChange={setIsCartOpen} />
//     </>
//   );
// }

// export default function ProductSellerSection() {
//   return <ProductSeller products={productData} />;
// }
