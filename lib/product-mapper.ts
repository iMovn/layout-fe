// // lib/product-mapper.ts
// import {
//   ProductItem,
//   Category,
//   Brand,
//   Origin,
//   Color,
//   Size,
// } from "@/app/(site)/types/product";
// import {
//   CategoryWithPivotPro,
//   Brand as CategoryBrand,
//   Origin as CategoryOrigin,
//   Color as CategoryColor,
//   Size as CategorySize,
//   User as CategoryUser,
//   Product as CategoryProduct,
// } from "@/app/(site)/types/category/product";

// // Mapper cho Brand
// function mapBrand(brand: Brand): CategoryBrand {
//   return {
//     id: brand.id,
//     name: brand.name,
//     pivot: {
//       product_id: brand.pivot?.product_id || 0,
//       brand_id: brand.pivot?.brand_id,
//       category_id: undefined,
//       origin_id: undefined,
//       color_id: undefined,
//       size_id: undefined,
//     },
//   };
// }

// // Mapper cho Category
// function mapCategory(category: Category): CategoryWithPivotPro {
//   return {
//     id: category.id,
//     name: category.name,
//     pivot: {
//       product_id: category.pivot?.product_id || 0,
//       category_id: category.pivot?.category_id,
//       brand_id: undefined,
//       origin_id: undefined,
//       color_id: undefined,
//       size_id: undefined,
//     },
//   };
// }

// // Mapper cho Origin
// function mapOrigin(origin: Origin): CategoryOrigin {
//   return {
//     id: origin.id,
//     name: origin.name,
//     pivot: {
//       product_id: origin.pivot?.product_id || 0,
//       origin_id: origin.pivot?.origin_id,
//       category_id: undefined,
//       brand_id: undefined,
//       color_id: undefined,
//       size_id: undefined,
//     },
//   };
// }

// // Mapper cho Color
// function mapColor(color: Color): CategoryColor {
//   return {
//     id: color.id,
//     name: color.name,
//     code: color.code || "",
//     pivot: {
//       product_id: color.pivot?.product_id || 0,
//       color_id: color.pivot?.color_id,
//       category_id: undefined,
//       brand_id: undefined,
//       origin_id: undefined,
//       size_id: undefined,
//     },
//   };
// }

// // Mapper cho Size
// function mapSize(size: Size): CategorySize {
//   return {
//     id: size.id,
//     name: size.name,
//     pivot: {
//       product_id: size.pivot?.product_id || 0,
//       size_id: size.pivot?.size_id,
//       category_id: undefined,
//       brand_id: undefined,
//       origin_id: undefined,
//       color_id: undefined,
//     },
//   };
// }

// // Mapper cho User
// function mapUser(user?: { id: number; name: string }): CategoryUser {
//   return user ? { id: user.id, name: user.name } : { id: 0, name: "" };
// }

// /**
//  * Chuyển đổi ProductItem sang Product (category)
//  * @param productItem Sản phẩm từ API chi tiết
//  * @returns Sản phẩm dạng category
//  */
// export function mapProductItemToProduct(
//   productItem: ProductItem
// ): CategoryProduct {
//   return {
//     id: productItem.id,
//     name: productItem.name,
//     slug: productItem.slug,
//     price: productItem.price,
//     image: productItem.image,
//     image_url: productItem.image_url,
//     description: productItem.description || "",
//     user_id: productItem.user_id || 0,
//     created_at: productItem.created_at || "",
//     discount_price: productItem.discount_price,
//     stock: productItem.stock || 0,
//     categories: productItem.categories?.map(mapCategory) || [],
//     brands: productItem.brands?.map(mapBrand) || [],
//     origins: productItem.origins?.map(mapOrigin) || [],
//     colors: productItem.colors?.map(mapColor) || [],
//     sizes: productItem.sizes?.map(mapSize) || [],
//     users: mapUser(productItem.users),
//   };
// }

// /**
//  * Chuyển đổi mảng ProductItem sang Product[]
//  * @param productItems Mảng sản phẩm từ API
//  * @returns Mảng sản phẩm dạng category
//  */
// export function mapApiDataToProducts(
//   productItems: ProductItem[] | any
// ): CategoryProduct[] {
//   // Đảm bảo productItems là một mảng
//   const items = Array.isArray(productItems) ? productItems : [];

//   // Sử dụng map nếu là mảng
//   return items.map(mapProductItemToProduct);
// }

// /**
//  * Chuyển đổi mảng sản phẩm liên quan
//  * @param relatedProducts Mảng sản phẩm liên quan từ API
//  * @returns Mảng sản phẩm dạng category
//  */
// export function mapRelatedProducts(
//   relatedProducts: ProductItem[]
// ): CategoryProduct[] {
//   return relatedProducts.map(mapProductItemToProduct);
// }

// /**
//  * Xử lý mapping an toàn khi dữ liệu có thể null/undefined
//  * @param productItem Sản phẩm cần map (có thể null/undefined)
//  * @returns Product hoặc null nếu có lỗi
//  */
// export function safeMapProductItemToProduct(
//   productItem?: ProductItem | null
// ): CategoryProduct | null {
//   if (!productItem) return null;

//   try {
//     return mapProductItemToProduct(productItem);
//   } catch (error) {
//     console.error("Error mapping product item:", error, productItem);
//     return null;
//   }
// }

// /**
//  * Thêm breadcrumbs vào sản phẩm
//  * @param product Sản phẩm đã mapped
//  * @param breadcrumbs Mảng breadcrumbs
//  * @returns ProductItem với breadcrumbs
//  */
// export function addBreadcrumbsToProduct(
//   product: CategoryProduct,
//   breadcrumbs: Array<{
//     name: string;
//     slug: string;
//     is_active: boolean | undefined;
//   }> = []
// ): CategoryProduct {
//   return {
//     ...product,
//     breadcrumbs: breadcrumbs.map((item) => ({
//       name: item.name,
//       slug: item.slug,
//       is_active: item.is_active === undefined ? false : item.is_active,
//     })),
//   };
// }

// // Export các kiểu để sử dụng bên ngoài
// export type {
//   CategoryProduct as Product,
//   CategoryWithPivotPro as Category,
//   CategoryBrand as Brand,
//   CategoryOrigin as Origin,
//   CategoryColor as Color,
//   CategorySize as Size,
// };
