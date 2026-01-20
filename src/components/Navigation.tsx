import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { FaUserCircle } from "react-icons/fa";
import Link from "next/link";
import { IoLanguage } from "react-icons/io5";
import { cookies } from "next/headers";
import LogoutButton from "./LogoutButton";
import { verifyTokenForPage } from "@/lib/verifyToken";
export default async function Navigation() {
  const cookieStore = await cookies();
  const token = cookieStore.get("jwtToken")?.value || "";
  const userPayload = verifyTokenForPage(token);
  return (
    <div className="flex items-center gap-4">
      {token ? (
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <FaUserCircle
              size={26}
              className="cursor-pointer hover:text-red-700 transition-all"
            />
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-52">
            <div className="px-3 py-2 border-b">
              <p className="font-semibold text-sm text-left">
                {userPayload?.username}
              </p>
              <p className="text-xs text-gray-500 truncate"></p>
            </div>

            <DropdownMenuItem asChild>
              <Link href={`/profile/${userPayload?.id}`}>Profile</Link>
            </DropdownMenuItem>

            <DropdownMenuItem asChild>
              <Link href="/cars/my-cars">My Cars</Link>
            </DropdownMenuItem>

            <DropdownMenuItem asChild>
              <Link href="/cars/favorites">Favorites</Link>
            </DropdownMenuItem>

            {userPayload?.isAdmin && (
              <DropdownMenuItem asChild>
                <Link href="/admin">Dashboard</Link>
              </DropdownMenuItem>
            )}

            <DropdownMenuItem>
              <LogoutButton />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <FaUserCircle
              size={26}
              className="cursor-pointer hover:text-red-700 transition-all"
            />
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <Link href="/login">Sign In</Link>
            </DropdownMenuItem>

            <DropdownMenuItem asChild>
              <Link href="/register">Register</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}

      <hr className="my-1 border-t border-gray-200" />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <IoLanguage className="text-2xl cursor-pointer" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>
            <Link href={"/en"}>English</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href={"/ar"}>العربية</Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
