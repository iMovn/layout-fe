// (site)/[slug]/page.tsx
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Breadcrumbs from "../components/shared/Breadcrumbs";
import Container from "../components/common/Container";
import ProductCard from "../components/layouts/product/ProductCard";
import Pagination from "../components/common/Pagination";
import {
  fetchAllProductCategories,
  fetchProductCategoryBySlug,
  fetchProductCategoryPage,
} from "../api/category";
import { fetchProductDetailBySlug, fetchRelatedProducts } from "../api/product";
import { ProductDetail } from "../types/product";
import ProductSingle from "../components/layouts/product/Product";
import {
  CategoryData,
  CategoryDetail,
  CategoryResponse,
} from "../types/category/product";
import RelatedProducts from "../components/layouts/product/RelatedProducts";

/**
 * Cấu hình ISR (Incremental Static Regeneration)
 * Cache trang trong 5 phút trước khi tái tạo
 */
export const revalidate = 300; // cache 5 phút

/**
 * Tạo metadata động cho trang
 * @param params - Object chứa slug từ URL
 * @returns Promise<Metadata> - Metadata cho trang
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const isProductDetail = slug.endsWith(".html");

  // Lấy danh sách danh mục sản phẩm
  const productCategories = await fetchAllProductCategories();
  if (!productCategories.length) return {};

  if (isProductDetail) {
    const cleanSlug = slug.replace(/\.html$/, "");

    // Tìm chi tiết sản phẩm qua các danh mục
    for (const category of productCategories) {
      const product = await fetchProductDetailBySlug({
        slug: cleanSlug,
        categoryId: category.id,
      });

      if (product) {
        return {
          title: product.meta_title || product.name,
          description: product.meta_description || product.description || "",
          openGraph: {
            title: product.meta_title || product.name,
            description: product.meta_description || product.description || "",
            images: [
              {
                url: product.image_url || "/default-og.jpg",
              },
            ],
          },
        };
      }
    }
  } else {
    // Lấy thông tin danh mục sản phẩm
    const categoryResponse = await fetchProductCategoryBySlug(slug);

    // Kiểm tra kiểu dữ liệu trả về
    if (categoryResponse) {
      // Phân tích CategoryResponse dựa trên cấu trúc thực tế
      const categoryData = categoryResponse as unknown as {
        status: boolean;
        message: string;
        data: {
          details: CategoryDetail;
        };
      };

      if (
        categoryData.status &&
        categoryData.data &&
        categoryData.data.details
      ) {
        const details = categoryData.data.details;
        return {
          title: details.meta_title || details.name,
          description: details.meta_description || "",
          openGraph: {
            title: details.meta_title || details.name,
            description: details.meta_description || "",
            images: [
              {
                url: "/default-og.jpg",
              },
            ],
          },
        };
      }
    }
  }

  return {
    title: "Không tìm thấy sản phẩm",
    description: "Sản phẩm không tồn tại hoặc đã bị xóa.",
  };
}

// Component để hiển thị khi không tìm thấy nội dung
const NotFoundContent = ({ message = "Không tìm thấy nội dung" }) => (
  <Container className="py-10">
    <div className="p-8 bg-gray-50 text-gray-600 rounded-lg text-center">
      <h1 className="text-xl font-bold mb-2">{message}</h1>
      <p>Nội dung bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.</p>
    </div>
  </Container>
);

// Component để hiển thị khi có lỗi
const ErrorContent = () => (
  <Container className="py-10">
    <div className="p-8 bg-red-50 text-red-600 rounded-lg">
      <h1 className="text-xl font-bold mb-2">Đã xảy ra lỗi</h1>
      <p>
        Không thể tải nội dung. Vui lòng thử lại sau hoặc liên hệ quản trị viên.
      </p>
    </div>
  </Container>
);

export default async function SlugPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { slug } = await params;
  const resolvedSearchParams = await searchParams;
  const page = Number(resolvedSearchParams.page || 1);
  const isProductDetail = slug.endsWith(".html");

  try {
    // Fetch product categories data
    const productCategories = await fetchAllProductCategories();

    if (!productCategories.length) {
      return <NotFoundContent message="Không tìm thấy danh mục sản phẩm" />;
    }

    // Xử lý trang chi tiết sản phẩm
    if (isProductDetail) {
      const cleanSlug = slug.replace(/\.html$/, "");
      let productDetail: ProductDetail | null = null;

      // Tìm sản phẩm qua các danh mục
      for (const category of productCategories) {
        const tempProduct = await fetchProductDetailBySlug({
          slug: cleanSlug,
          categoryId: category.id,
        });

        if (tempProduct) {
          productDetail = tempProduct;
          break;
        }
      }

      // Nếu không tìm thấy qua danh mục, thử tìm với categoryId=0
      if (!productDetail) {
        productDetail = await fetchProductDetailBySlug({
          slug: cleanSlug,
          categoryId: 0,
        });
      }

      if (!productDetail) {
        return <NotFoundContent message="Không tìm thấy sản phẩm" />;
      }

      return renderProductDetail(productDetail);
    }

    // Xử lý trang danh mục sản phẩm
    const response = await fetchProductCategoryBySlug(slug, page);

    // Ép kiểu response về any để tránh lỗi TypeScript
    const categoryResponse = response as CategoryResponse;

    if (
      categoryResponse &&
      typeof categoryResponse === "object" &&
      "status" in categoryResponse &&
      categoryResponse.status &&
      "data" in categoryResponse &&
      categoryResponse.data
    ) {
      return renderProductCategory(categoryResponse);
    }

    // Thử với phương thức thứ hai nếu phương thức đầu tiên không có kết quả
    const categoryPageData = await fetchProductCategoryPage({
      slug,
      page,
    });

    if (categoryPageData) {
      return renderCategoryPageData(categoryPageData);
    }

    return notFound();
  } catch (error) {
    console.error("Lỗi không xác định trong SlugPage:", error);
    return <ErrorContent />;
  }
}

// Hiển thị trang chi tiết sản phẩm
async function renderProductDetail(productData: ProductDetail) {
  const mainCategoryId = productData.categories?.[0]?.id || 0;
  const currentProductId = productData.id;

  // Sử dụng related_products từ API nếu có, và lọc ra sản phẩm hiện tại
  let relatedProducts = (productData.related_products || []).filter(
    (product) => product.id !== currentProductId
  );

  console.log(
    `Initial related products: ${relatedProducts.length} (after filtering current product)`
  );

  // Nếu không còn sản phẩm liên quan sau khi lọc, thử fetch thêm
  if (!relatedProducts.length) {
    try {
      console.log(
        `Fetching related products for category ${mainCategoryId} and product ${currentProductId}`
      );
      const fetchedProducts = await fetchRelatedProducts(
        mainCategoryId,
        currentProductId,
        4
      );

      if (Array.isArray(fetchedProducts) && fetchedProducts.length > 0) {
        console.log(
          `Found ${fetchedProducts.length} related products from API`
        );
        relatedProducts = fetchedProducts.filter(
          (product) => product.id !== currentProductId
        );
        console.log(
          `After filtering: ${relatedProducts.length} related products`
        );
      } else {
        console.log("No related products found from API");
      }
    } catch (error) {
      console.error("Error fetching related products:", error);
    }
  }

  return (
    <>
      <Breadcrumbs items={productData.breadcrumbs} />
      <Container className="py-8">
        <ProductSingle product={productData} />
      </Container>

      {/* Sản phẩm liên quan - chỉ hiển thị nếu có */}
      {relatedProducts && relatedProducts.length > 0 ? (
        <Container className="py-8">
          <h2 className="text-2xl font-bold mb-6">Sản phẩm liên quan</h2>
          <RelatedProducts products={relatedProducts} />
        </Container>
      ) : (
        // Thêm placeholder hoặc thông báo khi không có sản phẩm liên quan
        <Container className="py-8">
          <h2 className="text-2xl font-bold mb-6">Sản phẩm liên quan</h2>
          <p className="text-center text-gray-500 py-4">
            Không tìm thấy sản phẩm liên quan
          </p>
        </Container>
      )}
    </>
  );
}

