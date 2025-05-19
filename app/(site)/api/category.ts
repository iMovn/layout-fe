import axios from "axios";
import { Category, CategoryWithPosts } from "../types/category/post";
import { CategoryData, CategoryResponse } from "../types/category/product";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
if (!apiUrl) throw new Error("NEXT_PUBLIC_API_URL chưa được cấu hình!");
const DOMAIN_ID = process.env.NEXT_PUBLIC_DOMAIN_ID;

// Lấy toàn bộ danh mục (type=post)
export async function fetchAllCategories(): Promise<Category[]> {
  const response = await axios.get(
    `${apiUrl}/site/category?type=post&domain_id=${DOMAIN_ID}`
  );
  return response.data.data.categories || [];
}

// Lấy danh mục theo slug post
export async function fetchCategoryBySlug(
  slug: string,
  page: number = 1
): Promise<CategoryWithPosts | null> {
  try {
    const res = await axios.get(
      `${apiUrl}/site/category?type=post&slug=${slug}&page=${page}&domain_id=${DOMAIN_ID}`
    );
    return res.data.data;
  } catch {
    return null;
  }
}

// Lấy toàn bộ danh mục (type=product)
export async function fetchAllProductCategories(): Promise<Category[]> {
  try {
    const response = await axios.get<{
      status: boolean;
      message: string;
      data: {
        categories: Category[];
      };
    }>(`${apiUrl}/site/category?type=product&domain_id=${DOMAIN_ID}`);

    // Kiểm tra cấu trúc data
    if (
      response.data.status &&
      response.data.data &&
      response.data.data.categories
    ) {
      return response.data.data.categories;
    } else {
      return [];
    }
  } catch (error) {
    console.error("[fetchAllProductCategories] Lỗi:", error);
    return [];
  }
}

// Lấy danh mục theo slug pro
export async function fetchProductCategoryBySlug(
  slug: string,
  page: number = 1
): Promise<CategoryResponse | null> {
  try {
    const res = await axios.get<CategoryResponse>(
      `${apiUrl}/site/category?type=product&slug=${slug}&page=${page}&domain_id=${DOMAIN_ID}`
    );
    return res.data; // Trả về toàn bộ response theo đúng CategoryResponse
  } catch {
    return null;
  }
}

export async function fetchProductCategoryPage({
  slug,
  page = 1,
}: {
  slug: string;
  page?: number;
}): Promise<CategoryData | null> {
  try {
    const response = await axios.get<{
      status: boolean;
      message: string;
      data: CategoryData;
    }>(
      `${apiUrl}/site/product/category?slug=${slug}&page=${page}&domain_id=${DOMAIN_ID}`
    );
    return response.data.data || null;
  } catch (error) {
    console.error("Error fetching product category page:", error);
    return null;
  }
}
