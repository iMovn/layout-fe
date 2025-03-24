// ===========================
// Type sản phẩm khuyến mãi
// ===========================
export type AttributeValue = {
  name: string;
  price?: number;
  image?: string;
};
export type ProductType = {
  id: number;
  name: string;
  slug: string;
  image: string;
  description?: string;
  rating: number; // 0 -> 5
  attributes?: {
    [key: string]: AttributeValue[];
  };
  brand?: string;
  price: number;
  originalPrice: number;
  inStock?: boolean;
};
