import Link from "next/link";
import { BookOpen, Users, Star } from "lucide-react";
import { getTutorByID } from "@/services/tutor.service";
import { ITutorDetails } from "@/types/tutor.types";
import PageTitle from "@/components/frontend/PageTitle";
import { getMe } from "@/lib/getMe";
import TutorDetailsSidebar from "@/components/public/TutorDetailsSidebar";
import StudentReviews from "@/components/public/StudentReviews";
import ReviewForm from "@/components/public/ReviewForm";
import { getBookings } from "@/services/bookings.service";
import { IBooking } from "@/types/booking.types";

interface TutorDetailsPageParams {
  params: Promise<{ id: string }>;
}
const TutorDetailsPage = async ({ params }: TutorDetailsPageParams) => {
  const { id } = await params;
  const tutorRes = await getTutorByID(id);
  const bookingRes = await getBookings();
  const userRes = await getMe();

  const tutor: ITutorDetails = tutorRes?.data ?? null;
  const bookings: IBooking[] = bookingRes?.data ?? [];
  const userData = userRes?.data;

  if (!tutor) {
    return (
      <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 text-lg mb-4">Tutor not found</p>
          <Link href="/tutors" className="bg-brand text-white font-medium">
            ← Back to Tutors
          </Link>
        </div>
      </div>
    );
  }

  const {
    id: tutorId,
    name,
    image,
    user,
    hourlyRate,
    yearsExperience,
    availablity,
    averageRating,
    isAvailable,
    subjects,
    reviews,
  } = tutor;

  const totalReview = reviews.length;

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100">
      <PageTitle title={name} subText="" />

      <div className="max-w-310 mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-3xl overflow-hidden">
              <div className="p-8 bg-linear-to-br from-green-50 to-white rounded-2xl">
                <div className="flex items-start gap-6 mb-8">
                  <div className="w-28 h-28 rounded-full bg-[#25a5a21c] text-brand flex items-center justify-center text-6xl shrink-0 shadow-md">
                    {image ? image : name.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">
                      {name}
                    </h1>

                    <div className="flex flex-wrap gap-4 mb-4">
                      <div className="flex items-center gap-2">
                        <Star className="h-5 w-5 text-yellow-500" />
                        <div>
                          <p className="font-bold text-gray-900">
                            {averageRating}
                          </p>
                          <p className="text-xs text-gray-500">
                            {reviews ? totalReview : ""} reviews
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users size={20} className="text-brand" />
                        <div>
                          <p className="font-bold text-gray-900">
                            {yearsExperience}
                          </p>
                          <p className="text-xs text-gray-500">years exp.</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {subjects?.map((subject) => (
                        <div
                          key={subject.category.id}
                          className="inline-block bg-violet-100 text-violet-600 rounded-full px-4 py-2 text-sm font-semibold"
                        >
                          {subject.category.name}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-8">
                <div className="">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <BookOpen size={24} className="text-violet-600" />
                    About Me
                  </h2>
                  <p className="text-gray-700 leading-relaxed text-base">
                    {user?.bio}
                  </p>
                </div>
                <StudentReviews tutor={tutor} />
                <ReviewForm bookings={bookings} user={userData} />
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <TutorDetailsSidebar tutor={tutor} user={userData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorDetailsPage;
