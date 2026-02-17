import { Prisma } from "@/generated/prisma/client";
import EditCarForm from "../EditCarForm";
import { getSingleCar } from "@/apiCalls/carApiCall";

type CarWithImages = Prisma.CarGetPayload<{
  include: { images: true };
}>;

interface EditCarProps {
  car: CarWithImages;
  params: Promise<{ id: string }>;
}
const EditCarPage = async ({ params }: EditCarProps) => {
  const { id } = await params;
  const car: CarWithImages = await getSingleCar(id);
  return (
    <div>
      <EditCarForm car={car} id={id} />
    </div>
  );
};

export default EditCarPage;
