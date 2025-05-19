//lấy tất cả sản phẩm
export interface ProductResponse {
  status: boolean;
  message: string;
  data: Pagination<Product>;
}

export interface Pagination<T> {
  current_page: number;
  data: T[];
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

export interface PaginationLink {
  url: string | null;
  label: string;
  active: boolean;
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  image: string;
  price: number;
  description: string;
  user_id: number;
  created_at: string;
  image_url: string;
  categories: Category[];
  users: User;
  colors: Color[];
  brands: Brand[];
  sizes: Size[];
  origins: Origin[];
  discount_price?: number;
  stock?: number;
  breadcrumbs?: Array<{ name: string; slug: string; is_active?: boolean }>;
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
