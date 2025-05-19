import axios from "axios";
import { ProductResponse } from "../types/detail/products";
import { ProductDetail, RelatedProduct } from "../types/product";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
if (!apiUrl) throw new Error("NEXT_PUBLIC_API_URL chưa được cấu hình!");
const DOMAIN_ID = process.env.NEXT_PUBLIC_DOMAIN_ID;

export async function fetchProductDetailBySlug({
  slug,
  categoryId,
}: {
  slug: string;
  categoryId: number;
}): Promise<ProductDetail | null> {
  try {
    const cleanSlug = slug.replace(/\.html$/, "");

    const res = await axios.get(`${apiUrl}/site/product`, {
      params: {
        slug: cleanSlug,
        category_id: categoryId,
        domain_id: DOMAIN_ID,
      },
    });

    // Kiểm tra status và trả về dữ liệu nếu thành công
    return res.data.data || null;
  } catch (error: unknown) {
    // Kiểm tra xem error có phải là AxiosError không
    if (axios.isAxiosError(error)) {
      if (error.response) {
        if (error.response.status === 404) {
          // Không cần log lỗi 404, đây là trường hợp bình thường khi tìm kiếm
          return null;
        } else if (error.response.status === 422) {
          // Lỗi validate dữ liệu - có thể do thiếu tham số hoặc tham số không hợp lệ
          console.log(
            `[fetchProductDetailBySlug] Lỗi 422: Tham số không hợp lệ - slug: ${slug}, categoryId: ${categoryId}`
          );
          return null;
        }
      }
    }
    console.error(`Lỗi khi lấy chi tiết sản phẩm (${slug}):`, error);
    return null;
  }
}

export const getLatestProducts = async (limit: number = 5) => {
  try {
    const res = await axios.get(
      `${apiUrl}/site/products?limit=${limit}&domain_id=${DOMAIN_ID}`
    );
    return res.data.data;
  } catch {
    return [];
  }
};

/**
 * Fetch danh sách sản phẩm liên quan
 * @param categoryId ID của danh mục để lấy sản phẩm liên quan
 * @param excludeId ID của sản phẩm hiện tại để loại trừ khỏi kết quả
 * @param limit Số lượng sản phẩm tối đa muốn lấy
 * @returns Danh sách sản phẩm liên quan hoặc mảng rỗng nếu không có
 */
// Định nghĩa kiểu cho các cấu trúc dữ liệu từ API
interface ProductListResponse {
  status?: boolean;
  message?: string;
  data?:
    | {
        data?: RelatedProduct[];
        [key: string]: unknown;
      }
    | RelatedProduct[];
  [key: string]: unknown;
}

// Interface cho đối tượng cần tìm kiếm đệ quy
interface RecordWithProducts {
  [key: string]: RelatedProduct[] | RecordWithProducts | unknown;
}

export async function fetchRelatedProducts(
  categoryId: number,
  excludeId: number,
  limit: number = 4
): Promise<RelatedProduct[]> {
  try {
    const res = await axios.get<ProductListResponse>(
      `${apiUrl}/site/products?category_id=${categoryId}&exclude_id=${excludeId}&limit=${limit}&domain_id=${DOMAIN_ID}`
    );
    // Thử xác định cấu trúc dữ liệu mới
    if (
      res.data &&
      res.data.status &&
      res.data.data &&
      typeof res.data.data === "object" &&
      "data" in res.data.data &&
      Array.isArray(res.data.data.data)
    ) {
      return res.data.data.data;
    } else if (res.data && res.data.data && Array.isArray(res.data.data)) {
      return res.data.data;
    } else if (res.data && Array.isArray(res.data)) {
      return res.data as RelatedProduct[];
    } else {
      // Bổ sung kiểm tra cuối cùng - tìm bất kỳ mảng dữ liệu nào trong cấu trúc
      const searchArrays = (
        obj: RecordWithProducts,
        path = ""
      ): RelatedProduct[] | null => {
        if (!obj || typeof obj !== "object") return null;

        for (const key in obj) {
          const currentPath = path ? `${path}.${key}` : key;

          // Kiểm tra nếu giá trị là mảng và chứa các đối tượng có thuộc tính id
          if (
            Array.isArray(obj[key]) &&
            obj[key].length > 0 &&
            typeof (obj[key] as unknown[])[0] === "object" &&
            (obj[key] as unknown[])[0] !== null &&
            "id" in ((obj[key] as unknown[])[0] as object)
          ) {
            return obj[key] as RelatedProduct[];
          }

          // Chỉ đệ quy nếu giá trị là object nhưng không phải array
          if (
            obj[key] &&
            typeof obj[key] === "object" &&
            !Array.isArray(obj[key])
          ) {
            const nested = searchArrays(
              obj[key] as RecordWithProducts,
              currentPath
            );
            if (nested) return nested;
          }
        }

        return null;
      };

      const potentialArray = searchArrays(res.data);
      if (potentialArray) {
        return potentialArray;
      }

      return [];
    }
  } catch (error) {
    console.error(`[fetchRelatedProducts] Lỗi:`, error);
    return [];
  }
}

/**
 * Fetch danh sách sản phẩm nổi bật
 * @param limit Số lượng sản phẩm tối đa muốn lấy
 * @returns Danh sách sản phẩm nổi bật hoặc mảng rỗng nếu không có
 */
export async function fetchFeaturedProducts(
  limit: number = 8
): Promise<ProductDetail[]> {
  try {
    const res = await axios.get(
      `${apiUrl}/site/products?featured=1&limit=${limit}&domain_id=${DOMAIN_ID}`
    );
    return res.data.data || [];
  } catch {
    return [];
  }
}

export const getAllProducts = async (
  page: number = 1,
  limit: number = 10,
  sort_name: "asc" | "desc" = "desc",
  sort_by: string = "created_at"
) => {
  try {
    const response = await axios.get<ProductResponse>(
      `${apiUrl}/site/products`,
      {
        params: {
          page,
          limit,
          sort_name,
          sort_by,
          domain_id: DOMAIN_ID,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};
