"use client";
import { IUser } from "@/types/user.types";
import { TableCell, TableRow } from "@/components/ui/table";
import { SquarePen } from "lucide-react";
import { Badge } from "../ui/badge";
import { useState } from "react";
import UpdateUserModal from "../modal/UpdateUserModal";
const UsersRow = ({ user }: { user: IUser }) => {
  const [isOpen, setIsOpen] = useState(false);

  const { name, email, role, emailVerified, isBanned } = user;

  const handleOpen = () => {
    setIsOpen(true);
  };
  return (
    <TableRow>
      <TableCell>{name}</TableCell>
      <TableCell>{email}</TableCell>
      <TableCell>
        {emailVerified ? (
          <Badge className="bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300">
            Yes
          </Badge>
        ) : (
          <Badge className="bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300">
            No
          </Badge>
        )}
      </TableCell>
      <TableCell>{role.charAt(0) + role.slice(1).toLowerCase()}</TableCell>
      <TableCell>
        {isBanned ? (
          <Badge className="bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300">
            Banned
          </Badge>
        ) : (
          <Badge className="bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300">
            Active
          </Badge>
        )}
      </TableCell>
      <TableCell className="text-right flex items-center gap-2 justify-end">
        <SquarePen
          onClick={handleOpen}
          className="w-6 h-6 cursor-pointer bg-slate-200 p-1 rounded"
        />

        <UpdateUserModal isOpen={isOpen} setIsOpen={setIsOpen} user={user} />
      </TableCell>
    </TableRow>
  );
};

export default UsersRow;
