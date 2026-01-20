import React from "react";
import { Skeleton } from "./ui/skeleton";

const SearchCarSkeleton = () => {
  return (
    <form action="" className="flex items-center justify-center my-7">
      <Skeleton className="px-6 py-3 rounded-lg bg-gray-200 border w-100 h-13 lg:w-xl" />
      <Skeleton className="absolute top-3 right-4 text-xl" />
    </form>
  );
};

export default SearchCarSkeleton;
