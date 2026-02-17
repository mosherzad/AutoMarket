import { getAllUsers } from "@/apiCalls/adimApiCall";
import UsersTable from "@/components/UsersTable";
import { getTranslations } from "next-intl/server";

export default async function AdminUsersPage() {
  const { users } = await getAllUsers();
  const t = await getTranslations("usersTable");
  return (
    <div>
      <h2 className="mb-3 text-xl font-bold">{t("adminUsersTitle")}</h2>
      <UsersTable users={users} />
    </div>
  );
}
