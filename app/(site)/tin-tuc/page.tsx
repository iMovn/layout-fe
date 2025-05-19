// app/tin-tuc/page.tsx

import { fetchAllData } from "../api/post";
import Container from "../components/common/Container";
import PostCard from "../components/layouts/post/PostCard";
import Sidebar from "../components/layouts/post/Sidebar";
import Breadcrumbs from "../components/shared/Breadcrumbs";

export default async function BlogPage() {
  const { categories, posts } = await fetchAllData();

  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Trang chủ", slug: "/", is_active: false },
          { name: "Tin tức", slug: "tin-tuc", is_active: true },
        ]}
      />
      <Container className="mb-14 mt-9">
        <h1 className="text-body-xl-600 font-extrabold text-center uppercase">
          Blog & Tin tức mới
        </h1>

        <div className="animate-border mx-auto mt-3 mb-5"></div>
        <aside className="md:w-[25%] w-full">
          <Sidebar categories={categories} />
        </aside>
        <main className="md:w-[75%] w-full space-y-6">
          <PostCard posts={posts} categoryName="Tin tức" />
        </main>
      </Container>
    </>
  );
}
