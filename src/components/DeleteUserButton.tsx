import { DOMAIN } from "@/lib/constants";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
interface DeleteUserButtonProps {
  userId: number;
}
const DeleteUserButton = ({ userId }: DeleteUserButtonProps) => {
  const router = useRouter();
  const t = useTranslations("usersTable");
  const handleDeleteUser = () => {
    Swal.fire({
      title: t("title"),
      text: t("text"),
      icon: "warning",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: t("confirmButtonText"),
      denyButtonText: t("denyButtonText"),
      confirmButtonColor: "#dc2626",
      denyButtonColor: "#6b7280",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`${DOMAIN}/api/admin/users/${userId}/delete`);

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
        Swal.fire(t("cancled"), t("userWasNotDeleted"), "info");
      }
    });
  };
  return (
    <button
      onClick={handleDeleteUser}
      className="flex items-centerspace-x-2 rounded-lg px-2 cursor-pointer py-2 text-sm font-semibold bg-red-500 text-white hover:bg-red-600 duration-200 transition-all"
    >
      <MdDelete size={20} />
      <span>{t("deleteUser")}</span>
    </button>
  );
};

export default DeleteUserButton;
