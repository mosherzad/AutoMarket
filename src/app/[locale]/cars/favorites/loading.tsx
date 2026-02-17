import CarCardSkeleton from "@/components/CarCardSkeleton";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const loading = () => {
  return (
    <section className="max-w-7xl container mx-auto max-sm:px-6 overflow-hidden">
      <Skeleton className="w-40 h-5 my-3" />
      <div>
        {" "}
        <div className="grid lg:grid-cols-4 gap-5 grid-cols-1 md:grid-cols-3 mb-8">
          {Array.from({ length: 8 }).map((_, i) => (
            <CarCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default loading;
