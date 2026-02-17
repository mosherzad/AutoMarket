import { getFavorites } from "@/apiCalls/favoritesApiCall";
import CarCard from "@/components/CarCard";
import { Prisma } from "@/generated/prisma/client";
import { getTranslations } from "next-intl/server";

type CarWithImage = Prisma.CarGetPayload<{
  include: { images: true };
}>;
type Favorite = {
  id: number;
  userId: number;
  carId: number;
  createdAt: string;
  car: CarWithImage;
};
const Favorites = async () => {
  const t = await getTranslations("favoritePage");
  const { favorites }: { favorites: Favorite[] } = (await getFavorites()) || [];
  await new Promise((reslove) => setTimeout(reslove, 3000));
  return (
    <section className="max-w-7xl container mx-auto max-sm:px-6 overflow-hidden min-h-screen">
      {favorites.length === 0 ? (
        <h1 className="text-2xl font-bold text-gray-600 my-3 flex items-center justify-center min-h-screen">
          <span>{t("noFavoriteCarsYet")}</span>
        </h1>
      ) : (
        <div>
          {" "}
          <h1 className="text-2xl font-bold my-3">{t("yourFavoriteCars")}</h1>
          <div className="grid lg:grid-cols-4 gap-5 grid-cols-1 md:grid-cols-3 mb-8">
            {favorites.map((favorite) => (
              <CarCard car={favorite.car} key={favorite.id} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default Favorites;
