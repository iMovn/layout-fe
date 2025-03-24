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
