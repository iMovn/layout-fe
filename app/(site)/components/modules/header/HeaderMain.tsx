"use client";
import Container from "../../common/Container";
import Logo from "../../common/Logo";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import BoxSearch from "./BoxSearch";

// Utility function để đảm bảo URL là đường dẫn tuyệt đối
function ensureAbsolutePath(path: string): string {
  if (!path) return "/";

  // Nếu đã bắt đầu bằng /, trả về nguyên bản
  if (path.startsWith("/")) return path;

  // Nếu không, thêm / vào đầu
  return `/${path}`;
}

// Danh mục sản phẩm
const categories = [
  {
    id: 1,
    name: "Bảo hộ lao động",
    slug: "bao-ho-lao-dong",
    icon: "/icon_img/ico1.png",
  },
  {
    id: 2,
    name: "Dụng cụ pin",
    slug: "dung-cu-pin",
    icon: "/icon_img/ico2.png",
  },
  {
    id: 3,
    name: "Dụng cụ điện",
    slug: "dung-cu-dien",
    icon: "/icon_img/ico3.png",
  },
  {
    id: 4,
    name: "Dụng cụ xăng",
    slug: "dung-cu-xang",
    icon: "/icon_img/ico4.png",
  },
  {
    id: 5,
    name: "Dụng cụ cầm tay",
    slug: "dung-cu-cam-tay",
    icon: "/icon_img/ico5.png",
  },
];

// Hotline
const hotline = [
  { link: "tel:0948435058", number: "09 4843 5058" },
  { link: "tel:0902226119", number: "0902 226 119" },
];

export default function HeaderMain() {
  return (
    <section className="bg-primary_custom ms:h-[98px] h-[50px] overflow-hidden">
      <Container className="flex items-center justify-between h-full">
        <div className="logo">
          <Logo />
        </div>

        <div className="seach_key">
          <BoxSearch />
        </div>

        <div className="search_cate_hot_ecom ms:flex items-center justify-between hidden gap-9">
          <div className="cate_ecom flex justify-between space-x-6">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={ensureAbsolutePath(cat.slug)}
                className="group flex flex-col items-center text-center space-y-2"
              >
                <Image
                  src={cat.icon}
                  alt={cat.name}
                  width={30}
                  height={30}
                  loading="lazy"
                  className="object-contain"
                />
                <span className="group-hover:text-warning-600 text-body-tiny-600 font-bold uppercase w-[80px]">
                  {cat.name}
                </span>
              </Link>
            ))}
          </div>

          <div className="hotline_header gap-0 flex justify-end">
            <div className="icon relative z-10 w-12 text-center place-content-center">
              <motion.div
                animate={{
                  scale: [1, 1.1, 0.9, 1.1, 1],
                  rotate: [0, 3, -3, 3, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Image
                  src="/icon_img/call.png"
                  alt="hotline"
                  width={30}
                  height={30}
                  loading="lazy"
                  className="object-contain"
                />
              </motion.div>
            </div>

            <ul className="phones leading-snug">
              {hotline.map((phone, i) => (
                <li key={i}>
                  <Link
                    href={phone.link}
                    className="hover:text-warning-600 font-semibold"
                  >
                    {phone.number}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
