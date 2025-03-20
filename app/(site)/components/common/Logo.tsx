import Image from "next/image";
import Link from "next/link";

const brandLogo = [
  {
    src: "/logos/logo-main.jpg",
    alt: "logo",
  },
];

export default function Logo() {
  return (
    <div id="logo">
      {brandLogo.map((logo, index) => (
        <div key={index}>
          <Link href="/">
            <Image
              src={logo.src}
              alt={logo.alt}
              width={230}
              height={60}
              quality={100}
              loading="lazy"
              className="w-auto h-auto"
            />
          </Link>
        </div>
      ))}
    </div>
  );
}
