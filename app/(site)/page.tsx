import Container from "./components/common/Container";
import Banners from "./components/layouts/home/Banners";
import Criterias from "./components/layouts/home/Criterias";
import BannerAds from "./components/layouts/home/BannerAds";
import ProductSellerSection from "./components/layouts/home/ProductSeller";
// import PromotionProduct from "./components/layouts/home/PromotionProduct";
// import { TooltipProvider } from "@/components/ui/tooltip";

export default function FrontEnd() {
  return (
    <>
      <Banners />
      <Container>
        <Criterias />
        <BannerAds />
        {/* <TooltipProvider>
          <PromotionProduct />
        </TooltipProvider> */}
        <ProductSellerSection />
      </Container>
      <div className="mb-96"></div>
    </>
  );
}
