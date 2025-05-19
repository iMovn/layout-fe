import { MenuItem } from "../types/header";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
if (!apiUrl) throw new Error("NEXT_PUBLIC_API_URL chưa được cấu hình!");
const DOMAIN_ID = process.env.NEXT_PUBLIC_DOMAIN_ID;

// API Menu Bottom
export async function fetchMenu(): Promise<MenuItem[]> {
  try {
    const res = await fetch(
      `${apiUrl}/site/menu?type=main&domain_id=${DOMAIN_ID}`
    );
    if (!res.ok) throw new Error("Lỗi khi lấy menu");

    const { data } = await res.json();
    return data as MenuItem[]; // Ép kiểu dữ liệu về MenuItem[]
  } catch (error) {
    console.error("Lỗi API Menu:", error);
    return []; // Trả về mảng rỗng nếu lỗi
  }
}

// API Menu Categories Product
export async function fetchVerticalMenu(): Promise<MenuItem[]> {
  try {
    const res = await fetch(
      `${apiUrl}/site/menu?type=vertical&domain_id=${DOMAIN_ID}`
    );
    if (!res.ok) throw new Error("Lỗi khi lấy menu dọc");

    const { data } = await res.json();
    return data as MenuItem[]; // Ép kiểu dữ liệu về MenuItem[]
  } catch (error) {
    console.error("Lỗi API Menu Dọc:", error);
    return []; // Trả về mảng rỗng nếu lỗi
  }
}
