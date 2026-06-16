import { EditTutorForm } from "@/components/tutor/EditTutorForm";
import { EditUserProfileForm } from "@/components/tutor/EditUserProfileForm";
import { getMe } from "@/lib/getMe";


const EditProfile = async () => {
  const { data: user } = await getMe();
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Edit Profile</h1>
        <p className="text-sm text-gray-500">
          Update your personal information
        </p>
      </div>
      <EditTutorForm user={user} />
      <EditUserProfileForm user={user} />
    </div>
  );
}

export default EditProfile;