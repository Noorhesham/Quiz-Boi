"use client";

import MapForm from "@/app/components/MapForm";
import MaxWidthWrapper from "@/app/components/MaxWidthWrapper";


const page = () => {
  return (
    <section className=" w-full relative min-h-screen justify-center items-center flex  pt-10">
      <MaxWidthWrapper className=" rounded-2xl bg-gray-100">
        <MapForm />
      </MaxWidthWrapper>
    </section>
  );
};

export default page;
