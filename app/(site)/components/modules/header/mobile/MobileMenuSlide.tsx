"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { MenuItem } from "@/app/(site)/types/header";

const menus: MenuItem[] = [
  { title: "Trang chủ", slug: "/", icon: "/icon_img/icon-mm5.png" },
  {
    title: "Sản phẩm",
    slug: "/san-pham",
    icon: "/icon_img/icon-mm7.png",
    children: [
      { title: "Bảo hộ lao động", slug: "/bao-ho-lao-dong" },
      {
        title: "Dụng cụ Pin",
        slug: "/dung-cu-pin",
        children: [
          { title: "Máy chà nhám pin", slug: "/may-cha-nham-pin" },
          { title: "Máy hút bụi pin", slug: "/may-hut-bui-pin" },
          { title: "Máy làm vườn pin", slug: "/may-lam-vuon-pin" },
        ],
      },
      { title: "Dụng cụ Điện", slug: "/dung-cu-dien" },
      { title: "Dụng cụ xăng", slug: "/dung-cu-xang" },
      { title: "Dụng cụ cầm tay", slug: "/dung-cu-cam-tay" },
      { title: "Phụ tùng phụ kiện", slug: "/phu-tung-phu-kien" },
    ],
  },
  {
    title: "Thương hiệu",
    slug: "/thuong-hieu",
    icon: "/icon_img/icon-mm1.png",
    children: [
      {
        title: "Makita",
        slug: "/thuong-hieu/makita",
        icon: "/brands/br4.png",
      },
      { title: "Bosch", slug: "/thuong-hieu/bosch", icon: "/brands/br2.png" },
      {
        title: "Dewalt",
        slug: "/thuong-hieu/dewalt",
        icon: "/brands/br3.png",
      },
    ],
  },
  { title: "Khuyến mãi", slug: "/khuyen-mai", icon: "/icon_img/icon-mm2.png" },
  {
    title: "Sản phẩm mới",
    slug: "/san-pham-moi",
    icon: "/icon_img/icon-mm4.png",
  },
  { title: "Tin tức", slug: "/tin-tuc", icon: "/icon_img/icon-mm3.png" },
  { title: "Liên hệ", slug: "/lien-he", icon: "/icon_img/icon-mm6.png" },
];

export default function MobileMenuSlide() {
  const [isOpen, setIsOpen] = useState(false);
  const [history, setHistory] = useState<MenuItem[][]>([menus]);

  useEffect(() => {
    const toggle = () => setIsOpen((prev) => !prev);
    window.addEventListener("toggle-menu", toggle);
    return () => window.removeEventListener("toggle-menu", toggle);
  }, []);

  const currentMenu = history[history.length - 1];

  const handleNext = (item: MenuItem) => {
    if (item.children) {
      setHistory((prev) => [...prev, item.children!]);
    }
  };

  const handleBack = () => {
    if (history.length > 1) {
      setHistory((prev) => prev.slice(0, -1));
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setHistory([menus]);
  };

  const findParentTitle = () => {
    if (history.length < 2) return "";
    const parentLevel = history[history.length - 2];
    const currentLevel = history[history.length - 1];

    for (const item of parentLevel) {
      if (item.children === currentLevel) {
        return item.title;
      }
    }
    return "";
  };

  return (
    <div
      className={clsx(
        "fixed inset-0 z-[100] transition-transform duration-300",
        isOpen ? "translate-x-0" : "-translate-x-full pointer-events-none"
      )}
    >
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={handleClose}
      />

      {/* Slide Menu */}
      <div className="relative bg-white w-[75%] h-full p-4 overflow-y-auto">
        {history.length === 1 && (
          <div className="flex justify-center mb-4">
            <p className="uppercase text-body-md-600 font-bold text-primary-600">
              Menu
            </p>
          </div>
        )}
        {history.length > 1 && (
          <button
            onClick={handleBack}
            className="flex items-center justify-center mb-4 text-primary relative w-full"
          >
            <ChevronLeft className="absolute left-0 w-4 h-4" />
            <span className="text-body-md-600 font-bold uppercase text-primary-600">
              {findParentTitle()}
            </span>
          </button>
        )}

        <ul className="mt-5 divide-y divide-dashed divide-gray-200">
          {currentMenu.map((item, index) => (
            <li key={index} className="flex items-center justify-between py-3">
              <Link
                href={item.slug}
                onClick={handleClose}
                className="flex items-center gap-2 text-sm font-medium text-gray-800 hover:text-primary"
              >
                {item.icon && (
                  <Image
                    src={item.icon}
                    alt={item.title}
                    width={24}
                    height={24}
                    className="w-6 h-6 object-contain"
                  />
                )}
                <span>{item.title}</span>
              </Link>
              {item.children && (
                <button
                  onClick={() => handleNext(item)}
                  className="text-gray-500 hover:text-primary"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
