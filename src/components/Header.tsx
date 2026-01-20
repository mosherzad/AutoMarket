import Link from "next/link";
import Navigation from "./Navigation";
import {
  MdOutlineAdd,
  MdDashboard,
  MdExplore,
  MdHomeFilled,
} from "react-icons/md";
import { cookies } from "next/headers";
import { verifyTokenForPage } from "@/lib/verifyToken";

export default async function Header() {
  const storeCookie = await cookies();
  const token = storeCookie.get("jwtToken")?.value || "";
  const userPayload = verifyTokenForPage(token);
  const isLoggedin = !!userPayload;
  return (
    <header className="border-b shadow-sm overflow-hidden bg-white">
      <nav className="container mx-auto max-w-7xl flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-20">
          <Link href="/" className="font-bold text-xl">
            AutoMarket
          </Link>

          <div className="md:flex items-center gap-10 hidden">
            <Link
              href="/"
              className="text-lg font-medium flex items-center gap-1 hover:underline hover:text-red-700 transition-all duration-300"
            >
              <MdHomeFilled size={25} />
              <span>Home</span>
            </Link>
            <Link
              href="/explore?pageNumber=1"
              className="text-lg font-medium flex items-center gap-1 hover:underline hover:text-red-700 transition-all duration-300"
            >
              <MdExplore size={25} />
              <span>Explore Cars</span>
            </Link>
            {isLoggedin && (
              <div className="flex items-center gap-10">
                <Link
                  href="/cars/add"
                  className="text-lg font-medium flex items-center gap-1 hover:underline hover:text-red-700 transition-all duration-300"
                >
                  <MdOutlineAdd size={25} />
                  <span>Add Cars</span>
                </Link>
              </div>
            )}
            {userPayload?.isAdmin && (
              <Link
                href="/admin"
                className="text-lg font-medium flex items-center gap-1 hover:underline hover:text-red-700 transition-all duration-300"
              >
                <MdDashboard size={25} />
                <span>Dashboard</span>
              </Link>
            )}
          </div>
        </div>

        <Navigation />
      </nav>
    </header>
  );
}
