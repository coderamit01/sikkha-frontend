import TutorCard from "@/components/public/TutorCard"
import { ITutorDetails } from "@/types/tutor.types"

const TutorList = ({ tutors }: { tutors: ITutorDetails[] }) => {
  return (
    <div>
      {tutors.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tutors.map((tutor) => (
            <TutorCard key={tutor.id} tutor={tutor} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-gray-700 text-lg mb-2">No tutors found</p>
        </div>
      )}
    </div>
  )
}

export default TutorList