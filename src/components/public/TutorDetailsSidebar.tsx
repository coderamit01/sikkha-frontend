import AvailabilityButton from "@/components/public/AvailabilityButton";
import SessionBookButton from "@/components/public/SessionBookButton";
import { ITutorDetails } from "@/types/tutor.types"
import { IUser } from "@/types/user.types";


const TutorDetailsSidebar = ({ tutor, user }: { tutor: ITutorDetails, user: IUser }) => {
  const { id: tutorId, availablity,hourlyRate } = tutor;
  return (
    <div className="sticky top-24 bg-white rounded-3xl overflow-hidden">
      <div className="bg-brand text-white p-8">
        <p className="text-white text-base font-medium mb-2">
          Price per hour
        </p>
        <p className="text-5xl font-bold mb-1">${hourlyRate}</p>
      </div>
      <div className="p-6 space-y-6">
        <div>
          <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
            Available Time Slots
          </h3>

          {availablity && availablity.length > 0 ? (
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {availablity.map((available) => (
                <AvailabilityButton key={available.id} available={available} />
              ))}
            </div>
          ) : (
            <div className="text-center py-8 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
              <p className="text-gray-500 text-sm">
                No available slots
              </p>
            </div>
          )}
        </div>
        <SessionBookButton tutorId={tutorId} user={user} />
      </div>
    </div>
  )
}

export default TutorDetailsSidebar