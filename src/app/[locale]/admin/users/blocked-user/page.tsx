import { getBlockedUsersCount } from "@/apiCalls/adimApiCall";
import BlockUserButton from "@/components/BlockUserButton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getTranslations } from "next-intl/server";

type BlockedUser = {
  id: number;
  username: string;
  email: string;
  isAdmin: boolean;
  isBlocked: boolean;
  createdAt: Date;
};

type getBlockedUsersResponse = {
  users: BlockedUser[];
};
const BlockedUserPage = async () => {
  const blockedUsers: getBlockedUsersResponse = await getBlockedUsersCount();
  const { users } = blockedUsers;
  const t = await getTranslations("usersTable");
  return (
    <div>
      <h1 className="text-xl font-bold mb-4">{t("adminBlockedTitle")}</h1>

      <Table className="rounded-md border bg-background">
        <TableHeader>
          <TableRow>
            <TableHead className="py-3 px-4 font-semibold text-[17px]">
              #
            </TableHead>
            <TableHead className="py-3 px-4 font-semibold text-[17px]">
              {t("username")}
            </TableHead>
            <TableHead className="py-3 px-4 font-semibold text-[17px]">
              {t("email")}
            </TableHead>
            <TableHead className="py-3 px-4 font-semibold text-[17px]">
              {t("role")}
            </TableHead>
            <TableHead className="py-3 px-4 font-semibold text-[17px]">
              {t("joined")}
            </TableHead>
            <TableHead className="py-3 px-4 text-center font-semibold text-[17px]">
              {t("actions")}
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {users.map((user, index: number) => (
            <TableRow key={user.id} className="min-h-15">
              <TableCell className="py-4 px-4 font-semibold">
                {index + 1}
              </TableCell>
              <TableCell className="py-4 px-4">{user.username}</TableCell>
              <TableCell className="py-4 px-4">{user.email}</TableCell>
              <TableCell className="py-4 px-4">
                {user.isAdmin ? t("admin") : t("user")}
              </TableCell>
              <TableCell className="py-4 px-4">
                {new Date(user.createdAt).toLocaleDateString()}
              </TableCell>

              <TableCell className="flex items-center py-4 px-4 text-right space-x-5 justify-center">
                <BlockUserButton userId={user.id} isBlocked={user.isBlocked} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default BlockedUserPage;
