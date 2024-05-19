"use client"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
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
  const [start, setStart] = useState(1);
  const { replace } = useRouter();
  const pathname = usePathname();
  const [end, setEnd] = useState(function () {
    if (totalPages > 3) return 3;
    else return totalPages;
  });
  function handlePagination(page: string) {
    const params = new URLSearchParams(searchParams);
    if (page) params.set("page", page);
    else params.delete("page");
    replace(`${pathname}?${params.toString()}`, { scroll: false });
  }
  const handleNext = () => {
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
        {links.map((item: number | string) => (
          <PaginationItem key={item}>
            {/*@ts-ignore*/}
            <PaginationLink
              className={`${
                //@ts-ignore
                +searchParams.get("page") === item && " bg-pink-400 hover:bg-red-400 "
              } select-none text-white cursor-pointer`}
              //@ts-ignore
              onClick={() => handlePagination(item)}
            >
              {item}
            </PaginationLink>
          </PaginationItem>
        ))}

        {end > totalPages && hasNext && (
          <PaginationItem>
            <Button onClick={handleNext}>Next</Button>
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}
