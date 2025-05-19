// components/common/Breadcrumbs.tsx
import React from "react";
import Link from "next/link";
import { Breadcrumb } from "../../types/common/Breadcrumb";
import Container from "../common/Container";

interface BreadcrumbsProps {
  items: Breadcrumb[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  if (!items || items.length === 0) return null;

  return (
    <div className="overflow-hidden bg-gray-100">
      <Container className="py-3 ms:py-4">
        <nav className="flex items-center text-body-sm-500">
          {items.map((breadcrumb, index) => (
            <span
              key={index} // Sử dụng index thay vì breadcrumb.slug để tránh trùng lặp
              className="flex items-center text-gray-700"
            >
              <Link
                href={breadcrumb.slug === "/" ? "/" : `/${breadcrumb.slug}`} // Xử lý đặc biệt cho slug "/"
                className={`text-gray-800 ${
                  breadcrumb.is_active
                    ? "last:text-gray-600"
                    : "hover:text-primary-500"
                }`}
              >
                {breadcrumb.name}
              </Link>
              {index < items.length - 1 && <span className="mx-2">/</span>}
            </span>
          ))}
        </nav>
      </Container>
    </div>
  );
}
