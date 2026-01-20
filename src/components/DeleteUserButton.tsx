import { DOMAIN } from "@/lib/constants";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
interface DeleteUserButtonProps {
  userId: number;
}
const DeleteUserButton = ({ userId }: DeleteUserButtonProps) => {
  const router = useRouter();
  const handleDeleteUser = () => {
    Swal.fire({
      title: "Delete this user?",
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
        Swal.fire("Cancelled", "User was not deleted", "info");
      }
    });
  };
  return (
    <button
      onClick={handleDeleteUser}
      className="flex items-center space-x-2 rounded-lg px-4 cursor-pointer py-2 text-sm font-semibold bg-red-500 text-white hover:bg-red-600 duration-200 transition-all"
    >
      <MdDelete size={20} />
      <span>Delete</span>
    </button>
  );
};

export default DeleteUserButton;
