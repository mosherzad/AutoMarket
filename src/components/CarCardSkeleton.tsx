import { Skeleton } from "@/components/ui/skeleton";

export default function CarCardSkeleton() {
  return (
    <section className="flex flex-col border container mx-auto max-sm:w-sm bg-gray-300">
      <div className="flex items-center justify-center w-full h-full overflow-hidden">
        <Skeleton className="w-full h-50" />
      </div>

      <div className="p-2">
        <Skeleton className="h-5 lg:h-7 w-3/4 mb-2" />

        <Skeleton className="h-4 w-full mb-1" />
        <Skeleton className="h-4 w-11/12 mb-1" />

        <Skeleton className="h-5 w-28 mt-2" />

        <div className="flex items-center justify-between mt-3">
          <Skeleton className="h-4 w-20" />

          <Skeleton className="h-9 w-28 rounded-lg" />
        </div>
      </div>
    </section>
  );
}
