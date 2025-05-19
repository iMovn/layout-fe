"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AlignRight, ChevronRight } from "lucide-react";
import Container from "../../common/Container";
import { cn } from "@/lib/utils";
import { fetchMenu, fetchVerticalMenu } from "@/app/(site)/api/menu";
import { MenuItem } from "@/app/(site)/types/header";

// Utility function để đảm bảo URL là đường dẫn tuyệt đối và đúng định dạng
function ensureAbsolutePath(path: string): string {
  if (!path) return "/";

  // Nếu đã bắt đầu bằng /, trả về nguyên bản
  if (path.startsWith("/")) return path;

  // Nếu không, thêm / vào đầu
  return `/${path}`;
}

export default function HeaderBottom() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [menuCateProItems, setCateProItems] = useState<MenuItem[]>([]);
  const pathname = usePathname();
  const normalizePath = (path: string) => path.replace(/\/$/, "").toLowerCase();

  // Fetch menu bottom data
  useEffect(() => {
    async function loadMenu() {
      try {
        const data = await fetchMenu();
        setMenuItems(data);
      } catch (error) {
        console.error("Error loading menu:", error);
      }
    }
    loadMenu();
  }, []);
  //end fetch menu bottom data

  //Fetch  category data
  useEffect(() => {
    async function loadListCateProNav() {
      try {
        const dataCatePro = await fetchVerticalMenu();
        setCateProItems(dataCatePro);
      } catch (error) {
        console.error("Error loading menu:", error);
      }
    }
    loadListCateProNav();
  }, []);

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
      <div className="relative h-full">
        <ul className="divide-y divide-dashed divide-gray-200">
          {menuCateProItems.map((item) => {
            const hasChildren = !!item.children?.length;
            const isHovered = hoveredCategory === item.name;

            // Đảm bảo đường dẫn là tuyệt đối
            const itemLink = ensureAbsolutePath(item.link);

            return (
              <li
                key={item.id}
                className="group py-1"
                onMouseEnter={() =>
                  hasChildren && setHoveredCategory(item.name)
                }
                onMouseLeave={() => hasChildren && setHoveredCategory(null)}
              >
                <div className="flex items-center text-body-sm-600 font-semibold px-4 py-2 gap-3 hover:bg-primary_custom transition cursor-pointer">
                  <Link href={itemLink} className="flex-1">
                    {item.name}
                  </Link>
                  {hasChildren && (
                    <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-black" />
                  )}
                </div>
                {hasChildren && isHovered && (
                  <div className="absolute left-full top-0 bg-white shadow-lg z-50 w-[630px] h-[426px] px-4 py-3 grid grid-cols-3 grid-rows-12 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 pointer-events-none group-hover:pointer-events-auto transition-all duration-300 ease-in-out normal-case">
                    {item.children.map((child) => {
                      // Đảm bảo đường dẫn con cũng là tuyệt đối
                      const childLink = ensureAbsolutePath(child.link);

                      return (
                        <Link
                          key={child.id}
                          href={childLink}
                          className="text-[15px] hover:text-primary-500 h-0"
                        >
                          {child.name}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );

  const renderDropdown = (menuItem: MenuItem) => {
    if (!menuItem.children || menuItem.children.length === 0) return null;
    return (
      <div className="absolute top-full left-0 w-56 bg-white shadow-md text-black z-40 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-2 pointer-events-none group-hover:pointer-events-auto transition-all duration-300">
        <ul className="divide-y divide-dashed divide-gray-200 py-1">
          {menuItem.children.map((child) => {
            // Đảm bảo đường dẫn là tuyệt đối
            const childLink = ensureAbsolutePath(child.link);

            return (
              <li key={child.id}>
                <Link
                  href={childLink}
                  className="block px-4 py-2 text-body-sm-600 font-semibold hover:bg-primary_custom transition"
                >
                  {child.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    );
  };

  return (
    <section className="ms:flex hidden bg-gradient-to-r from-success-600 to-secondary-700">
      <Container>
        <nav className="flex items-stretch h-12 text-white font-semibold text-sm uppercase relative z-50">
          <div
            className="relative group flex items-center bg-black pl-1 pr-6 hover:bg-lime-400 transition"
            onMouseEnter={handleMouseEnterCategory}
            onMouseLeave={handleMouseLeaveCategory}
          >
            <div className="flex items-center space-x-4">
              <Link href="/san-pham" className="flex items-center gap-2">
                <div className="bg-primary_custom p-2 rounded-sm">
                  <AlignRight className="text-black" />
                </div>
                <span className="text-body-md-600 font-bold group-hover:text-warning-300 text-primary_custom">
                  DANH MỤC SẢN PHẨM
                </span>
              </Link>
            </div>
            {(showDropdown || pathname === "/") && renderCategoryDropdown()}
          </div>
          <ul className="flex items-stretch h-full">
            {menuItems.map((item) => {
              const hasChildren = item.children && item.children.length > 0;
              // Đảm bảo đường dẫn là tuyệt đối
              const itemLink = ensureAbsolutePath(item.link);
              const isActive =
                normalizePath(pathname) === normalizePath(itemLink) ||
                normalizePath(pathname) === normalizePath(item.link);

              return (
                <li
                  key={item.id}
                  className="px-[2px] relative h-full flex items-center before:absolute after:absolute before:top-4 after:bottom-4 before:right-0 after:right-0 before:w-px after:w-px before:h-3 after:h-3 before:bg-[#40A5A7] after:bg-[#34A0A2] last:before:hidden last:after:hidden"
                >
                  {hasChildren ? (
                    <div className="relative group h-full flex items-center">
                      <Link
                        href={itemLink}
                        className={cn(
                          "px-9 h-full flex items-center font-medium text-body-sm-500 hover:bg-primary_custom hover:text-black transition",
                          isActive ? "bg-primary_custom text-black" : ""
                        )}
                      >
                        {item.name}
                      </Link>
                      {renderDropdown(item)}
                    </div>
                  ) : (
                    <Link
                      href={itemLink}
                      className={cn(
                        "h-full flex items-center px-9 transition font-medium text-body-sm-500",
                        isActive
                          ? "bg-primary_custom text-black"
                          : "hover:bg-primary_custom hover:text-black"
                      )}
                    >
                      {item.name}
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
