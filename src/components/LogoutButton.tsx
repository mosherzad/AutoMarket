/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import axios from "axios";
import { MdLogout } from "react-icons/md";
import { toast } from "react-toastify";
import { useRouter } from "@/i18n/navigation";
import { DOMAIN } from "@/lib/constants";
import { useTranslations } from "next-intl";
const LogoutButton = () => {
  const router = useRouter();
  const handleLogout = async () => {
    try {
      await axios.get(`${DOMAIN}/api/users/logout`);
      router.replace("/");
      router.refresh();
    } catch (error: any) {
      toast.error(error.response.message);
    }
  };
  const t = useTranslations("logoutButton");
  return (
    <div
      onClick={handleLogout}
      className="flex text-md items-center space-x-2 text-neutral-900 border border-gray-100  hover:bg-gray-50 cursor-pointer font-semibold pl-0  py-2 rounded-lg transition-all duration-300"
    >
      <MdLogout size={25} />
      <button className="cursor-pointer">{t("title")}</button>
    </div>
  );
};

export default LogoutButton;
