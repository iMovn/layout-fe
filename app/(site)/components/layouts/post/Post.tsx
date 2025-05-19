"use client";

import DOMPurify from "dompurify";
import Link from "next/link";
import { PostType } from "@/app/(site)/types/detail/post";
import { insertTocToContent } from "@/lib/utils";
import { useEffect, useState } from "react";

export default function Post({ post }: { post: PostType }) {
  const [sanitizedContent, setSanitizedContent] = useState("");

  useEffect(() => {
    if (post.content) {
      setSanitizedContent(
        DOMPurify.sanitize(insertTocToContent(post.content, post.toc || ""))
      );
    }
  }, [post.content, post.toc]);

  // const contentWithToc = insertTocToContent(post.content || "", post.toc || "");
  return (
    <div className="space-y-3">
      {/* Nội dung bài viết */}
      <div
        className="content_post prose max-w-none"
        dangerouslySetInnerHTML={{ __html: sanitizedContent }}
      />

      {/* Bài viết liên quan */}
      {post.related_posts && post.related_posts.length > 0 && (
        <div>
          <h5 className="text-body-l-600 font-bold text-primary-600 mt-10 mb-4 ">
            Bài viết liên quan
          </h5>
          <ul className="list-disc pl-4 space-y-2">
            {post.related_posts.map((related) => (
              <li key={related.id}>
                <Link
                  href={`/${related.slug}.html`}
                  className="text-blue-600 hover:underline"
                >
                  {related.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
