import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useState } from "react";
import GlobalButton from "./GlobalButton";
import { Button } from "@/components/ui/button";

export default function PaginationHome({ onClick,totalPages,length }: { onClick: any,totalPages:any,length:number }) {
  const [start, setStart] = useState(1);
  const [end, setEnd] = useState(function(){
    if(totalPages>3) return 3
    else return totalPages
  });

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
    <Pagination className=" pb-5">
      <PaginationContent>
        {start > 1 && (
            <PaginationItem>
            <Button onClick={handlePrev} >Previous</Button>
          </PaginationItem>
        )}
        {links.map((item) => (
          <PaginationItem key={item}>
            <PaginationLink className=" text-white cursor-pointer" onClick={() => onClick(item)}>
              {item }
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>{" "}
        {(end>totalPages)&&<PaginationItem>
          <Button onClick={handleNext} >Next</Button>
        </PaginationItem>}
      </PaginationContent>
    </Pagination>
  );
}
