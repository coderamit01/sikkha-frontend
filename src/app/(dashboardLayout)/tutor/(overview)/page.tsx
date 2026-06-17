import { WelcomeCard } from "@/components/common/WelcomeCard";
import { TutorDashboardStats } from "@/components/tutor/TutorDashboardStats";
import UpcommingSession from "@/components/tutor/UpcommingSession";
import { getMe } from "@/lib/getMe";
import { getBookings } from "@/services/bookings.service";
import { IBooking } from "@/types/booking.types";
import { ITutorDetails } from "@/types/tutor.types";

const AdminDashboard = async () => {
  const data = await getBookings();
  const bookings: IBooking[] = data?.data ?? [];
  const { data: user } = await getMe();
  const tutor: ITutorDetails = user?.tutor;

  return (
    <>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 xl:col-span-5 ">
          <WelcomeCard />
        </div>
        <div className="col-span-12 xl:col-span-7">
          <UpcommingSession bookings={bookings} />
        </div>
      </div>
      <div className="pt-5">
        <TutorDashboardStats bookings={bookings} tutor={tutor} />
      </div>
    </>
  );
};

export default AdminDashboard;
