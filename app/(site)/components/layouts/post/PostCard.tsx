"use client";

import Image from "next/image";
import Link from "next/link";

import { useState } from "react";
import { CalendarDays } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { PostType } from "@/app/(site)/types/detail/post";

function PostImage({ src, alt }: { src: string; alt: string }) {
  const [imgSrc, setImgSrc] = useState(src || "/img-default.jpg");
  return (
    <div className="relative">
      <Image
        src={imgSrc}
        alt={alt}
        width={256}
        height={180}
        loading="lazy"
        quality={100}
        className="w-full h-auto object-cover"
        onError={() => setImgSrc("/img-default.jpg")}
      />
    </div>
  );
}

export default function PostCard({
  posts,
  categoryName,
}: {
  posts: PostType[];
  categoryName: string;
}) {
  if (!posts || posts.length === 0) {
    return (
      <p>
        Danh mục <strong>{categoryName}</strong> chưa có bài viết nào. Hãy thêm
        bài viết mới!
      </p>
    );
  }

  return (
    <div className="grid grid-cols-2 ms:grid-cols-3 ms:gap-6 gap-3">
      {posts.map((post) => (
        <div
          key={post.id}
          className="group border-[1px] rounded-md p-4 shadow-sm border-b-4 border-b-primary_layout"
        >
          <Link href={`/tin-tuc/${post.slug}.html`}>
            <PostImage src={post.image_url || ""} alt={post.slug} />
          </Link>
          <p className="flex items-center gap-1 text-body-sm-500 text-gray-500 mt-3">
            <CalendarDays size="13px" color="#9CC900" />{" "}
            {formatDate(post.created_at)}
          </p>
          <Link href={`/${post.slug}.html`}>
            <h3 className="font-semibold text-lg mt-2 leading-6 group-hover:text-hover_layout">
              {post.name}
            </h3>
          </Link>
        </div>
      ))}
    </div>
  );
}
