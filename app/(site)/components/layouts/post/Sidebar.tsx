"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Category } from "@/app/(site)/types/category/post";
import { LatestPost } from "@/app/(site)/types/detail/latestPost";
import CategoryCard from "./CategoryCard";
import { formatDate } from "@/lib/utils";

function LatestPostImage({ src, alt }: { src: string; alt: string }) {
  const [imgSrc, setImgSrc] = useState(src || "/img-default.jpg");

  return (
    <div className="relative">
      <Image
        src={imgSrc}
        alt={alt}
        width={110}
        height={110}
        loading="lazy"
        className="md:max-w-[45px] md:max-h-[45px] max-w-[40px] max-h-[40px] object-cover"
        onError={() => setImgSrc("/img-default.jpg")}
      />
    </div>
  );
}

export default function Sidebar({
  categories,
  latestPosts,
}: {
  categories: Category[];
  latestPosts?: LatestPost[];
}) {
  return (
    <div className="md:sticky top-20 space-y-5">
      <CategoryCard categories={categories} />
      {/* Bài viết mới nhất (chỉ hiện nếu có) */}
      {latestPosts && latestPosts.length > 0 && (
        <div className="shadow-md rounded-md p-3 border-[1px]">
          <h5 className="text-base font-extrabold mb-2 text-primary_layout uppercase">
            Bài viết mới
          </h5>
          <div className="relative flex mb-3">
            <Image
              src={"/imgs/divide.jpg"}
              alt="divi"
              width={506}
              height={506}
              loading="lazy"
              quality={100}
              className="max-w-[50px] max-h-[50px]"
            />
          </div>
          <ul className="ul_latest_post space-y-3">
            {latestPosts.map((post) => (
              <li
                key={post.id}
                className="flex gap-2 border-b-[1px] border-gray-100/80 pb-2"
              >
                <LatestPostImage src={post.image_url} alt={post.slug} />
                <div className="text-date text-sm ">
                  <Link
                    href={`/tin-tuc/${post.slug}.html`}
                    className="text-sm hover:text-primary_layout"
                  >
                    {post.name}
                  </Link>
                  <p className="text-xs text-gray-500">
                    {formatDate(post.created_at)}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
