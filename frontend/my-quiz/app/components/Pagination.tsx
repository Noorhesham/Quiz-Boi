import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";

export default function PaginationHome({ onClick,totalPages,length,hasNext }: { onClick: any,totalPages:any,length:number ,hasNext:boolean}) {
  const searchParams=useSearchParams()
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
    <Pagination className=" py-6 mx-auto">
      <PaginationContent>
        {start > 1 && (
            <PaginationItem>
            <Button onClick={handlePrev} >Previous</Button>
          </PaginationItem>
        )}
        {links.map((item) => (
          <PaginationItem key={item}>
            {/*@ts-ignore*/}
            <PaginationLink className={`${+searchParams.get('page')===item&&" bg-pink-400 hover:bg-red-400 "} select-none text-white cursor-pointer`} onClick={() => onClick(item)}>
              {item }
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>{" "}
        {(end>totalPages&&hasNext)&&<PaginationItem>
          <Button onClick={handleNext} >Next</Button>
        </PaginationItem>}
      </PaginationContent>
    </Pagination>
  );
}
