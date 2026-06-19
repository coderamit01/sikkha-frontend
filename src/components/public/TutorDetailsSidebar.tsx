import AvailabilityButton from "@/components/public/AvailabilityButton";
import SessionBookButton from "@/components/public/SessionBookButton";
import { ITutorDetails } from "@/types/tutor.types";
import { IUser } from "@/types/user.types";
import { AvailableTabs } from "./AvailableTabs";

const TutorDetailsSidebar = ({
  tutor,
  user,
}: {
  tutor: ITutorDetails;
  user: IUser;
}) => {
  const { id: tutorId, availability, hourlyRate } = tutor;
  const tutorName = tutor.user.name;

  return (
    <div className="sticky top-24 bg-white rounded-3xl overflow-hidden">
      <div className="bg-brand text-white p-4">
        <p className="text-white text-base font-medium mb-2">Price per hour</p>
        <p className="text-5xl font-bold mb-1">${hourlyRate}</p>
      </div>
      <div className="p-4 space-y-6">
        <div>
          <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
            Available Time Slots
          </h3>

          <AvailableTabs availablity={availability} />
        </div>
        <SessionBookButton
          tutorId={tutorId}
          user={user}
          tutorName={tutorName}
          hourlyRate={hourlyRate as number}
          enablePayment={true}
        />
      </div>
    </div>
  );
};

export default TutorDetailsSidebar;
