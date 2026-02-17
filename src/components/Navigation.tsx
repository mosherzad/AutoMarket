import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "@/i18n/navigation";
import { IoLanguage } from "react-icons/io5";
import { cookies } from "next/headers";
import LogoutButton from "./LogoutButton";
import { verifyTokenForPage } from "@/lib/verifyToken";
import { getTranslations } from "next-intl/server";
export default async function Navigation() {
  const t = await getTranslations("header");
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
            <DropdownMenuItem>
              <Link href={`/profile/${userPayload?.id}`}>{t("profile")}</Link>
            </DropdownMenuItem>

            <DropdownMenuItem>
              <Link href="/cars/my-cars">{t("myCars")}</Link>
            </DropdownMenuItem>

            <DropdownMenuItem>
              <Link href="/cars/favorites">{t("favorites")}</Link>
            </DropdownMenuItem>

            {userPayload?.isAdmin && (
              <DropdownMenuItem>
                <Link href="/admin">{t("dashboard")}</Link>
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
            <DropdownMenuItem>
              <Link href="/login">{t("signIn")}</Link>
            </DropdownMenuItem>

            <DropdownMenuItem>
              <Link href="/register">{t("register")}</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}

      <hr className="my-1 border-t border-gray-200" />

      <DropdownMenu>
        <DropdownMenuTrigger>
          <IoLanguage className="text-2xl cursor-pointer" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>
            <Link href={"/"} locale="en">
              English
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href={"/"} locale="ckb">
              كوردى
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href={"/"} locale="ar">
              العربية
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
