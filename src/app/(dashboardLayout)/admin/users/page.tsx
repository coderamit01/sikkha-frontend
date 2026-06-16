import UserListTable from "@/components/table/UserListTable";
import { getAllUser } from "@/services/auth.service";

const UserList = async () => {
  const data = await getAllUser();

  return <UserListTable users={data} />;
};

export default UserList;
