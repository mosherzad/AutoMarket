"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import BlockUserButton from "./BlockUserButton";
import DeleteUserButton from "./DeleteUserButton";

type UsersTable = {
  id: number;
  username: string;
  email: string;
  isAdmin: boolean;
  isBlocked: boolean;
  createdAt: Date;
  _count: {
    cars: number;
  };
};

interface UsersTableProps {
  users: UsersTable[];
}
export default function UsersTable({ users }: UsersTableProps) {
  return (
    <div className="rounded-md border bg-background">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="py-3 px-4 font-semibold text-[17px]">
              #
            </TableHead>
            <TableHead className="py-3 px-4 font-semibold text-[17px]">
              Username
            </TableHead>
            <TableHead className="py-3 px-4 font-semibold text-[17px]">
              Email
            </TableHead>
            <TableHead className="py-3 px-4 font-semibold text-[17px]">
              Cars
            </TableHead>
            <TableHead className="py-3 px-4 font-semibold text-[17px]">
              Role
            </TableHead>
            <TableHead className="py-3 px-4 font-semibold text-[17px]">
              Joined
            </TableHead>
            <TableHead className="py-3 px-4 text-center font-semibold text-[17px]">
              Actions
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
              <TableCell className="py-4 px-4">{user._count.cars}</TableCell>
              <TableCell className="py-4 px-4">
                {user.isAdmin ? "Admin" : "User"}
              </TableCell>
              <TableCell className="py-4 px-4">
                {new Date(user.createdAt).toLocaleDateString()}
              </TableCell>

              <TableCell className="flex items-center py-4 px-4 text-right space-x-5 justify-center">
                <BlockUserButton userId={user.id} isBlocked={user.isBlocked} />

                <DeleteUserButton userId={user.id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
