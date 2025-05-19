// ProductDetailResponse.ts
export interface ProductDetailResponse {
  status: boolean;
  message: string;
  data: ProductDetail;
}

export interface ProductDetail {
  id: number;
  name: string;
  slug: string;
  price: number;
  discount_price: number;
  stock: number | null;
  description: string;
  content: string;
  specifications: string;
  views: number;
  favorites: number;
  image: string;
  image_url: string;
  status: number;
  user_id: number;
  domain_id: number;
  created_at: string;
  updated_at: string;
  meta_title: string | null;
  meta_description: string | null;
  canonical: string | null;
  toc: string;

  // Relationships
  related_products: RelatedProduct[];
  breadcrumbs: Breadcrumb[];
  categories: Category[];
  users: User;
  colors: Color[];
  brands: Brand[];
  sizes: Size[];
  origins: Origin[];
}

export interface RelatedProduct {
  id: number;
  name: string;
  slug: string;
  image: string;
  price: number;
  discount_price: number;
  stock: number | null;
  description: string;
  created_at: string;
  image_url: string;
  categories: Category[];
  brands: Brand[];
}

export interface Breadcrumb {
  name: string;
  slug: string;
  is_active: boolean;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  pivot: {
    product_id: number;
    category_id: number;
  };
}

export interface User {
  id: number;
  name: string;
  email: string;
}

export interface Color {
  id: number;
  name: string;
  pivot: {
    product_id: number;
    color_id: number;
  };
}

export interface Brand {
  id: number;
  name: string;
  pivot: {
    product_id: number;
    brand_id: number;
  };
}

export interface Size {
  id: number;
  name: string;
  pivot: {
    product_id: number;
    size_id: number;
  };
}

export interface Origin {
  id: number;
  name: string;
  pivot: {
    product_id: number;
    origin_id: number;
  };
}
