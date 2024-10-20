"use client";
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from "@/components/ui/pagination";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function PaginationHome({
  totalPages,
  length,
  hasNext,
}: {
  totalPages: any;
  length: number;
  hasNext: boolean;
}) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [currentPage, setCurrentPage] = useState(1);
  const [start, setStart] = useState(1);
  const [end, setEnd] = useState(() => {
    return totalPages > 3 ? 3 : totalPages;
  });

  // Function to handle page changes
  const handlePageChange = (page: number) => {
    const url = new URL(window.location.href);
    //@ts-ignore
    url.searchParams.set("page", page);
    router.replace(url.toString(), { scroll: false });
    setCurrentPage(page);
  };
  const handleNext = () => {
    console.log("next");
    setStart(start + 1);
    setEnd(end + 1);
  };

  const handlePrev = () => {
    setStart(start - 1);
    setEnd(end - 1);
  };

  const links = Array.from({ length: end - start + 1 }, (_, index) => start + index);

  return (
    <Pagination className="flex sm:col-span-2 pb-20 sm:pb-0 sm:mb-20 lg:col-span-3 xl:col-span-4 self-center justify-center w-full py-6 mx-auto">
      <PaginationContent className="mx-auto">
        {start > 1 && (
          <PaginationItem>
            <Button onClick={handlePrev}>Previous</Button>
          </PaginationItem>
        )}
        {links.map((item) => (
          <PaginationItem key={item}>
            <PaginationLink
              className={`${
                currentPage === item ? " bg-pink-400  hover:bg-red-400 " : ""
              } select-none text-white cursor-pointer`}
              href="#"
              isActive={currentPage === item}
              onClick={(e) => {
                e.preventDefault();
                handlePageChange(item);
              }}
            >
              {item}
            </PaginationLink>
          </PaginationItem>
        ))}
        {end < totalPages && hasNext && (
          <PaginationItem>
            <Button onClick={handleNext}>Next</Button>
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}
