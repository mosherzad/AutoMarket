"use client";

import { DOMAIN } from "@/lib/constants";
import axios from "axios";
import { FaTrash } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { useTranslations } from "next-intl";

interface DeleteUserProfileProps {
  id: number;
}
const DeleteUserProfileButton = ({ id }: DeleteUserProfileProps) => {
  const t = useTranslations("deleteProfileBtn");
  const router = useRouter();
  const handleProfileDelete = () => {
    Swal.fire({
      title: "Delete your account ?",
      text: "This action cannot be undone!",
      icon: "warning",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Delete",
      denyButtonText: "Don't delete",
      confirmButtonColor: "#dc2626",
      denyButtonColor: "#6b7280",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`${DOMAIN}/api/users/profile/${id}`);

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
      onClick={handleProfileDelete}
      className="flex items-center justify-center space-x-2 w-full py-2 border border-red-500 text-red-600 rounded-lg hover:bg-red-50 transition cursor-pointer"
    >
      <FaTrash />
      <span>{t("title")}</span>
    </button>
  );
};

export default DeleteUserProfileButton;
