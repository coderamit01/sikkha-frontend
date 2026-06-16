"use client";
import { createReview } from "@/actions/review.action";
import { BookingStatus, IBooking } from "@/types/booking.types";
import { IUser } from "@/types/user.types";
import { Star } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const ReviewForm = ({
  bookings,
  user,
}: {
  bookings: IBooking[];
  user: IUser;
}) => {
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { id } = useParams();

  const reviewableBooking = bookings?.find(
    (booking) =>
      booking.studentId === user.id &&
      booking.tutorId === id &&
      booking.status === BookingStatus.COMPLETED &&
      !booking.review,
  );

  if (!reviewableBooking) return null;

  const handleCreateComment = async () => {
    if (!user) {
      toast.error("Please login to leave a review.", { position: "top-right" });
      router.push("/login");
      return;
    }

    if (rating === 0) {
      toast.error("Please select a rating.", { position: "top-right" });
      return;
    }
    if (!comment.trim()) {
      toast.error("Please write a comment.", { position: "top-right" });
      return;
    }

    const result = await createReview({
      bookingId: reviewableBooking.id,
      rating,
      comment,
    });
    if (result?.success) {
      toast.success("Review submitted!", { position: "top-right" });
      setRating(0);
      setComment("");
      router.refresh();
    } else {
      toast.error(result?.message || "Failed to submit review.", {
        position: "top-right",
      });
    }
  };
  return (
    <div className="bg-gray-50 rounded-xl p-4 space-y-3 border border-dashed border-gray-200">
      <p className="font-semibold text-gray-800 text-sm">Leave a Review</p>

      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={24}
            className={`cursor-pointer transition-colors ${
              star <= (hovered || rating)
                ? "text-yellow-400 fill-yellow-400"
                : "text-gray-300"
            }`}
            onMouseEnter={() => setHovered(star)}
            onMouseLeave={() => setHovered(0)}
            onClick={() => setRating(star)}
          />
        ))}
        <span className="text-xs text-gray-400 ml-1">
          {rating > 0 ? `${rating}/5` : "Select"}
        </span>
      </div>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        rows={3}
        placeholder="Share your experience..."
        className="w-full border border-gray-200 rounded-xl p-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-brand"
      />

      <div className="flex justify-end">
        <button
          onClick={handleCreateComment}
          disabled={loading}
          className="p-3 bg-brand text-white rounded-xl text-sm font-semibold hover:opacity-90 disabled:opacity-60 cursor-pointer"
        >
          {loading ? "Submitting..." : "Submit Review"}
        </button>
      </div>
    </div>
  );
};

export default ReviewForm;
