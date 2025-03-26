import { BodyClassProvider } from "./(site)/context/BodyClassContext";
import BodyClassManager from "./(site)/components/common/BodyClassManager";
import ClientLayout from "./(site)/ClientLayout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop Demo Dụng Cụ Nhập Khẩu",
  description: "Mua sắm online giá tốt",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      suppressHydrationWarning={true}
      dir="ltr"
      className="scroll-smooth"
    >
      <body>
        <BodyClassProvider>
          <BodyClassManager />
          <ClientLayout>{children}</ClientLayout>
        </BodyClassProvider>
      </body>
    </html>
  );
}
