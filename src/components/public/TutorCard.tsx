import { ITutorDetails } from "@/types/tutor.types";
import { Star } from "lucide-react";
import Link from "next/link";
import DummyTutor from "@/assets/tutor.webp";

const TutorCard = ({ tutor }: { tutor: ITutorDetails }) => {
  const {
    id,
    user,
    institute,
    department,
    hourlyRate,
    yearsExperience,
    averageRating,
    category,
  } = tutor;

  return (
    <Link
      key={tutor.id}
      href={`/tutors/${id}`}
      className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-md hover:-translate-y-1 transition-all duration-200"
    >
      <div className="flex gap-4">
        {user?.image ? (
          <div className="w-14 h-14 rounded bg-violet-100 ring-2 ring-violet-100 shrink-0 flex items-center justify-center text-2xl">
            <img
              src={user?.image || DummyTutor.src}
              alt={user?.name}
              className="object-cover rounded"
            />
          </div>
        ) : (
          <div className="w-14 h-14 rounded bg-[#f2fbf9] text-brand flex items-center justify-center text-2xl font-semibold">
            {user?.name.charAt(0).toUpperCase()}
          </div>
        )}

        <div className="flex-1 min-w-0">
          <h3 className="text-base font-semibold text-gray-900">
            {user?.name}
          </h3>
          <p className="text-sm text-gray-800 capitalize">
            {institute && institute}
          </p>
          <p className="text-sm text-gray-800 capitalize">
            {department && department}
          </p>
          <p className="text-xs text-gray-500 capitalize">
            {yearsExperience} years experience
          </p>

          {category.length > 0 && (
            <div className="flex space-x-1">
              {category.map((cat) => (
                <div
                  key={cat.id}
                  className="inline-block bg-[#f2fbf9] text-brand rounded-full px-3 py-1 text-xs font-medium my-2"
                >
                  {cat.name}
                </div>
              ))}
            </div>
          )}
          <p className="text-sm text-gray-600 line-clamp-2">{user?.bio}</p>

          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
            <span className="text-lg font-bold text-gray-900">
              ${hourlyRate}
              <span className="text-xs font-normal text-gray-500">/hr</span>
            </span>
            <span className="flex space-x-1 items-center text-base text-gray-500 shrink-0">
              <Star className="text-yellow-400 h-4 w-4" />
              <span className="text-base">{averageRating}</span>
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default TutorCard;
