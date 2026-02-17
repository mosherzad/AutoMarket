import { Car, User } from "@/generated/prisma/client";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { FaEdit } from "react-icons/fa";
import DeleteUserProfileButton from "./DeleteUserProfileButton";
import { getMyCars } from "@/apiCalls/carApiCall";
import { getFavorites } from "@/apiCalls/favoritesApiCall";
import { getTranslations } from "next-intl/server";
import { headers } from "next/headers";

interface ProfileProps {
  user: User;
}
const Profile = async ({ user }: ProfileProps) => {
  const myCars: Car[] = await getMyCars();
  const favData = await getFavorites();
  const myFavs = favData.favorites || [];
  const t = await getTranslations("profile");
  const countMyFavs = myFavs.length;
  const countMyCars = myCars.length;
  const headersList = await headers();
  const locale = headersList.get("x-next-intl-locale") || "en";
  return (
    <section className="max-w-6xl mx-auto px-4 mt-6 mb-10">
      <div className="relative bg-linear-to-r from-cyan-600 to-cyan-500 h-44 rounded-2xl shadow-lg">
        <div
          className={`absolute -bottom-12 ${locale === "ar" || locale === "ckb" ? "right-10" : "left-10"} h-28 w-28 rounded-full overflow-hidden border-4 border-white shadow-xl`}
        >
          <Image
            src={user.img || "/Images/user.png"}
            width={180}
            height={180}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="mt-16 flex flex-col lg:flex-row gap-10">
        <aside className="bg-white shadow rounded-2xl lg:w-1/3 p-6">
          <h2 className="text-2xl font-bold">{user.username}</h2>
          <div className="mt-3">
            <span className="text-sm font-semibold text-gray-600">
              {t("accountStatus")}
            </span>

            <span
              className={`ml-2 mr-2 px-3 py-1 text-xs font-semibold rounded-full ${
                user.isBlocked
                  ? "bg-red-100 text-red-600"
                  : "bg-green-100 text-green-600"
              }`}
            >
              {user.isBlocked ? t("blocked") : t("active")}
            </span>
          </div>

          <div className="mt-4">
            <p className="text-gray-600 text-sm">
              {t("email")} <span className="font-medium">{user.email}</span>
            </p>
            <p className="text-gray-600 text-sm mt-1">
              {t("joinDate")}
              <span className="font-sm ml-1 mr-1">
                {new Date(user.createdAt).toLocaleDateString(locale, {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </span>
            </p>
          </div>

          <div className="mt-6 flex flex-col gap-3">
            <Link
              href={`/profile/${user.id}/edit-profile`}
              className=" flex items-center justify-center space-x-2 w-full py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg transition cursor-pointer"
            >
              <FaEdit />
              <span>{t("editProfile")}</span>
            </Link>
            <DeleteUserProfileButton id={user.id} />
          </div>
        </aside>

        <main className="lg:col-span-3 flex flex-col gap-6">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="bg-white shadow rounded-xl p-5 text-center">
              <h3 className="text-sm text-gray-500">{t("favorites")}</h3>
              <p className="text-3xl font-bold mt-2">{countMyFavs}</p>
            </div>

            <div className="bg-white shadow rounded-xl p-5 text-center">
              <h3 className="text-sm text-gray-500">{t("carsPosted")}</h3>
              <p className="text-3xl font-bold mt-2">{countMyCars}</p>
            </div>
          </div>
        </main>
      </div>
    </section>
  );
};

export default Profile;
