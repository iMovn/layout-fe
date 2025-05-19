import Link from "next/link";
import React from "react";
import Container from "./Container";

type BreadcrumbProps = {
  pages: string[];
};

const Breadcrumb: React.FC<BreadcrumbProps> = ({ pages }) => {
  return (
    <div className="overflow-hidden bg-gray-100">
      <Container className="py-3 ms:py-4">
        <nav className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <ul className="flex items-center gap-2">
            <li className="text-body-sm-500 hover:text-primary-600">
              <Link href="/">Trang chủ /</Link>
            </li>

            {pages.length > 0 &&
              pages.map((page: string, key: number) => (
                <li
                  className="text-body-sm-500 last:text-gray-600 capitalize"
                  key={key}
                >
                  {page}
                </li>
              ))}
          </ul>
        </nav>
      </Container>
    </div>
  );
};

export default Breadcrumb;
