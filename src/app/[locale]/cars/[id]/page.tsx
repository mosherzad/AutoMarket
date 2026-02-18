/* eslint-disable @typescript-eslint/no-explicit-any */
import { getSingleCar } from "@/apiCalls/carApiCall";
import AddToFavButton from "@/components/AddToFavButton";
import CarCard from "@/components/CarCard";
import CarGallery from "@/components/CarGallery";
import { Prisma } from "@/generated/prisma/client";
import { DOMAIN } from "@/lib/constants";
import { getTranslations } from "next-intl/server";
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

type CarWithImages = Prisma.CarGetPayload<{
  include: { images: true };
}>;
interface CarDetailsProps {
  params: Promise<{ id: string; locale: string }>;
}
const CarDetails = async ({ params }: CarDetailsProps) => {
  const { id, locale } = await params;
  const details = await getSingleCar(id);
  const t = await getTranslations("carDetails");
  const formatDate = (dateStr: string) =>
    new Intl.DateTimeFormat(locale, {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(new Date(dateStr));

  const response = await fetch(`${DOMAIN}/api/cars/related-cars`);
  const allCars: CarWithImages[] = await response.json();

  const relatedCars = allCars.filter((car) => car.carType === details.carType);
  return (
    <section className="container mx-auto max-w-7xl px-4">
      <div className="flex flex-col md:flex-row  gap-10 mt-10">
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
                label={t("brand")}
                value={details.brand}
              />
              <DetailItem
                icon={<FaCalendarAlt />}
                label={t("year")}
                value={details.year}
              />
              <DetailItem
                icon={<FaCogs />}
                label={t("gearbox")}
                value={t(`gearType.${details.transmission}`)}
              />
              <DetailItem
                icon={<FaGasPump />}
                label={t("fuel")}
                value={t(`fuelType.${details.fuel}`)}
              />
              <DetailItem
                icon={<FaRoad />}
                label={t("mileage")}
                value={details.mileage}
              />
              <DetailItem
                icon={<FaCogs />}
                label={t("cylinder")}
                value={details.cylinder}
              />
            </div>

            <div className="border-t pt-4">
              <p className="text-sm text-gray-500">{t("price")}</p>
              <p className="text-3xl font-bold">${details.price}</p>
            </div>

            <div className="flex gap-3">
              <AddToFavButton carId={id} />
            </div>
          </div>
        </div>
      </div>
      <div className="flex md:flex-row flex-col gap-10 mt-5">
        <div className="bg-white p-5 rounded-xl shadow-sm space-y-4 border w-full md:w-1/2">
          <h2 className="text-lg font-semibold">{t("sellerInfo")}</h2>
          <hr />
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
              <FaUser className="text-gray-500 text-xl" />
            </div>

            <div>
              <p className="font-medium capitalize">{details.user.username}</p>
              <p className="text-sm text-gray-500">
                {t("memberSince")} {formatDate(details.user.createdAt)}
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <InfoRow
              icon={<FaPhoneAlt />}
              label={t("phone")}
              value={details.contactNumber}
            />
            <InfoRow
              icon={<FaMapMarkerAlt />}
              label={t("location")}
              value={t(`locations.${details.location}`)}
            />
            <InfoRow
              icon={<FaCalendarAlt />}
              label={t("postDate")}
              value={new Date(details.createdAt).toLocaleDateString()}
            />
          </div>
        </div>
        <form action="" className="w-full md:w-1/2">
          <textarea
            name="description"
            placeholder={t("description")}
            value={details.description}
            rows={11}
            disabled
            className="resize-none bg-white border-neutral-900 w-full p-3 rounded-lg"
          ></textarea>
        </form>
      </div>
      <div className="mt-15">
        <h1 className="font-bold text-2xl mb-5 max-sm:m-3">
          {t("relatedCars")}
        </h1>
        <div className="grid lg:grid-cols-4 gap-5 grid-cols-1 md:grid-cols-3">
          {relatedCars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
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
        <p className="font-medium text-md">{value}</p>
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
