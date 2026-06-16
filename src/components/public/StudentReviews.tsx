import ReviewCard from "@/components/public/ReviewCard";
import { ITutorDetails } from "@/types/tutor.types"


const StudentReviews = ({ tutor }: { tutor: ITutorDetails}) => {
  const { reviews } = tutor;
  return (
    <div className="pt-5 mb-5">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        Student Reviews
      </h2>

      {reviews.length > 0 ? (
        <div className="space-y-4">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review}/>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-linear-to-br from-gray-50 to-white rounded-2xl border-2 border-dashed border-gray-200">
          <p className="text-gray-500 text-base font-medium">
            No reviews yet.
          </p>
        </div>
      )}
    </div>
  )
}

export default StudentReviews