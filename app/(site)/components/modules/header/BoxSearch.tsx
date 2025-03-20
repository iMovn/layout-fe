"use client";

import React, { useEffect, useState } from "react";
import { Search } from "lucide-react";

export default function BoxSearch() {
  const fullText = "Nhập từ khóa...";
  const [placeholder, setPlaceholder] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const typingSpeed = 100;
    const deletingSpeed = 50;
    const pauseAfterTyping = 1500;
    const pauseAfterDeleting = 500;

    let timeoutId: NodeJS.Timeout;

    if (!isDeleting && index <= fullText.length) {
      // Đang gõ
      timeoutId = setTimeout(() => {
        setPlaceholder(fullText.substring(0, index));
        setIndex(index + 1);
      }, typingSpeed);
    } else if (!isDeleting && index > fullText.length) {
      // Gõ xong thì tạm dừng trước khi xoá
      timeoutId = setTimeout(() => {
        setIsDeleting(true);
        setIndex(index - 1);
      }, pauseAfterTyping);
    } else if (isDeleting && index >= 0) {
      // Đang xoá
      timeoutId = setTimeout(() => {
        setPlaceholder(fullText.substring(0, index));
        setIndex(index - 1);
      }, deletingSpeed);
    } else if (isDeleting && index < 0) {
      // Xoá xong thì tạm dừng rồi gõ lại
      timeoutId = setTimeout(() => {
        setIsDeleting(false);
        setIndex(1);
      }, pauseAfterDeleting);
    }

    return () => clearTimeout(timeoutId);
  }, [index, isDeleting]);

  return (
    <div className="relative w-[220px] ms:w-[316px]">
      <input
        type="text"
        placeholder={placeholder}
        className="w-full px-4 py-2 pr-10 rounded-full text-body-sm-400 text-black outline-none"
      />
      <div className="absolute right-3 top-1/2 -translate-y-1/2 text-black cursor-pointer hover:text-primary-600">
        <Search size={18} />
      </div>
    </div>
  );
}
