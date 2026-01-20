import { getFavorites } from "@/apiCalls/favoritesApiCall";
import CarCard from "@/components/CarCard";
import { Car } from "@/generated/prisma/client";

type Favorite = {
  id: number;
  userId: number;
  carId: number;
  createdAt: string;
  car: Car;
};
const Favorites = async () => {
  const { favorites }: { favorites: Favorite[] } = (await getFavorites()) || [];
  await new Promise((reslove) => setTimeout(reslove, 3000));
  return (
    <section className="max-w-7xl container mx-auto max-sm:px-6 overflow-hidden">
      {favorites.length === 0 ? (
        <h1 className="text-2xl font-bold my-3">No favorite cars yet</h1>
      ) : (
        <div>
          {" "}
          <h1 className="text-2xl font-bold my-3">Your Favorite Cars</h1>
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
