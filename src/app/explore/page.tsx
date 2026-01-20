"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import CarCard from "@/components/CarCard";
import Pagination from "@/components/Pagination";
import FilterController from "@/components/FilterController";
import { POST_PER_PAGE } from "@/lib/constants";
import CarCardSkeleton from "@/components/CarCardSkeleton";
import { Skeleton } from "@/components/ui/skeleton";
import SearchCarSkeleton from "@/components/SearchCarSkeleton";
import { Car } from "@/generated/prisma/client";

const ExploreCars = () => {
  const searchParams = useSearchParams();
  const pageNumber = parseInt(searchParams.get("pageNumber") || "1");

  const [cars, setCars] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  const queryString = searchParams.toString();

  useEffect(() => {
    const fetchCars = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/cars?${queryString}`);
        const data = await res.json();

        setCars(data.cars || []);
        setTotal(data.total || 0);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, [queryString]);

  const pages = Math.ceil(total / POST_PER_PAGE);

  return (
    <section className="max-w-7xl container mx-auto max-sm:px-5">
      {loading ? (
        <div className="animate-pulse space-y-5">
          <div className="flex items-center justify-center space-x-3 mb-5">
            <div className="flex items-center justify-center space-x-3">
              <Skeleton className="w-15 h-13" />
              <SearchCarSkeleton />
            </div>
          </div>

          <Skeleton className="w-40 h-6 bg-gray-300 mb-4" />

          <div className="grid lg:grid-cols-4 gap-5 grid-cols-1 md:grid-cols-3 mb-8">
            {Array.from({ length: 8 }).map((_, i) => (
              <CarCardSkeleton key={i} />
            ))}
          </div>

          <div className="flex items-center justify-center">
            <Skeleton className="w-40 h-10 rounded-md" />
          </div>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-center space-x-3 mb-5">
            <FilterController />
          </div>

          <h1 className="text-xl font-bold my-3">Explore Cars</h1>

          <div className="grid lg:grid-cols-4 gap-5 grid-cols-1 md:grid-cols-3 mb-8">
            {cars.length === 0 ? (
              <div className="col-span-full flex items-center justify-center h-full">
                <h1 className="text-center text-xl font-semibold text-gray-500">
                  No result found
                </h1>
              </div>
            ) : (
              cars.map((car: Car) => <CarCard car={car} key={car.id} />)
            )}
          </div>

          {cars.length > 0 && (
            <Pagination
              pages={pages}
              pageNumber={pageNumber}
              route="/explore"
            />
          )}
        </>
      )}
    </section>
  );
};

export default ExploreCars;
