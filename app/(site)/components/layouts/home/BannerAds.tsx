"use client";

import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const itemAds = [
  {
    id: 1,
    image: "/banner/banner6.jpg",
    alt: "Công cụ dụng cụ nâng tầm hiệu suất",
    link: "/san-pham/cong-cu-dung-cu",
  },
  {
    id: 2,
    image: "/banner/banner7.jpg",
    alt: "Quạt sàn công nghiệp",
    link: "/san-pham/quat-san",
  },
  {
    id: 3,
    image: "/banner/banner8.jpg",
    alt: "Dụng cụ INGCO mua ngay",
    link: "/thuong-hieu/ingco",
  },
];

export default function BannerAds() {
  return (
    <section className="w-full">
      <div className="mx-auto">
        <Swiper
          spaceBetween={15}
          slidesPerView={2}
          loop={itemAds.length > 3}
          modules={[Autoplay]}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          breakpoints={{
            768: {
              slidesPerView: 3,
            },
          }}
        >
          {itemAds.map((item) => (
            <SwiperSlide key={item.id}>
              <Link
                href={item.link}
                className="group block overflow-hidden rounded-xl shadow-md"
              >
                <div className="relative w-full h-full">
                  <Image
                    src={item.image}
                    alt={item.alt}
                    width={600}
                    height={400}
                    quality={100}
                    priority
                    className="w-full h-auto object-cover rounded-xl transition-transform duration-300 group-hover:scale-105"
                  />
                  <span className="pointer-events-none absolute inset-0 before:content-[''] before:absolute before:top-0 before:bottom-0 before:left-[-100%] before:w-[60%] before:bg-white before:opacity-20 before:skew-x-[-20deg] before:blur-sm group-hover:before:animate-flash-glide"></span>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
