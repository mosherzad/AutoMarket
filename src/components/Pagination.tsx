"use client";

import { useSearchParams } from "next/navigation";
import {
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface PaginationProps {
  pages: number;
  pageNumber: number;
  route: string;
}

const Pagination = ({ pages, pageNumber, route }: PaginationProps) => {
  const searchParams = useSearchParams();

  const pagesArray: number[] = [];
  for (let i = 1; i <= pages; i++) pagesArray.push(i);

  const buildHref = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("pageNumber", page.toString());
    return `${route}?${params.toString()}`;
  };

  return (
    <div className="flex items-center justify-center mb-10 space-x-1">
      <div className="flex justify-center mt-8 mb-12">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href={buildHref(pageNumber - 1)}
              className={
                pageNumber === 1 ? "pointer-events-none opacity-50" : ""
              }
            />
          </PaginationItem>

          {pagesArray.map((page) => (
            <PaginationItem key={page}>
              <PaginationLink
                href={buildHref(page)}
                isActive={page === pageNumber}
                className="hover:bg-white"
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}

          {pages > 6 && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}

          <PaginationItem>
            <PaginationNext
              href={buildHref(pageNumber + 1)}
              className={
                pageNumber === pages ? "pointer-events-none opacity-50" : ""
              }
            />
          </PaginationItem>
        </PaginationContent>
      </div>
    </div>
  );
};

export default Pagination;
