import StudentDashboardStats from "@/components/student/StudentDashboardStats";
import { WelcomeCard } from "@/components/common/WelcomeCard";
import { getBookings } from "@/services/bookings.service";
import { IBooking } from "@/types/booking.types";

const StudentDashboard = async () => {
  const data = await getBookings();
  const bookings: IBooking[] = data?.data ?? [];
  return (
    <>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 xl:col-span-5 ">
          <WelcomeCard />
        </div>
        <div className="col-span-12 xl:col-span-7">
          <StudentDashboardStats bookings={bookings} />
        </div>
      </div>
    </>
  );
};

export default StudentDashboard;
