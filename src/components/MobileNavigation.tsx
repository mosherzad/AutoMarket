import Link from "next/link";
import {
  MdDashboard,
  MdHomeFilled,
  MdExplore,
  MdPostAdd,
} from "react-icons/md";

import { cookies } from "next/headers";
import { verifyTokenForPage } from "@/lib/verifyToken";
const MobileNavigation = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("jwtToken")?.value || "";
  const userPayload = verifyTokenForPage(token);
  return (
    <nav className="container mx-auto max-w-7xl fixed bottom-0 left-0 px-5 py-5 right-0 bg-white border-t border-gray-200 md:hidden z-50">
      <div className="flex items-center gap-8 justify-around">
        <Link
          href="/"
          className={`font-medium flex items-center gap-1 hover:underline hover:text-red-700 transition-all duration-300`}
        >
          <MdHomeFilled size={35} />
        </Link>
        <Link
          href="/explore?pageNumber=1"
          className={`font-medium flex items-center gap-1 hover:underline hover:text-red-700 transition-all duration-300 }`}
        >
          <MdExplore size={35} />
        </Link>
        {token && (
          <div className="flex items-center gap-11">
            <Link
              href="/cars/add"
              className={`font-medium  gap-1 hover:underline hover:text-red-700 transition-all duration-300`}
            >
              <MdPostAdd size={35} />
            </Link>
          </div>
        )}
        {userPayload?.isAdmin && (
          <Link
            href="/admin"
            className={`font-medium  gap-1 hover:underline hover:text-red-700 transition-all duration-300`}
          >
            <MdDashboard size={35} />
          </Link>
        )}
      </div>
    </nav>
  );
};

export default MobileNavigation;
