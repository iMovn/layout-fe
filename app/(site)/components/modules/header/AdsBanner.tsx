import Image from "next/image";

const banners = [
  {
    src: "/ads/banner-ads.jpg",
    alt: "Banner QC",
  },
];

export default function AdsBanner() {
  return (
    <section>
      {banners.map((banner, index) => (
        <div
          key={index}
          className="relative flex h-auto w-auto justify-center overflow-hidden"
        >
          <Image
            src={banner.src}
            alt={banner.alt}
            width={1920}
            height={125}
            quality={100}
            priority
            className="object-cover"
          />
        </div>
      ))}
    </section>
  );
}
