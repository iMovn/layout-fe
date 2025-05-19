// CategoryResponse.ts
export interface CategoryResponse {
  status: boolean;
  message: string;
  data: CategoryData;
}

export interface CategoryData {
  details: CategoryDetail;
  breadcrumbs: Breadcrumb[];
  items: PaginatedProducts;
  categories: Category[];
}

export interface CategoryDetail {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  content: string;
  meta_title: string | null;
  meta_description: string | null;
  canonical?: string | null;
  is_active: number;
  parent_id: number | null;
  children: CategoryChild[];
}

export interface CategoryChild {
  id: number;
  name: string;
  slug: string;
  is_active: number;
  parent_id: number | null;
  children: CategoryChild[];
}

export interface Breadcrumb {
  name: string;
  slug: string;
  is_active: boolean;
}

export interface PaginatedProducts {
  current_page: number;
  data: ProductItem[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: PaginationLink[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

export interface ProductItem {
  id: number;
  name: string;
  slug: string;
  price: number;
  image: string;
  discount_price: number;
  stock: number | null;
  description: string;
  user_id: number;
  created_at: string;
  image_url: string;
  categories: ProductCategory[];
  brands: ProductBrand[];
  origins: ProductOrigin[];
  colors: ProductAttribute[];
  sizes: ProductAttribute[];
  users: ProductUser;
}

export interface ProductCategory {
  id: number;
  name: string;
  pivot: {
    product_id: number;
    category_id: number;
  };
}

export interface ProductBrand {
  id: number;
  name: string;
  pivot: {
    product_id: number;
    brand_id: number;
  };
}

export interface ProductOrigin {
  id: number;
  name: string;
  pivot: {
    product_id: number;
    origin_id: number;
  };
}

export interface ProductAttribute {
  id?: number;
  name?: string;
  pivot?: {
    product_id: number;
    [key: string]: number;
  };
}

export interface ProductUser {
  id: number;
  name: string;
}

export interface PaginationLink {
  url: string | null;
  label: string;
  active: boolean;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  is_active: number;
  parent_id: number | null;
  children: CategoryChild[];
}
