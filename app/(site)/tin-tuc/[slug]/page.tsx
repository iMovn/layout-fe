import { notFound } from "next/navigation";
import { Metadata } from "next";
import { CalendarDays, CircleUser } from "lucide-react";
import { fetchAllCategories, fetchCategoryBySlug } from "../../api/category";
import { fetchPost, getLatestPosts } from "../../api/post";
import { formatDate } from "@/lib/utils";
import Breadcrumbs from "../../components/shared/Breadcrumbs";
import Sidebar from "../../components/layouts/post/Sidebar";
import Post from "../../components/layouts/post/Post";
import PostCard from "../../components/layouts/post/PostCard";
import Pagination from "../../components/common/Pagination";
import { Category } from "../../types/category/post";
import { LatestPost } from "../../types/detail/latestPost";

// ISR
export const revalidate = 300;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const isPost = slug.endsWith(".html");
  const categories = await fetchAllCategories();
  if (!categories.length) return {};

  if (isPost) {
    const cleanSlug = slug.replace(/\.html$/, "");
    for (const category of categories) {
      const post = await fetchPost(cleanSlug, category.id);
      if (post) {
        return {
          title: post.meta_title || post.name,
          description: post.meta_description || post.description || "",
          openGraph: {
            title: post.meta_title || post.name,
            description: post.meta_description || post.description || "",
            images: [{ url: post.image_url || "/default-og.jpg" }],
          },
        };
      }
    }
  } else {
    const categoryData = await fetchCategoryBySlug(slug);
    if (categoryData?.details) {
      const { name, meta_title, meta_description, image_url } =
        categoryData.details;
      return {
        title: meta_title || name,
        description: meta_description || "",
        openGraph: {
          title: meta_title || name,
          description: meta_description || "",
          images: [{ url: image_url || "/default-og.jpg" }],
        },
      };
    }
  }

  return {
    title: "Không tìm thấy nội dung",
    description: "Nội dung không tồn tại hoặc đã bị xóa.",
  };
}

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { slug } = await params;

  const resolvedSearchParams = await searchParams;

  const page = Number(resolvedSearchParams.page || 1);
  const isPost = slug.endsWith(".html");

  const categories = await fetchAllCategories();
  const latestPosts: LatestPost[] = await getLatestPosts(5);
  if (!categories.length) return notFound();

  return isPost
    ? await renderPostDetail(slug, categories, latestPosts)
    : await renderPostCategory(slug, categories, page);
}

// === Chi tiết bài viết ===
async function renderPostDetail(
  slug: string,
  categories: Category[],
  latestPosts: LatestPost[]
) {
  const cleanSlug = slug.replace(/\.html$/, "");
  let postData = null;

  for (const category of categories) {
    const tempPost = await fetchPost(cleanSlug, category.id);
    if (tempPost) {
      const realCategoryId = tempPost.categories?.[0]?.id;
      postData = realCategoryId
        ? await fetchPost(cleanSlug, realCategoryId)
        : tempPost;
      break;
    }
  }

  if (!postData) return notFound();

  return (
    <>
      <section
        className="relative w-full bg-cover md:bg-center bg-left-top py-12 z-0"
        style={{
          backgroundImage: `url('${postData.image_url || "/img-default.jpg"}')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#40c543]/90 to-[#76c5c4]/70 z-0" />
        <div className="container mx-auto relative text-white z-10">
          <Breadcrumbs items={postData.breadcrumbs} />
          <h1 className="text-xl md:text-2xl font-bold">{postData.name}</h1>
          <div className="flex items-center gap-3 text-sm text-gray-100">
            <span className="flex items-center gap-1">
              <CalendarDays size={15} color="#E59B17" />
              {formatDate(postData.created_at)}
            </span>
            <span className="flex items-center gap-1">
              <CircleUser size={15} color="#E59B17" />
              {postData.users?.name}
            </span>
          </div>
        </div>
      </section>

      <div className="container mx-auto flex flex-col-reverse md:flex-row gap-10 py-10">
        <aside className="md:w-[25%] w-full">
          <Sidebar categories={categories} latestPosts={latestPosts} />
        </aside>
        <main className="md:w-[75%] w-full">
          <Post post={postData} />
        </main>
      </div>
    </>
  );
}

// === Danh mục bài viết ===
async function renderPostCategory(
  slug: string,
  categories: Category[],
  page: number
) {
  const categoryData = await fetchCategoryBySlug(slug, page);
  if (!categoryData?.items?.data) return notFound();

  const { details, items, breadcrumbs } = categoryData;

  return (
    <>
      <section
        className="relative w-full bg-cover md:bg-left-bottom bg-left-top py-[59px] z-0"
        style={{ backgroundImage: "url('/images/bg-head.jpg')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#40c543]/90 to-[#76c5c4]/70 z-0" />
        <div className="container mx-auto relative text-white z-10">
          <Breadcrumbs items={breadcrumbs} />
          <h1 className="text-xl md:text-2xl font-bold">
            {details.name || "Danh mục"}
          </h1>
        </div>
      </section>

      <div className="container mx-auto flex flex-col-reverse md:flex-row gap-12 py-10">
        <aside className="md:w-[25%] w-full">
          <Sidebar categories={categories} />
        </aside>
        <main className="md:w-[75%] w-full space-y-6">
          <PostCard posts={items.data} categoryName={details.name || ""} />
          <Pagination links={items.links} />
        </main>
      </div>
    </>
  );
}
