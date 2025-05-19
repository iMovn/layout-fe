import axios from "axios";
import { PostType } from "../types/detail/post";
import { LatestPost } from "../types/detail/latestPost";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
if (!apiUrl) throw new Error("NEXT_PUBLIC_API_URL chưa được cấu hình!");
const DOMAIN_ID = process.env.NEXT_PUBLIC_DOMAIN_ID;

export async function fetchAllData() {
  try {
    const res = await axios.get(
      `${apiUrl}/site/category?type=post&domain_id=${DOMAIN_ID}`
    );
    return {
      categories: res.data.data.categories,
      posts: res.data.data.items.data,
    };
  } catch (err) {
    console.error("Lỗi fetch dữ liệu:", err);
    return {
      categories: [],
      posts: [],
    };
  }
}

export async function fetchPost(
  slug: string,
  categoryId: number
): Promise<PostType | null> {
  try {
    const cleanSlug = slug.replace(/\.html$/, "");
    const res = await axios.get(
      `${apiUrl}/site/post?slug=${cleanSlug}&category_id=${categoryId}&domain_id=${DOMAIN_ID}`
    );
    return res.data.data || null;
  } catch {
    return null;
  }
}

export async function getLatestPosts(limit: number = 9): Promise<LatestPost[]> {
  try {
    const res = await axios.get(
      `${apiUrl}/site/posts?limit=${limit}&domain_id=${DOMAIN_ID}`
    );
    return res.data?.data?.data || []; // chú ý `data.data` do cấu trúc API
  } catch (error) {
    console.error("Lỗi khi lấy bài viết mới nhất:", error);
    return [];
  }
}

// export async function fetchAllPost(page = 1): Promise<Pagination<PostType>> {
//   const res = await axios.get(
//     `${apiUrl}/site/posts?sort_name=desc&sort_by=created_at&page=${page}&domain_id=${DOMAIN_ID}&limit=12`
//   );
//   return res.data.data;
// }
