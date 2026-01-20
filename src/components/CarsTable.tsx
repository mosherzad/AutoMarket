import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { CarStatus, CarType } from "@/generated/prisma/enums";

type CarsTable = {
  brand: string;
  carType: CarType;
  year: string;
  price: number;
  status: CarStatus;
};

interface CarsTableProps {
  cars: CarsTable[];
}
const CarsTable = ({ cars }: CarsTableProps) => {
  return (
    <Table className="bg-white rounded-lg">
      <TableHeader>
        <TableRow>
          <TableHead className="py-3 px-4 font-semibold text-[17px]">
            #
          </TableHead>
          <TableHead className="py-3 px-4 font-semibold text-[17px]">
            Brand
          </TableHead>
          <TableHead className="py-3 px-4 font-semibold text-[17px]">
            Type
          </TableHead>
          <TableHead className="py-3 px-4 font-semibold text-[17px]">
            Year
          </TableHead>
          <TableHead className="py-3 px-4 font-semibold text-[17px]">
            Price
          </TableHead>
          <TableHead className="py-3 px-4 font-semibold text-[17px]">
            Status
          </TableHead>
          <TableHead className="py-3 px-4 text-right font-semibold text-[17px]">
            Action
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
            <TableCell className="py-3 px-4">{car.status}</TableCell>
            <TableCell className="py-3 px-4 text-right space-x-2">
              <Button variant="destructive" size="sm">
                Delete
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default CarsTable;
