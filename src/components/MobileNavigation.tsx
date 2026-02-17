import Link from "next/link";
import {
  MdDashboard,
  MdHomeFilled,
  MdExplore,
  MdPostAdd,
} from "react-icons/md";

import { cookies } from "next/headers";
import { verifyTokenForPage } from "@/lib/verifyToken";
import { getTranslations } from "next-intl/server";
const MobileNavigation = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("jwtToken")?.value || "";
  const userPayload = verifyTokenForPage(token);
  const t = await getTranslations("header");
  return (
    <nav className="container mx-auto max-w-7xl fixed bottom-0 left-0 px-5 py-5 right-0 bg-white border-t border-gray-200 md:hidden z-50">
      <div className="flex items-center gap-12 justify-center">
        <Link
          href="/"
          className={`font-medium flex flex-col items-center gap-1 hover:underline hover:text-red-700 transition-all duration-300`}
        >
          <MdHomeFilled size={30} />
          <span className="text-sm">{t("home")}</span>
        </Link>
        <Link
          href="/explore?pageNumber=1"
          className={`font-medium flex flex-col items-center gap-1 hover:underline hover:text-red-700 transition-all duration-300 }`}
        >
          <MdExplore size={30} />
          <span className="text-sm">{t("explore")}</span>
        </Link>
        <div className="flex items-center gap-12">
          {token && (
            <div className="">
              <Link
                href="/cars/add"
                className={`font-medium flex flex-col items-center  gap-1 hover:underline hover:text-red-700 transition-all duration-300`}
              >
                <MdPostAdd size={30} />
                <span className="text-sm">{t("addCar")}</span>
              </Link>
            </div>
          )}
          {userPayload?.isAdmin && (
            <Link
              href="/admin"
              className={`font-medium flex flex-col items-center gap-1 hover:underline hover:text-red-700 transition-all duration-300`}
            >
              <MdDashboard size={30} />
              <span className="text-sm">{t("dashboard")}</span>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default MobileNavigation;
