import EditProfileform from "@/components/student/EditProfileform";
import { getMe } from "@/lib/getMe";

const ProfileEdit = async () => {
  const { data: user } = await getMe();
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Edit Profile</h1>
        <p className="text-sm text-gray-500">
          Update your personal information
        </p>
      </div>
      <EditProfileform user={user} />
    </div>
  );
};

export default ProfileEdit;
