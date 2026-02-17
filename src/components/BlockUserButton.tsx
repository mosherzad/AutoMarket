"use client";

import axios from "axios";
import { MdBlock } from "react-icons/md";
import { toast } from "react-toastify";
import { useState } from "react";
import { DOMAIN } from "@/lib/constants";
import { useTranslations } from "next-intl";
interface BlockedUserButtonProps {
  userId: number;
  isBlocked: boolean;
}

const BlockUserButton = ({ userId, isBlocked }: BlockedUserButtonProps) => {
  const [blocked, setBlocked] = useState(isBlocked);
  const [loading, setLoading] = useState(false);
  const t = useTranslations("usersTable");
  const toggleBlock = async () => {
    try {
      setLoading(true);

      await axios.patch(`${DOMAIN}/api/admin/users/${userId}/block`, {
        isBlocked: !blocked,
      });

      setBlocked(!blocked);
      toast.success(blocked ? "User unblocked" : "User blocked");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      disabled={loading}
      onClick={toggleBlock}
      className={`flex items-center gap-1 rounded-lg max-w-35 px-4 py-2 text-xsm font-semibold text-white transition
        ${blocked ? "bg-green-600 hover:bg-green-700" : "bg-yellow-500 hover:bg-yellow-600"}
        ${loading && "opacity-50 cursor-not-allowed"}
      `}
    >
      <MdBlock size={18} />
      {blocked ? t("unblock") : t("blockUser")}
    </button>
  );
};

export default BlockUserButton;
