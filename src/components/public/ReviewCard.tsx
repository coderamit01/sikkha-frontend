import { IReview } from "@/types/review.type"
import { Star, User } from "lucide-react";

const ReviewCard = ({ review }: { review: IReview }) => {

  const { comment, rating, createdAt, student } = review;

  const date = new Date(createdAt).toLocaleDateString("en-US", {
    month: "numeric",
    day: "numeric",
    year: "numeric"
  });


  return (
    <div
      className="bg-linear-to-r from-gray-50 to-white rounded-2xl p-6 border border-gray-100 transition-all duration-200"
    >
      <div className="flex items-start gap-4 mb-3">
        <div className="w-12 h-12 rounded-full bg-[#25a5a21c] text-brand flex items-center justify-center text-xl shrink-0">
          <User className="text-brand" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-4">
            <h4 className="font-bold text-gray-900">
              {student?.name}
            </h4>
            <span className="text-sm text-gray-500 shrink-0">
              {date}
            </span>
          </div>
          <div className="flex space-x-1 items-center">
            {
              [1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={20} className={star <= rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
                />
              ))
            }
          </div>
        </div>
      </div>
      <p className="text-gray-700 leading-relaxed pt-2">
        {comment}
      </p>
    </div>
  )
}

export default ReviewCard