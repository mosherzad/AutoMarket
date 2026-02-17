import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CarStatus, CarType } from "@/generated/prisma/enums";
import { getTranslations } from "next-intl/server";
import { cookies } from "next/headers";
import { AdminDeletePost } from "./AdminDeletePost";

type CarsTable = {
  brand: string;
  carType: CarType;
  year: string;
  price: number;
  status: CarStatus;
  id: number;
};

interface CarsTableProps {
  cars: CarsTable[];
}
const CarsTable = async ({ cars }: CarsTableProps) => {
  const t = await getTranslations("carTable");
  const cookieStore = await cookies();
  const locale = cookieStore.get("NEXT_LOCALE")?.value || "en";
  return (
    <Table className="bg-white rounded-lg">
      <TableHeader>
        <TableRow>
          <TableHead
            className={`py-3 px-4 ${locale === "ar" || locale === "ckb" ? "text-right" : ""} font-semibold text-[17px]`}
          >
            #
          </TableHead>
          <TableHead
            className={`py-3 px-4 ${locale === "ar" || locale === "ckb" ? "text-right" : ""} font-semibold text-[17px]`}
          >
            {t("brand")}
          </TableHead>
          <TableHead
            className={`py-3 px-4 ${locale === "ar" || locale === "ckb" ? "text-right" : ""} font-semibold text-[17px]`}
          >
            {t("type")}
          </TableHead>
          <TableHead
            className={`py-3 px-4 ${locale === "ar" || locale === "ckb" ? "text-right" : ""} font-semibold text-[17px]`}
          >
            {t("year")}
          </TableHead>
          <TableHead
            className={`py-3 px-4 ${locale === "ar" || locale === "ckb" ? "text-right" : ""} font-semibold text-[17px]`}
          >
            {t("price")}
          </TableHead>
          <TableHead
            className={`py-3 px-4 ${locale === "ar" || locale === "ckb" ? "text-right" : ""} font-semibold text-[17px]`}
          >
            {t("status")}
          </TableHead>
          <TableHead
            className={`py-3 px-4  text-right font-semibold text-[17px`}
          >
            {t("action")}
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {cars.map((car, index) => (
          <TableRow key={index}>
            <TableCell className="py-3 px-4">{index + 1}</TableCell>
            <TableCell className="py-3 px-4">{car.brand}</TableCell>
            <TableCell className="py-3 px-4">{car.carType}</TableCell>
            <TableCell className="py-3 px-4">{car.year}</TableCell>
            <TableCell className="py-3 px-4">${car.price}</TableCell>
            <TableCell className="py-3 px-4">
              {t(`carStatus.${car.status}`)}
            </TableCell>
            <TableCell>
              {" "}
              <AdminDeletePost postId={car.id} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default CarsTable;
