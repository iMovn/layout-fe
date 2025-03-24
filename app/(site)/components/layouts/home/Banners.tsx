"use client";

import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const imgBanners = [
  {
    id: 1,
    src: "/banner/banner1.jpg",
    alt: "Banner 1",
    link: "/lien-he",
    type: "large",
  },
  {
    id: 2,
    src: "/banner/banner2.jpg",
    alt: "Banner 2",
    link: "/lien-he",
    type: "small",
  },
  {
    id: 3,
    src: "/banner/banner3.jpg",
    alt: "Banner 3",
    link: "/lien-he",
    type: "small",
  },
  {
    id: 4,
    src: "/banner/banner4.jpg",
    alt: "Banner 4",
    link: "/lien-he",
    type: "small",
  },
  {
    id: 5,
    src: "/banner/banner5.jpg",
    alt: "Banner 5",
    link: "/lien-he",
    type: "small",
  },
  {
    id: 6,
    src: "/banner/banner3.jpg",
    alt: "Banner 6",
    link: "/lien-he",
    type: "small",
  },
];

export default function Banners() {
  const smallBanners = imgBanners.filter((img) => img.type === "small");
  const largeBanners = imgBanners.filter((img) => img.type === "large");

  return (
    <section className="ms:container banner_group w-full">
      {/* Mobile layout */}
      <div className="block ms:hidden space-y-2">
        {largeBanners.map((img, index) => (
          <Link href={img.link} key={index}>
            <div className="relative w-full h-[225px]">
              <Image
                src={img.src}
                alt={img.alt}
                fill
                loading="lazy"
                className="object-cover"
                sizes="100vw"
              />
            </div>
          </Link>
        ))}

        {/* Mobile horizontal swiper with autoplay */}
        <Swiper
          spaceBetween={8}
          slidesPerView={2}
          modules={[Autoplay]}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          className="!px-1"
        >
          {smallBanners.map((img) => (
            <SwiperSlide key={img.id}>
              <Link href={img.link}>
                <div className="relative w-full h-full">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    width={272}
                    height={218}
                    loading="lazy"
                    className="object-cover rounded"
                    sizes="(max-width: 768px) 50vw, 100vw"
                  />
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Desktop layout */}
      <div className="hidden ms:grid ms:grid-cols-[20%,60%,20%] ms:space-x-2 ms:space-y-2">
        <div className="empty_banner"></div>

        {/* Large banner */}
        <div className="ri_banner">
          {largeBanners.map((img, index) => (
            <Link href={img.link} key={index} className="block w-full h-full">
              <div className="relative w-full h-full">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 1200px) 50vw, 100vw"
                  quality={100}
                  loading="lazy"
                  className="object-cover"
                />
              </div>
            </Link>
          ))}
        </div>

        {/* Small banners - vertical swiper with autoplay */}
        <div className="l_banner flex flex-col gap-2">
          <Swiper
            direction="vertical"
            spaceBetween={6}
            slidesPerView={2}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            modules={[Autoplay]}
            className="h-[418px]"
          >
            {smallBanners.map((img) => (
              <SwiperSlide key={img.id}>
                <Link
                  href={img.link}
                  className="relative overflow-hidden group block"
                >
                  <div className="relative w-full h-full">
                    <Image
                      src={img.src}
                      alt={img.alt}
                      width={272}
                      height={218}
                      loading="lazy"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <span className="pointer-events-none absolute inset-0 before:content-[''] before:absolute before:top-0 before:bottom-0 before:left-[-100%] before:w-[60%] before:bg-white before:opacity-20 before:skew-x-[-20deg] before:blur-sm group-hover:before:animate-flash-glide"></span>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
