import Hero from "./Hero";
import SearchCar from "./SearchCar";
import CarCard from "./CarCard";
import Link from "next/link";
import { Car } from "@/generated/prisma/client";
import { getLatestCars } from "@/apiCalls/carApiCall";
export const HomePage = async () => {
  const cars: Car[] = await getLatestCars();
  return (
    <section className="container mx-auto max-w-7xl px-4">
      <Hero />
      <SearchCar />
      <div>
        <h1 className="font-bold text-2xl mb-3">Latest Cars</h1>
        <div className="grid lg:grid-cols-4 gap-5 grid-cols-1 md:grid-cols-3 mb-8">
          {cars.map((car) => (
            <CarCard car={car} key={car.id} />
          ))}
        </div>
      </div>
      <div className="flex items-center justify-center">
        <Link
          href={"/explore?pageNumber=1"}
          className="px-6 py-3 bg-white border rounded-lg hover:bg-gray-100 hover:border border-gray-300 transition-all duration-200 font-semibold text-black mb-5"
        >
          See More
        </Link>
      </div>
    </section>
  );
};
