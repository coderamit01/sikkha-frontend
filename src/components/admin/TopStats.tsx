import { StatsCard } from "@/components/student/StatsCard";
import { BookingStatus, IBooking } from "@/types/booking.types";
import { IUser, Role } from "@/types/user.types";
import { ChartSpline, ShoppingBag, Users, UserStar } from "lucide-react";

const TopStats = ({ users, bookings }: { users: IUser[]; bookings: IBooking[] }) => {

  const stats = {
    totalUser: users.filter((u) => u.role === Role.STUDENT).length,
    totalTutor: users.filter((u) => u.role === Role.TUTOR).length,
    totalBookings: bookings.length,
    totalRevenue: bookings.filter(b => b.status === BookingStatus.COMPLETED).reduce((sum, b) => sum + b.totalPrice, 0),
  };
  return (
    <>
      <StatsCard
        icon={<Users className="h-10 w-10 p-2 rounded bg-blue-50 text-blue-700" />}
        title="Total Users"
        count={stats.totalUser}
      />
      <StatsCard
        icon={<UserStar className="h-10 w-10 p-2 rounded bg-yellow-50 text-yellow-700" />}
        title="Total Tutors"
        count={stats.totalTutor}
      />
      <StatsCard
        icon={<ShoppingBag className="h-10 w-10 p-2 rounded bg-green-50 text-green-700" />}
        title="Total Bookings"
        count={stats.totalBookings}
      />
      <StatsCard
        icon={<ChartSpline className="h-10 w-10 p-2 rounded bg-red-50 text-red-700" />}
        title="Total Revenue"
        count={stats.totalRevenue}
      />
    </>
  );
};

export default TopStats;
