import { BodyClassProvider } from "./(site)/context/BodyClassContext";
import BodyClassManager from "./(site)/components/common/BodyClassManager";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" suppressHydrationWarning={true} dir="ltr">
      <body>
        <BodyClassProvider>
          <BodyClassManager />
          {children}
        </BodyClassProvider>
      </body>
    </html>
  );
}
