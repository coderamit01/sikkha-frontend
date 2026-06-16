import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Edit, Mail, Calendar, Star, User, Phone, DollarSign, Award, } from "lucide-react"
import { BioCard } from "@/components/student/BioCard"
import { IUser } from "@/types/user.types"
import { getMe } from "@/lib/getMe"

const TutorProfile = async () => {

  const { data: user }: { data: IUser } = await getMe()
  const { name, email, image, role, emailVerified, createdAt, bio, tutor, reviews } = user || {};

  return (
    <div className="max-w-3xl mx-auto space-y-6">

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
        </div>
        <Link href="/tutor/profile/edit">
          <Button className="rounded-full bg-brand hover:bg-brand-dark gap-2 cursor-pointer">
            <Edit className="w-4 h-4" />
            Edit Profile
          </Button>
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <div className="flex items-center gap-5">
          <Avatar className="w-20 h-20">
            <AvatarImage src={image ?? ""} alt={name} />
            <AvatarFallback className="bg-[#25a5a21c] text-brand text-2xl font-bold">
              {name?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="space-y-2">
            <h2 className="text-xl font-bold text-gray-900">{name}</h2>
            <span className="text-slate-500">{tutor?.yearsExperience} Years Experience</span>
            <div className="flex items-center gap-2 py-2">
              <Badge className="bg-violet-50 text-brand hover:bg-violet-50">
                {role}
              </Badge>
              {emailVerified ? (
                <Badge className="bg-green-50 text-green-600 hover:bg-green-50">Verified</Badge>
              ) : (
                <Badge className="bg-red-50 text-red-500 hover:bg-red-50">Unverified</Badge>
              )}
              {
                tutor?.isAvailable ? (
                  <Badge className="bg-green-50 text-green-600 hover:bg-green-50">Available</Badge>
                ) : (
                  <Badge className="bg-red-50 text-red-500 hover:bg-red-50">Unavailable</Badge>
                )
              }
            </div>
            <div className="flex items-center gap-2">
              <div className="flex">
                <Star className="w-4 h-4 text-amber-400" />
                <span className="ml-1 text-sm text-gray-700">{tutor?.averageRating ?? "N/A"}</span>
              </div>
              <span className="text-sm text-gray-500">({reviews?.length ?? 0} reviews)</span>
              <span className="text-sm text-gray-500">{tutor?.hourlyRate ? `$${tutor.hourlyRate}/hr` : "N/A"}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">

      </div>
      <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
        <h3 className="text-base font-semibold text-gray-900">Personal Information</h3>
        <div className="border-t border-gray-100 pt-4 space-y-4">
          <BioCard
            icon={<Mail className="w-4 h-4 text-brand" />}
            label="Email"
            text={email}
          />

          <BioCard
            icon={<User className="w-4 h-4 text-brand" />}
            label="Gender"
            text={tutor?.gender ?? "N/A"}
          />

          <BioCard
            icon={<Phone className="w-4 h-4 text-brand" />}
            label="Phone"
            text={tutor?.contactNumber ?? "N/A"}
          />

          <BioCard
            icon={<Calendar className="w-4 h-4 text-brand" />}
            label="Member Since"
            text={new Date(createdAt).toLocaleDateString("en-US", {
              year: "numeric", month: "long", day: "numeric"
            })}
          />

          <BioCard
            icon={<DollarSign className="w-4 h-4 text-brand" />}
            label="Hourly Rate"
            text={tutor?.hourlyRate ? `$${tutor.hourlyRate}/hr` : "0"}
          />

          <BioCard
            icon={<Award className="w-4 h-4 text-brand" />}
            label="Experience"
            text={tutor?.yearsExperience ? `${tutor.yearsExperience} years` : "0 years"}
          />

          <BioCard
            icon={<Edit className="w-4 h-4 text-brand" />}
            label="Bio"
            text={bio ?? (
              <span className="text-gray-400 italic">
                No bio yet.
              </span>
            )}
          />
        </div>
      </div>
    </div>
  )
}

export default TutorProfile;