import AdminBookingStats from "@/components/admin/AdminBookingStats";
import PopularCategories from "@/components/admin/PopularCategories";
import TopStats from "@/components/admin/TopStats";
import TopTutors from "@/components/admin/TopTutors";
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
      <div className="grid grid-cols-12 gap-5 pt-8">
        <div className="col-span-12 lg:col-span-6">
          <h2 className="font-semibold text-xl pb-3">Top Tutors</h2>
          <TopTutors bookings={bookings} />
        </div>
        <div className="col-span-12 lg:col-span-6">
          <h2 className="font-semibold text-xl pb-3">Popular Categories</h2>
          <PopularCategories bookings={bookings} />
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;