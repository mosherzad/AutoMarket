import { Prisma } from "@/generated/prisma/client";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/navigation";

type CarWithImage = Prisma.CarGetPayload<{
  include: { images: true };
}>;
interface CarCarProps {
  car: CarWithImage;
}
const CarCard = ({ car }: CarCarProps) => {
  const t = useTranslations("carCard");
  return (
    <section className="flex flex-col border border-gray-300 rounded-lg container mx-auto max-sm:w-sm bg-white hover:shadow-lg transition-all duration-200 hover:scale-99">
      <div className="w-full h-50 flex items-center justify-center relative  overflow-hidden">
        <Image
          src={car.images[0]?.url || "/images/1.jpg"}
          fill
          alt="car image"
          className="hover:scale-105 transition-all duration-300 rounded-t-lg object-cover"
        />
      </div>
      <div className="p-2">
        <Link
          href={`/cars/${car.id}`}
          className="text-sm lg:text-xl font-bold line-clamp-1 hover:underline"
        >
          {car.brand}
        </Link>
        <p className="line-clamp-1">{car.description}</p>
        <p className="flex items-center justify-between">
          <span className="font-bold ">${car.price.toString()}</span>
          <span className="text-gray-500">{t(`status.${car.status}`)}</span>
        </p>
        <div>
          <Link
            href={`/cars/${car.id}`}
            className="float-right px-3 py-1 rounded-lg bg-gray-100 text-neutral-800 font-semibold my-3 hover:bg-gray-200 transition-all duration-200"
          >
            {t("seeDetails")}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CarCard;
