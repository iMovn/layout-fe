import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatCurrency = (value: number): string =>
  value.toLocaleString("vi-VN") + "đ";

export function getDiscountPercent(
  price: number | null | undefined,
  originalPrice: number | null | undefined
): number {
  if (!price || !originalPrice || originalPrice <= price) return 0;
  return Math.round(((originalPrice - price) / originalPrice) * 100);
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("vi-VN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function insertTocToContent(content: string, toc: string): string {
  if (!toc) return content;

  const tocWithTitle = `
      <div class="toc mb-6">
        <strong class="block text-base font-semibold text-gray-800 mb-2">📚 Mục Lục Bài Viết</strong>
        ${toc}
      </div>
    `;

  // Chèn TOC vào trước thẻ heading đầu tiên (h1-h6)
  const headingRegex = /<(h[1-6])[^>]*>/i;
  const match = content.match(headingRegex);

  if (match) {
    const index = content.indexOf(match[0]);
    return content.slice(0, index) + tocWithTitle + content.slice(index);
  }

  // Nếu không có heading thì thêm TOC đầu bài
  return tocWithTitle + content;
}
