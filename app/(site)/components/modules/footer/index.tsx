import Link from "next/link";

const contentFooter = {
  description:
    "Công ty iMovn là doanh nghiệp hoạt động trong lĩnh vực Marketing Online tại Việt Nam & thị trường ngoài nước. Với tiêu chí “Chất lượng hơn số lượng”, iMovn luôn nỗ lực tạo ra những sản phẩm phần mềm hoàn thiện với hiệu quả tối ưu. Đến với iMovn, khách hàng sẽ luôn được cung cấp những dịch vụ tốt nhất!",
  contactInfo: [
    {
      heading: "Thông tin liên hệ",
      links: [
        {
          href: "/",
          name: "",
          label: "CÔNG TY TNHH KINGSAFE",
        },
        {
          href: "/lien-he",
          name: "Địa chỉ:",
          label: "497/24/7 Phan Văn Trị, P.5, Q. Gò Vấp, TPHCM",
        },
        {
          href: "#",
          name: "Mã số thuế:",
          label: "0313839474",
        },
        {
          href: "mailto:info@kingsafevn.com",
          name: "Mail:",
          label: "info@kingsafevn.com",
        },
        {
          href: "/",
          name: "Website:",
          label: "www.dungcuhapkhau.com.vn",
        },
        {
          href: "tel:02866879977",
          name: "Điện thoại:",
          label: "(028) 668 799 77",
        },
        {
          href: "#",
          name: "HotLine / Zalo:",
          label: "0989 846 339 - 0937 814 868",
        },
      ],
    },
  ],
  policy: [
    {
      heading: "Chính sách & Ưu đãi",
      links: [
        {
          href: "#",
          label: "Tư vấn miễn phí",
        },
        {
          href: "#",
          label: "Chính sách bảo hành",
        },
        {
          href: "#",
          label: "Chính sách vận chuyển miễn phí",
        },
        {
          href: "#",
          label: "Thông tin chuyển khoản",
        },
      ],
    },
  ],
  socialFt: [
    {
      heading: "Fanpage Facebook",
      links: [
        {
          codeHtml:
            '<iframe src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fkingsafevn&tabs=timeline&width=340&height=245&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId=527381814313178" width="100%" height="245" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>',
        },
      ],
    },
  ],
  googleBm: [
    {
      heading: "Google Business",
      links: [
        {
          codeHtml:
            '<iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15677.75757069679!2d106.682262!3d10.77762!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f3b27d8a7fd%3A0xdb0d92470911a699!2sThe%20Box%20Market!5e0!3m2!1svi!2sus!4v1742803718488!5m2!1svi!2sus" width="100%" height="245" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>',
        },
      ],
    },
  ],
  tags: [
    {
      heading: "Tags sản phẩm",
      links: [
        { label: "bảo hộ lao động", href: "#" },
        { label: "dụng cụ pin", href: "#" },
        { label: "dụng cụ xăng", href: "#" },
        { label: "dụng cụ cầm tay", href: "#" },
      ],
    },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-success-600 to-secondary-700 text-white py-16 overflow-hidden">
      <div className="container mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[30%,20%,25%,25%] gap-8">
        {/* Cột 1: Thông tin liên hệ + mô tả */}
        <div>
          <div className="info">
            {contentFooter.contactInfo.map((section) => (
              <div key={section.heading}>
                <h5 className="relative uppercase text-lg font-bold mb-8 footer__title has-line">
                  {section.heading}
                </h5>
                <ul className="space-y-2 text-sm">
                  {section.links.map((link, idx) => (
                    <li key={`${link.label}-${idx}`}>
                      <span className="font-medium">{link.name} </span>
                      <Link
                        href={link.href}
                        className="hover:text-warning-600 inline-block"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="tags mt-8">
            {contentFooter.tags.map((section) => (
              <div key={section.heading}>
                <h5 className="relative uppercase text-lg font-bold mb-8 footer__title has-line">
                  {section.heading}
                </h5>
                <ul className="flex flex-wrap gap-2 text-sm">
                  {section.links.map((tag, idx) => (
                    <li key={`${tag.label}-${idx}`}>
                      <Link
                        href={tag.href}
                        className="bg-success-500 px-3 py-1 rounded-lg hover:bg-success-600 transition"
                      >
                        {tag.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Cột 2: Chính sách */}
        {contentFooter.policy.map((section) => (
          <div key={section.heading}>
            <h5 className="relative uppercase text-lg font-bold mb-8 footer__title has-line">
              {section.heading}
            </h5>
            <ul className="space-y-2 text-sm">
              {section.links.map((link, idx) => (
                <li key={`${link.label}-${idx}`}>
                  <Link href={link.href} className="hover:text-warning-600">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Cột 3: Mạng xã hội */}
        <div>
          {contentFooter.socialFt.map((section) => (
            <div key={section.heading} className="mb-6">
              <h5 className="relative uppercase text-lg font-bold mb-8 footer__title has-line">
                {section.heading}
              </h5>
              {section.links.map((link, idx) => (
                <div
                  key={idx}
                  dangerouslySetInnerHTML={{ __html: link.codeHtml }}
                />
              ))}
            </div>
          ))}
        </div>

        {/* Cột 4: Google BM */}
        <div>
          {contentFooter.googleBm.map((section) => (
            <div key={section.heading} className="mb-6">
              <h5 className="relative uppercase text-lg font-bold mb-8 footer__title has-line">
                {section.heading}
              </h5>
              {section.links.map((link, idx) => (
                <div
                  key={idx}
                  dangerouslySetInnerHTML={{ __html: link.codeHtml }}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}
