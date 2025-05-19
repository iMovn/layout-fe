"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { MenuItem } from "@/app/(site)/types/header";
import { fetchMenu } from "@/app/(site)/api/menu";
import { usePathname } from "next/navigation";

export default function MobileMenuSlide() {
  const [isOpen, setIsOpen] = useState(false);
  const [history, setHistory] = useState<MenuItem[][]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();

  // Fetch menu data
  useEffect(() => {
    async function loadMenu() {
      try {
        setIsLoading(true);
        const data = await fetchMenu();
        setMenuItems(data);
        setHistory([data]);
      } catch (error) {
        console.error("Error loading menu:", error);
      } finally {
        setIsLoading(false);
      }
    }
    loadMenu();
  }, []);

  // Event listener for toggle
  useEffect(() => {
    const handleToggle = () => setIsOpen((prev) => !prev);
    window.addEventListener("toggle-menu", handleToggle);
    return () => window.removeEventListener("toggle-menu", handleToggle);
  }, []);

  const currentMenu = history[history.length - 1] || [];

  const handleNext = (item: MenuItem) => {
    if (item.children?.length) {
      setHistory((prev) => [...prev, item.children]);
    }
  };

  const handleBack = () => {
    if (history.length > 1) {
      setHistory((prev) => prev.slice(0, -1));
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(() => {
      setHistory([menuItems]);
    }, 300);
  };

  const findParentName = () => {
    if (history.length < 2) return "Menu";
    const parentLevel = history[history.length - 2];
    const parentItem = parentLevel.find(
      (item) => item.children === currentMenu
    );
    return parentItem?.name || "Quay lại";
  };

  // Hàm kiểm tra active state
  const isItemActive = (item: MenuItem) => {
    if (!item.link) return false;

    const currentPath = pathname.replace(/\/$/, "");
    const itemPath = item.link.replace(/\/$/, "");

    // Kiểm tra exact match
    if (currentPath === itemPath || currentPath === `/${itemPath}`) return true;

    // Kiểm tra các children (nếu có)
    if (item.children) {
      return item.children.some((child) => {
        const childPath = child.link?.replace(/\/$/, "") || "";
        return currentPath === childPath || currentPath === `/${childPath}`;
      });
    }

    return false;
  };

  if (isLoading) return null;

  return (
    <div
      className={clsx(
        "fixed inset-0 z-[1000] transition-transform duration-300 ease-in-out",
        isOpen ? "translate-x-0" : "-translate-x-full pointer-events-none"
      )}
    >
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50 transition-opacity duration-300"
        onClick={handleClose}
      />

      {/* Slide Menu */}
      <div className="relative bg-white w-4/5 h-full p-4 overflow-y-auto flex flex-col">
        {/* Header */}
        <div className="border-b border-gray-200 pb-4 mb-4">
          {history.length > 1 ? (
            <button
              onClick={handleBack}
              className="flex items-center gap-2 text-primary-600 font-bold w-full"
            >
              <ChevronLeft className="w-5 h-5" />
              <span className="text-lg uppercase">{findParentName()}</span>
            </button>
          ) : (
            <h2 className="text-lg font-bold text-center uppercase text-primary-600">
              {findParentName()}
            </h2>
          )}
        </div>

        {/* Menu Items */}
        <ul className="flex-1 divide-y divide-dashed divide-gray-100">
          {currentMenu.length > 0 ? (
            currentMenu.map((item) => {
              const active = isItemActive(item);
              return (
                <li key={item.id} className="group">
                  <div className="flex items-center justify-between py-3">
                    <Link
                      href={item.link || "#"}
                      onClick={item.children?.length ? undefined : handleClose}
                      className={clsx(
                        "flex-1 flex items-center gap-3",
                        active
                          ? "text-primary-600 font-semibold"
                          : "text-gray-800 hover:text-primary-500 font-medium"
                      )}
                    >
                      {item.icon && (
                        <Image
                          src={item.icon}
                          alt={item.name}
                          width={24}
                          height={24}
                          className="w-6 h-6 object-contain"
                        />
                      )}
                      <span>{item.name}</span>
                    </Link>
                    {item.children?.length > 0 && (
                      <button
                        onClick={() => handleNext(item)}
                        className={clsx(
                          "p-1",
                          active
                            ? "text-primary-500"
                            : "text-gray-400 group-hover:text-primary-500"
                        )}
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                </li>
              );
            })
          ) : (
            <li className="py-4 text-center text-gray-500">Không có mục nào</li>
          )}
        </ul>

        {/* Footer */}
        <div className="pt-4 border-t border-gray-200">
          <button
            onClick={handleClose}
            className="w-full py-2 text-center text-gray-500 hover:text-primary-500"
          >
            Đóng menu
          </button>
        </div>
      </div>
    </div>
  );
}
