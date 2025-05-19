// app/san-pham/page.tsx
import { getAllProducts } from "../api/product";
import Container from "../components/common/Container";
import Breadcrumbs from "../components/shared/Breadcrumbs";
import AllProductsClient from "./AllProductsClient";

export default async function AllProducts() {
  const res = await getAllProducts();
  const products = res.data?.data ?? [];

  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Trang chủ", slug: "/", is_active: false },
          { name: "Tất cả sản phẩm", slug: "san-pham", is_active: true },
        ]}
      />
      <Container className="mb-14 mt-9">
        <h1 className="text-body-xl-600 font-extrabold text-center uppercase">
          Tất cả sản phẩm
        </h1>
        <div className="animate-border mx-auto mt-3 mb-5"></div>

        <AllProductsClient products={products} />
      </Container>
    </>
  );
}
