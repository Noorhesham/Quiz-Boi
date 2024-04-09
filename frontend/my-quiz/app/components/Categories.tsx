import { useGetTags } from "@/utils/queryFunctions";
import React, { useState } from "react";
import Spinner from "./Spinner";
import LazyLoad from "react-lazy-load";
import { AnimatePresence, motion } from "framer-motion";
import CategoreyCard from "./CategoreyCard";

const Categories = ({ setCategorey }: { setCategorey: any }) => {
  const { tags, isLoading } = useGetTags();
  const [hover, setHover] = useState(false);

  if (isLoading) return <Spinner />;
  console.log(hover);
  return (
    <>
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4 px-8 py-4 justify-center">
        <CategoreyCard large={true} tag={tags[0]} setCategorey={setCategorey} />
        <div className=" grid grid-cols-1 sm:grid-cols-2  justify-items-center  md:grid-cols-3 gap-4">
          {tags.slice(1, 5).map((tag: any) => (
            <CategoreyCard tag={tag} setCategorey={setCategorey} />
          ))}
        </div>
      </section>
    </>
  );
};

export default Categories;
