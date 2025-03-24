"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const criteriaItems = [
  {
    id: 1,
    icon: "/icon_img/tc1.jpg",
    name: "ĐA DẠNG HÀNG HÓA",
    description: "Hơn 2000 Sản Phẩm",
  },
  {
    id: 2,
    icon: "/icon_img/tc2.jpg",
    name: "GIAO SIÊU TỐC",
    description: "Ship Đơn Hàng Từ 1tr",
  },
  {
    id: 3,
    icon: "/icon_img/tc3.jpg",
    name: "GIÁ SIÊU TỐT",
    description: "Cam Kết Tốt Nhất Thị Trường",
  },
  {
    id: 4,
    icon: "/icon_img/tc4.jpg",
    name: "BẢO HÀNH CHÍNH HÃNG",
    description: "Đổi Trả Trong Vòng 7 Ngày",
  },
];

export default function Criterias() {
  return (
    <section className="w-full my-7">
      <div className="mx-auto">
        <Swiper
          spaceBetween={50}
          slidesPerView={1}
          loop={criteriaItems.length > 4}
          modules={[Autoplay]}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 4 },
          }}
        >
          {criteriaItems.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="group flex items-center bg-gradient-to-r from-[#C6F700] to-[#B2DE00] text-black py-0 rounded-l-[68px] rounded-r-[40px] overflow-hidden shadow-sm cursor-pointer">
                <motion.div className="group-hover:animate-rotateY relative w-[70px] h-[70px] flex-shrink-0 rounded-full shadow-md shadow-gray-400 bg-white flex items-center justify-center border-[3px] border-primary_custom mr-3">
                  <Image
                    src={item.icon}
                    alt={item.name}
                    width={40}
                    height={40}
                    loading="lazy"
                    className="w-auto h-auto object-contain"
                  />
                </motion.div>
                <div>
                  <h4 className="text-body-md-600 font-extrabold uppercase">
                    {item.name}
                  </h4>
                  <p className="text-body-sm-500 text-gray-700">
                    {item.description}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
