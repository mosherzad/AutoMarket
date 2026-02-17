import CarCardSkeleton from "@/components/CarCardSkeleton";
import SearchCarSkeleton from "@/components/SearchCarSkeleton";
import { Skeleton } from "@/components/ui/skeleton";

const loading = () => {
  return (
    <section className="container mx-auto max-w-7xl px-4">
      <Skeleton className="w-full h-85" />
      <SearchCarSkeleton />
      <div>
        <Skeleton className="w-30 h-3 mb-5" />
        <div className="grid lg:grid-cols-4 gap-5 grid-cols-1 md:grid-cols-3 mb-8">
          {Array.from({ length: 8 }).map((_, i) => (
            <CarCardSkeleton key={i} />
          ))}
        </div>
      </div>
      <div className="flex items-center justify-center">
        <Skeleton className="w-25 h-10" />
      </div>
    </section>
  );
};

export default loading;
