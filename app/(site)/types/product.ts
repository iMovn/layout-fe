export interface ProductBase {
  id: number;
  title: string;
  image: string;
  price: number;
}

export interface ProductType extends ProductBase {
  slug: string;
  brand?: string;
  description: string;
  originalPrice: number;
  salePrice: number;
  discountPercent: number;
  inStock: boolean;
}
export interface CartItem extends ProductBase {
  quantity: number;
}
