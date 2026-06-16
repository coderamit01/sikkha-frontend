import { IUser } from "@/types/user.types";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import UsersRow from "./UsersRow";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

const UserListTable = ({ users }: { users: IUser[] }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>User List</CardTitle>
        <CardContent className="px-0">
          <Table className="text-base">
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Verified</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <UsersRow key={user.id} user={user} />
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </CardHeader>
    </Card>
  );
};

export default UserListTable;
