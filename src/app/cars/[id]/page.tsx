/* eslint-disable @typescript-eslint/no-explicit-any */
import { getSingleCar } from "@/apiCalls/carApiCall";
import AddToFavButton from "@/components/AddToFavButton";
import CarGallery from "@/components/CarGallery";
import {
  FaCar,
  FaCogs,
  FaGasPump,
  FaRoad,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaUser,
} from "react-icons/fa";

interface CarDetailsProps {
  params: Promise<{ id: string }>;
}
const CarDetails = async ({ params }: CarDetailsProps) => {
  const { id } = await params;

  const details = await getSingleCar(id);
  return (
    <section className="container mx-auto max-w-7xl px-4">
      <div className="flex flex-col lg:flex-row  gap-10 mt-10">
        <CarGallery images={details.images.map((img: any) => img.url)} />
        <div className="w-full md:w-1/2">
          <div className="bg-white p-6 rounded-xl shadow-sm space-y-6">
            <div>
              <h1 className="text-2xl font-bold">{details.brand}</h1>
              <p className="text-gray-500 text-sm">{details.carType}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <DetailItem
                icon={<FaCar />}
                label="Brand"
                value={details.brand}
              />
              <DetailItem
                icon={<FaCalendarAlt />}
                label="Year"
                value={details.year}
              />
              <DetailItem
                icon={<FaCogs />}
                label="Gearbox"
                value={details.transmission}
              />
              <DetailItem
                icon={<FaGasPump />}
                label="Fuel"
                value={details.fuel}
              />
              <DetailItem
                icon={<FaRoad />}
                label="Mileage"
                value={details.mileage}
              />
              <DetailItem
                icon={<FaCogs />}
                label="Cylinder"
                value={details.cylinder}
              />
            </div>

            <div className="border-t pt-4">
              <p className="text-sm text-gray-500">Price</p>
              <p className="text-3xl font-bold">${details.price}</p>
            </div>

            <div className="flex gap-3">
              <AddToFavButton carId={id} />
            </div>
          </div>
        </div>
      </div>
      <div className="flex lg:flex-row flex-col gap-10 mt-5">
        <div className="bg-white p-5 rounded-xl shadow-sm space-y-4 border w-full md:w-1/2">
          <h2 className="text-lg font-semibold">Seller Information</h2>
          <hr />
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
              <FaUser className="text-gray-500 text-xl" />
            </div>

            <div>
              <p className="font-medium capitalize">{details.user.username}</p>
              <p className="text-sm text-gray-500">
                Member since{" "}
                {new Date(details.user.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <InfoRow
              icon={<FaPhoneAlt />}
              label="Phone"
              value={details.contactNumber}
            />
            <InfoRow
              icon={<FaMapMarkerAlt />}
              label="Location"
              value={details.location}
            />
            <InfoRow
              icon={<FaCalendarAlt />}
              label="Post Date"
              value={new Date(details.createdAt).toLocaleDateString()}
            />
          </div>
        </div>
        <form action="" className="w-full md:w-1/2">
          <textarea
            name="description"
            placeholder="Description"
            value={details.description}
            rows={11}
            disabled
            className="resize-none bg-white border-neutral-900 w-full p-3 rounded-lg"
          ></textarea>
        </form>
      </div>
      <div className="mt-5">
        <h1 className="font-bold text-2xl mb-3">Related Cars</h1>
        <div className="grid lg:grid-cols-4 gap-5 grid-cols-1 md:grid-cols-3">
          {/* <CarCard />
          <CarCard />
          <CarCard />
          <CarCard />
          <CarCard />
          <CarCard />
          <CarCard />
          <CarCard /> */}
        </div>
      </div>
    </section>
  );
};

function DetailItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
      <span className="text-red-600 text-lg">{icon}</span>
      <div>
        <p className="text-xs text-gray-500">{label}</p>
        <p className="font-medium">{value}</p>
      </div>
    </div>
  );
}

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3 text-sm">
      <span className="text-red-600 text-[15px]">{icon}</span>
      <span className="text-gray-500 text-[15px]">{label}:</span>
      <span className="font-medium text-[15px]">{value}</span>
    </div>
  );
}

export default CarDetails;
