import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, Mail, Calendar, Star, BookOpen } from "lucide-react";
import ProfileInfoStatsCard from "@/components/student/ProfileInfoStatsCard";
import { BioCard } from "@/components/student/BioCard";
import { getMe } from "@/lib/getMe";

export default async function ProfilePage() {
  const { data: user } = await getMe();
  const totalBookings = user?.bookingsAsStudent?.length ?? 0;
  const totalReviews = user?.reviews?.length ?? 0;
  const avgRating =
    totalReviews > 0
      ? (
          user.reviews.reduce(
            (sum: number, r: any) => sum + Number(r.rating),
            0,
          ) / totalReviews
        ).toFixed(1)
      : "N/A";

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
        </div>
        <Link href="/dashboard/profile/edit">
          <Button className="rounded-full bg-brand hover:bg-brand-dark gap-2 cursor-pointer">
            <Edit className="w-4 h-4" />
            Edit Profile
          </Button>
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <div className="flex items-center gap-5">
          <Avatar className="w-20 h-20">
            <AvatarImage src={user?.image ?? ""} alt={user?.name} />
            <AvatarFallback className="bg-[#25a5a21c] text-brand text-2xl font-bold">
              {user?.name?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-gray-900">{user?.name}</h2>
            <div className="flex items-center gap-2">
              <Badge className="bg-violet-50 text-brand hover:bg-violet-50">
                {user?.role}
              </Badge>
              {user?.emailVerified ? (
                <Badge className="bg-green-50 text-green-600 hover:bg-green-50">
                  Verified
                </Badge>
              ) : (
                <Badge className="bg-red-50 text-red-500 hover:bg-red-50">
                  Unverified
                </Badge>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <ProfileInfoStatsCard
          icon={<BookOpen className="w-5 h-5 text-violet-600 mx-auto mb-2" />}
          count={totalBookings}
          text="Total Bookings"
        />
        <ProfileInfoStatsCard
          icon={<Star className="w-5 h-5 text-amber-400 mx-auto mb-2" />}
          count={avgRating}
          text="Avg Rating Given"
        />
        <ProfileInfoStatsCard
          icon={<Edit className="w-5 h-5 text-text-brand mx-auto mb-2" />}
          count={totalReviews}
          text="Reviews Written"
        />
      </div>
      <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
        <h3 className="text-base font-semibold text-gray-900">
          Personal Information
        </h3>
        <div className="border-t border-gray-100 pt-4 space-y-4">
          <BioCard
            icon={<Mail className="w-4 h-4 text-brand" />}
            label="Email"
            text={user?.email}
          />
          <BioCard
            icon={<Calendar className="w-4 h-4 text-brand" />}
            label="Member Since"
            text={new Date(user?.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          />
          <BioCard
            icon={<Edit className="w-4 h-4 text-brand" />}
            label="Bio"
            text={
              user?.bio ?? (
                <span className="text-gray-400 italic">No bio yet.</span>
              )
            }
          />
        </div>
      </div>
    </div>
  );
}
