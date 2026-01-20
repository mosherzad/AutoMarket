import { getAllCars } from "@/apiCalls/adimApiCall";
import CarsTable from "@/components/CarsTable";
import Pagination from "@/components/Pagination";
import { POST_PER_PAGE_ADMIN } from "@/lib/constants";
import prisma from "@/lib/prisma";

interface AdminCarsPageProps {
  searchParams: { pageNumber: string };
}
export default async function AdminCarsPage({
  searchParams,
}: AdminCarsPageProps) {
  const { pageNumber } = (await searchParams) ?? "1";
  const count = await prisma.car.count();
  const pages = Math.ceil(count / POST_PER_PAGE_ADMIN);
  const { cars } = await getAllCars(pageNumber);

  return (
    <div>
      <h2 className="mb-3 text-xl font-bold">Cars</h2>

      <CarsTable cars={cars} />
      <Pagination
        route="/admin/cars"
        pageNumber={parseInt(pageNumber)}
        pages={pages}
      />
    </div>
  );
}
