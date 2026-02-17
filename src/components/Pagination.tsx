"use client";

import { useSearchParams } from "next/navigation";
import { Link, usePathname } from "@/i18n/navigation";

import {
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
} from "@/components/ui/pagination";
import { useTranslations } from "next-intl";

interface PaginationProps {
  pages: number;
  pageNumber: number;
  route: string;
}

const Pagination = ({ pages, pageNumber }: PaginationProps) => {
  const searchParams = useSearchParams();
  const t = useTranslations("pagination");
  const pathname = usePathname();
  const pagesArray: number[] = [];
  for (let i = 1; i <= pages; i++) pagesArray.push(i);

  const buildHref = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("pageNumber", page.toString());
    return `${pathname}?${params.toString()}`;
  };

  console.log(t("next"));
  return (
    <div className="flex items-center justify-center mb-10 space-x-1">
      <div className="flex justify-center mt-8 mb-12">
        <PaginationContent>
          <PaginationItem>
            {pageNumber === 1 ? (
              <span className="pointer-events-none opacity-50 px-3 py-1 border rounded">
                {t("previous")}
              </span>
            ) : (
              <Link
                href={buildHref(pageNumber - 1)}
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded px-3 py-1 border hover:bg-white"
              >
                {t("previous")}
              </Link>
            )}
          </PaginationItem>

          {pagesArray.map((page) => (
            <PaginationItem key={page}>
              <Link href={buildHref(page)}>
                <span
                  className={`inline-flex items-center justify-center gap-2 whitespace-nowrap rounded px-3 py-1 border ${
                    page === pageNumber
                      ? "bg-white text-black"
                      : "hover:bg-white"
                  }`}
                >
                  {page}
                </span>
              </Link>
            </PaginationItem>
          ))}

          {pages > 6 && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}

          <PaginationItem>
            {pageNumber === pages ? (
              <span className="pointer-events-none opacity-50 px-3 py-1 border rounded">
                {t("next")}
              </span>
            ) : (
              <Link
                href={buildHref(pageNumber + 1)}
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded px-3 py-1 border hover:bg-white"
              >
                {t("next")}
              </Link>
            )}
          </PaginationItem>
        </PaginationContent>
      </div>
    </div>
  );
};

export default Pagination;
