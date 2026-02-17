import { getSearchCars } from "@/apiCalls/carApiCall";
import CarCard from "@/components/CarCard";
import { Prisma } from "@/generated/prisma/client";
import { getTranslations } from "next-intl/server";

type CarWithImage = Prisma.CarGetPayload<{
  include: { images: true };
}>;
interface SearchResultProps {
  searchParams: Promise<{ q?: string }>;
}
const SearchResultPage = async ({ searchParams }: SearchResultProps) => {
  const params = await searchParams;
  const query = params.q || "";
  const result = await getSearchCars(query);
  const t = await getTranslations("searchInput");
  await new Promise((reslove) => setTimeout(reslove, 3000));
  return (
    <div className="max-w-7xl container mx-auto max-sm:px-5">
      <div>
        <h1 className="font-bold text-2xl my-5">
          {t("searchResultsTitle")}{" "}
          <span className="text-gray-400">{query}</span>
        </h1>
        <div className="grid lg:grid-cols-4 gap-5 grid-cols-1 md:grid-cols-3 mb-8">
          {result.length === 0 ? (
            <div className="col-span-full flex items-center justify-center min-h-[50vh]">
              <h1 className="text-center text-xl font-semibold text-gray-500">
                {t("noResultFound")}
              </h1>
            </div>
          ) : (
            result.map((car: CarWithImage) => (
              <CarCard car={car} key={car.id} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchResultPage;
