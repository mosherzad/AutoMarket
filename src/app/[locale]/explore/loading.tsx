import CarCardSkeleton from "@/components/CarCardSkeleton";
import SearchCarSkeleton from "@/components/SearchCarSkeleton";
import { Skeleton } from "@/components/ui/skeleton";

const loading = () => {
  return (
    <section className="max-w-7xl container mx-auto max-sm:px-5">
      <div className="flex items-center justify-center space-x-3">
        <Skeleton className="w-15 h-13" />
        <SearchCarSkeleton />
      </div>
      <Skeleton className="w-25 h-5 bg-gray-300 mb-4" />
      <div className="grid lg:grid-cols-4 gap-5 grid-cols-1 md:grid-cols-3 mb-8">
        {Array.from({ length: 8 }).map((_, i) => (
          <CarCardSkeleton key={i} />
        ))}
      </div>
      <div className="flex items-center justify-center">
        <Skeleton className="w-40 h-10 " />
      </div>
    </section>
  );
};

export default loading;
