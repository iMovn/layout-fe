// ===========================
// Type sản phẩm khuyến mãi
// ===========================
export type ProductType = {
  id: number;
  name: string;
  slug: string;
  image: string;
  description?: string;
  rating: number; // 0 -> 5
  attributes?: {
    [key: string]: {
      name: string;
      price?: number;
      image?: string;
    }[];
  };
  brand?: string;
  price?: number;
  originalPrice?: number;
  inStock?: boolean;
};