// Hiển thị trang danh mục sản phẩm
function renderProductCategory(categoryResponse: CategoryResponse) {
  const categoryData = categoryResponse.data;

  if (!categoryData.items?.data?.length) {
    return (
      <NotFoundContent message="Không tìm thấy sản phẩm trong danh mục này" />
    );
  }

  return (
    <>
      <Breadcrumbs items={categoryData.breadcrumbs} />
      <Container className="mb-14 mt-9">
        <h1 className="text-xl font-extrabold text-center uppercase">
          {categoryData.details.name || "Danh mục sản phẩm"}
        </h1>
        <div className="w-20 h-1 bg-primary mx-auto my-3"></div>

        <ProductCard products={categoryData.items.data} />

        <Pagination links={categoryData.items.links} />
      </Container>
    </>
  );
}

// Hiển thị trang danh mục sản phẩm từ API khác
function renderCategoryPageData(categoryData: CategoryData) {
  if (
    !categoryData ||
    !categoryData.items ||
    !categoryData.items.data ||
    !categoryData.items.data.length
  ) {
    return (
      <NotFoundContent message="Không tìm thấy sản phẩm trong danh mục này" />
    );
  }

  return (
    <>
      {categoryData.breadcrumbs && (
        <Breadcrumbs items={categoryData.breadcrumbs} />
      )}
      <Container className="mb-14 mt-9">
        <h1 className="text-xl font-extrabold text-center uppercase">
          {categoryData.details?.name || "Danh mục sản phẩm"}
        </h1>
        <div className="w-20 h-1 bg-primary mx-auto my-3"></div>

        <ProductCard products={categoryData.items.data} />

        {categoryData.items.links && (
          <Pagination links={categoryData.items.links} />
        )}
      </Container>
    </>
  );
}
