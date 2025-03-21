import Container from "./components/common/Container";
import Banners from "./components/layouts/home/Banners";
import Criterias from "./components/layouts/home/Criterias";
import BannerAds from "./components/layouts/home/BannerAds";
import PromotionProduct from "./components/layouts/home/PromotionProduct";

export default function FrontEnd() {
  return (
    <>
      <Banners />
      <Container>
        <Criterias />
        <BannerAds />
        <PromotionProduct />
      </Container>
      <div className="mb-96"></div>
    </>
  );
}
