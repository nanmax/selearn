import React from "react";
import { AnimatedText } from "./animated-headline";
import TopCategories from "./top-categories";

export default function CategoriesCourse() {
  return (
    <>
      <div className="flex flex-col justify-center items-center my-8 py-8 mx-4 gap-4">
        <AnimatedText text="Top Kategori" className="text-[#007bff]" />
        <TopCategories />
      </div>
    </>
  );
}
