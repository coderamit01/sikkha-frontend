import AdminBookingStats from "@/components/admin/AdminBookingStats";
import TopStats from "@/components/admin/TopStats";
import { WelcomeCard } from "@/components/common/WelcomeCard";
import { getAllUser } from "@/services/auth.service";
import { getBookings } from "@/services/bookings.service";

const AdminDashboard = async () => {
  const data = await getAllUser();
  const users = data || [];
  const allBbookings = await getBookings();
  const bookings = allBbookings?.data || [];

  return (
    <>
      <div className="grid grid-cols-12 gap-5">
        <div className="col-span-12 lg:col-span-5">
          <WelcomeCard />
        </div>
        <div className="col-span-12 lg:col-span-7">
          <AdminBookingStats bookings={bookings} />
        </div>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 pt-8">
        <TopStats users={users} bookings={bookings} />
      </div>
     
    </>
  );
};

export default AdminDashboard;