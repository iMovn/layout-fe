"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useBodyClass } from "../../context/BodyClassContext";

export default function BodyClassManager() {
  const pathname = usePathname();
  const { type, id } = useBodyClass();

  useEffect(() => {
    const body = document.body;
    body.className = ""; // Reset trước

    // 1. Class cơ bản theo URL
    if (pathname === "/") {
      body.classList.add("home-page");
    } else if (pathname.endsWith(".html")) {
      body.classList.add("post-page");
    } else if (pathname.startsWith("/gioi-thieu")) {
      body.classList.add("about-page");
    } else if (pathname.startsWith("/tin-tuc")) {
      body.classList.add("blogdf-page");
    } else if (pathname.startsWith("/lien-he")) {
      body.classList.add("contact-page");
    } else {
      body.classList.add("category-page");
    }

    // 2. Class theo loại nội dung đặc biệt
    if (pathname.includes("/san-pham")) {
      body.classList.add("product-page");
    }
    if (pathname.includes("/dich-vu")) {
      body.classList.add("service-page");
    }

    // 3. Gắn class theo type + id (nếu có trong context)
    if (type && id) {
      body.classList.add(`${type}-id-${id}`); // ví dụ: post-id-123
    }

    // 4. Phân biệt loại bài viết (nếu cần)
    const postTypes = ["post", "blog", "article"];
    if (type && postTypes.includes(type)) {
      body.classList.add(`${type}-type`); // ví dụ: blog-type
    }

    // 5. Gắn class theo slug (tùy chọn)
    const slug = pathname.split("/").pop()?.replace(".html", "");
    if (slug) {
      body.classList.add(`slug-${slug}`); // ví dụ: slug-gioi-thieu
    }

    return () => {
      body.className = ""; // Cleanup
    };
  }, [pathname, type, id]);

  return null;
}
