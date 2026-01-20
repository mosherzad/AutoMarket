import { Car } from "@/generated/prisma/client";
import EditCarForm from "../EditCarForm";
import { getSingleCar } from "@/apiCalls/carApiCall";

interface EditCarProps {
  params: Promise<{ id: string }>;
}
const EditCarPage = async ({ params }: EditCarProps) => {
  const { id } = await params;
  const car: Car = await getSingleCar(id);
  return (
    <div>
      <EditCarForm car={car} id={id} />
    </div>
  );
};

export default EditCarPage;
