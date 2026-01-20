import { getAllUsers } from "@/apiCalls/adimApiCall";
import UsersTable from "@/components/UsersTable";

export default async function AdminUsersPage() {
  const { users } = await getAllUsers();
  return (
    <div>
      <h2 className="mb-3 text-xl font-bold">Users</h2>
      <UsersTable users={users} />
    </div>
  );
}
