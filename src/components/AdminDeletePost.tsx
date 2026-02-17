"use client";

import axios from "axios";
import { DOMAIN } from "@/lib/constants";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { MdDelete } from "react-icons/md";

interface AdminDeleteProp {
  postId: number;
}
export const AdminDeletePost = ({ postId }: AdminDeleteProp) => {
  const router = useRouter();
  const t = useTranslations("carTable");

  console.log(postId);
  const handleDeletePost = async () => {
    Swal.fire({
      title: t("title"),
      text: t("text"),
      icon: "warning",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: t("confirmButtonText"),
      denyButtonText: t("denyButtonText"),
      cancelButtonText: t("cancelButtonText"),
      confirmButtonColor: "#dc2626",
      denyButtonColor: "#6b7280",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`${DOMAIN}/api/admin/cars/${postId}`);

          Swal.fire("Deleted!", "User has been deleted.", "success");
          router.refresh();

          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
          Swal.fire(
            "Error",
            error.response?.data?.message || "Something went wrong",
            "error",
          );
        }
      } else if (result.isDenied) {
        Swal.fire("Cancelled", "User was not deleted", "info");
      }
    });
  };
  return (
    <button
      onClick={handleDeletePost}
      className="flex items-center space-x-2 rounded-lg px-2 cursor-pointer py-2 text-sm font-semibold bg-red-500 text-white hover:bg-red-600 duration-200 transition-all"
    >
      <MdDelete size={20} />
      <span>{t("delete")}</span>
    </button>
  );
};
