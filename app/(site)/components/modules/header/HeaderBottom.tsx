"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AlignRight, ChevronRight } from "lucide-react";
import Image from "next/image";
import Container from "../../common/Container";
import { cn } from "@/lib/utils";
import {
  Brand,
  MainMenuItem,
  ProductCategory,
} from "@/app/(site)/types/header";

const mainMenu: MainMenuItem[] = [
  { label: "Trang chủ", href: "/" },
  { label: "Thương hiệu", href: "/thuong-hieu" },
  { label: "Khuyến mãi", href: "/khuyen-mai" },
  { label: "Sản phẩm mới", href: "/san-pham-moi" },
  { label: "Tin tức", href: "/tin-tuc" },
  { label: "Liên hệ", href: "/lien-he" },
];

const productCategories: ProductCategory[] = [
  {
    name: "Bảo hộ lao động",
    href: "/bao-ho-lao-dong",
    icon: "/icon_img/item-cate.png",
  },
  {
    name: "Dụng cụ pin",
    href: "/dung-cu-pin",
    icon: "/icon_img/item-cate.png",
    children: [
      { name: "Máy chà nhám pin", href: "/dung-cu-pin/may-cha-nham-pin" },
      { name: "Máy cắt pin", href: "/dung-cu-pin/may-cat-pin" },
      { name: "Máy siết bu lông pin", href: "/dung-cu-pin/may-siet-bu-long" },
      { name: "Máy hút bụi pin", href: "/dung-cu-pin/may-hut-bui" },
      { name: "Máy mài pin", href: "/dung-cu-pin/may-mai" },
      { name: "Máy vặn vít pin", href: "/dung-cu-pin/may-van-vit" },
      { name: "Máy vặn vít pin D", href: "/dung-cu-pin/may-van-vitd" },
      { name: "Máy vặn vít pin C", href: "/dung-cu-pin/may-van-vitc" },
    ],
  },
  {
    name: "Dụng cụ điện",
    href: "/dung-cu-dien",
    icon: "/icon_img/item-cate.png",
  },
  {
    name: "Dụng cụ xăng",
    href: "/dung-cu-xang",
    icon: "/icon_img/item-cate.png",
  },
  {
    name: "Dụng cụ cầm tay",
    href: "/dung-cu-cam-tay",
    icon: "/icon_img/item-cate.png",
  },
  {
    name: "Phụ tùng, phụ kiện",
    href: "/phu-tung-phu-kien",
    icon: "/icon_img/item-cate.png",
  },
];

const brandList: Brand[] = [
  { id: 1, name: "Makita", slug: "makita" },
  { id: 2, name: "Bosch", slug: "bosch" },
  { id: 3, name: "Dewalt", slug: "dewalt" },
  { id: 4, name: "Milwaukee", slug: "milwaukee" },
  { id: 5, name: "Total", slug: "total" },
  { id: 6, name: "Stanley", slug: "stanley" },
];

export default function HeaderBottom() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const pathname = usePathname();

  const handleMouseEnterCategory = () =>
    pathname !== "/" && setShowDropdown(true);
  const handleMouseLeaveCategory = () =>
    pathname !== "/" && (setShowDropdown(false), setHoveredCategory(null));

  const renderCategoryDropdown = () => (
    <div
      className={cn(
        "absolute top-full left-0 w-[262px] bg-white shadow-lg text-black transition-all duration-300 transform",
        pathname === "/" ? "h-[426px]" : "h-[426px]"
      )}
    >
      <ul className="divide-y divide-dashed divide-gray-200">
        {productCategories.map((cat, idx) => {
          const hasChildren = !!cat.children?.length;
          const isHovered = hoveredCategory === cat.name;

          return (
            <li
              key={idx}
              className="relative group"
              onMouseEnter={() => hasChildren && setHoveredCategory(cat.name)}
              onMouseLeave={() => hasChildren && setHoveredCategory(null)}
            >
              <div className="flex items-center text-body-sm-600 font-semibold px-4 py-2 gap-3 hover:bg-primary_custom transition cursor-pointer">
                <Image
                  src={cat.icon}
                  alt={cat.name}
                  width={7}
                  height={7}
                  loading="lazy"
                  className="object-contain pt-1"
                />
                <Link href={cat.href} className="flex-1">
                  {cat.name}
                </Link>
                {hasChildren && (
                  <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-black" />
                )}
              </div>
              {hasChildren && isHovered && (
                <div className="absolute left-full -top-full bg-white shadow-lg z-50 w-[630px] h-[426px] px-4 py-3 grid grid-cols-3 grid-rows-12 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 pointer-events-none group-hover:pointer-events-auto transition-all duration-300 ease-in-out normal-case">
                  {cat.children?.map((child, childIdx) => (
                    <Link
                      key={childIdx}
                      href={child.href}
                      className="text-[15px] hover:text-primary-500 h-0"
                    >
                      {child.name}
                    </Link>
                  ))}
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );

  const renderBrandDropdown = () => (
    <div className="absolute top-full left-0 w-48 bg-white shadow-md text-black z-40 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-2 pointer-events-none group-hover:pointer-events-auto transition-all duration-300">
      <ul className="divide-y divide-dashed divide-gray-200 py-1">
        {brandList.map((brand) => (
          <li key={brand.id}>
            <Link
              href={`/thuong-hieu/${brand.slug}`}
              className="block px-4 py-2 text-body-sm-600 font-semibold hover:bg-primary_custom transition"
            >
              {brand.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <section className="ms:flex hidden bg-gradient-to-r from-success-600 to-secondary-700">
      <Container>
        <nav className="flex items-stretch h-12 text-white font-semibold text-sm uppercase relative z-50">
          <div
            className="relative group flex items-center bg-black pl-1 pr-6 cursor-pointer hover:bg-lime-400 transition"
            onMouseEnter={handleMouseEnterCategory}
            onMouseLeave={handleMouseLeaveCategory}
          >
            <div className="flex items-center space-x-4">
              <div className="bg-primary_custom p-2 rounded-sm">
                <AlignRight className="text-black" />
              </div>
              <span className="text-body-md-600 font-bold group-hover:text-warning-300 text-primary_custom">
                DANH MỤC SẢN PHẨM
              </span>
            </div>
            {(showDropdown || pathname === "/") && renderCategoryDropdown()}
          </div>
          <ul className="flex items-stretch h-full">
            {mainMenu.map((item, index) => {
              const isBrand = item.label === "Thương hiệu";
              return (
                <li
                  key={index}
                  className="px-[2px] relative h-full flex items-center before:absolute after:absolute before:top-4 after:bottom-4 before:right-0 after:right-0 before:w-px after:w-px before:h-3 after:h-3 before:bg-[#40A5A7] after:bg-[#34A0A2] last:before:hidden last:after:hidden"
                >
                  {isBrand ? (
                    <div className="relative group h-full flex items-center px-9 font-normal hover:bg-primary_custom hover:text-black transition">
                      <span className="cursor-pointer">{item.label}</span>
                      {renderBrandDropdown()}
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className={cn(
                        "h-full flex items-center px-9 transition font-normal",
                        pathname === item.href
                          ? "bg-primary_custom text-black"
                          : "hover:bg-primary_custom hover:text-black"
                      )}
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>
      </Container>
    </section>
  );
}
