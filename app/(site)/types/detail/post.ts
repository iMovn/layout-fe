import { Breadcrumb } from "../common/Breadcrumb";

export interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
  pivot: {
    post_id: number;
    category_id: number;
  };
}

export interface RelatedPost {
  id: number;
  name: string;
  slug: string;
  image?: string;
  image_url?: string;
  created_at: string;
  updated_at?: string;
  status?: number;
  user_id?: number;
  categories?: Category[];
}

export interface PostUser {
  id: number;
  name: string;
  email?: string;
}

export interface PostType {
  id: number;
  name: string;
  slug: string;
  description?: string;
  content: string;
  image?: string;
  video?: string;
  image_url?: string;
  created_at: string;
  updated_at?: string;
  status?: number;
  user_id?: number;
  toc?: string;
  users?: PostUser;
  breadcrumbs: Breadcrumb[];
  related_posts?: RelatedPost[];
  categories: Category[];
  meta_title?: string;
  meta_description?: string;
  canonical?: string;
}
