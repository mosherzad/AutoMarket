/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { DOMAIN } from "@/lib/constants";
import axios from "axios";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { toast } from "react-toastify";
interface AddToFavProps {
  carId: string;
}
const AddToFavButton = ({ carId }: AddToFavProps) => {
  const [isFav, setIsFav] = useState(false);
  const t = useTranslations("addToFavBtn");
  useEffect(() => {
    const loadFavorite = () => {
      const stored = localStorage.getItem(`fav-${carId}`);
      if (stored) setIsFav(JSON.parse(stored));
    };
    loadFavorite();
  }, [carId]);

  const handleFavorite = async () => {
    try {
      if (!isFav) {
        await axios.post(`${DOMAIN}/api/favorites/${carId}`);
        toast.success("Car added to favorites");
        setIsFav(true);
        localStorage.setItem(`fav-${carId}`, JSON.stringify(true));
      } else {
        await axios.delete(`${DOMAIN}/api/favorites/${carId}`);
        toast.success("Car removed from favorites");
        setIsFav(false);
        localStorage.setItem(`fav-${carId}`, JSON.stringify(false));
      }
    } catch (error: any) {
      toast.error(error.response.data.message || "Something went wrong!");
    }
  };
  return (
    <button
      onClick={handleFavorite}
      className="flex items-center justify-end text-md md:text-lg gap-2 px-4 py-3 rounded-lg border transition-all duration-300
                 hover:bg-gray-50 active:scale-95 cursor-pointer"
    >
      <FaHeart size={25} className={isFav ? "text-red-500" : "text-gray-400"} />
      <span className="font-semibold">
        {isFav ? t("removeToFav") : t("addToFav")}
      </span>
    </button>
  );
};

export default AddToFavButton;
