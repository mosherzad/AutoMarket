import { getSearchCars } from "@/apiCalls/carApiCall";
import CarCard from "@/components/CarCard";
import { Car } from "@/generated/prisma/client";

interface SearchResultProps {
  searchParams: Promise<{ q?: string }>;
}
const SearchResultPage = async ({ searchParams }: SearchResultProps) => {
  const params = await searchParams;
  const query = params.q || "";
  const result = await getSearchCars(query);

  await new Promise((reslove) => setTimeout(reslove, 3000));
  return (
    <div className="max-w-7xl container mx-auto max-sm:px-5">
      <div>
        <h1 className="font-bold text-2xl my-5">
          The search results for <span className="text-gray-400">{query}</span>
        </h1>
        <div className="grid lg:grid-cols-4 gap-5 grid-cols-1 md:grid-cols-3 mb-8">
          {result.length === 0 ? (
            <div className="col-span-full flex items-center justify-center min-h-[50vh]">
              <h1 className="text-center text-xl font-semibold text-gray-500">
                No result found
              </h1>
            </div>
          ) : (
            result.map((car: Car) => <CarCard car={car} key={car.id} />)
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchResultPage;
