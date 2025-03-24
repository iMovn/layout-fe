export interface ProductSellerType {
  id: number;
  image: string;
  brand: string;
  title: string;
  slug: string;
  description: string;
  originalPrice: number;
  salePrice: number;
  discountPercent: number;
  inStock: boolean;
}
