import TableLoader from "@/components/loader/TableLoader";
import UserListTable from "@/components/table/UserListTable";
import { Suspense } from "react";

const UserList = async () => {

  return (
    <Suspense fallback={<TableLoader />}>
      <UserListTable />
    </Suspense>
  );
};

export default UserList;
