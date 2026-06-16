import cartoon from "@/assets/cartoon.svg";
import watch from "@/assets/watch.png";
import { getMe } from "@/lib/getMe";
import Image from "next/image";
import Link from "next/link";

export const WelcomeCard = async () => {
  const { data: user } = await getMe();

  const profileLink = () => {
    if (user?.role === "TUTOR") {
      return "/tutor/profile";
    } else if (user?.role === "STUDENT") {
      return "/dashboard/profile";
    } else {
      return "/admin/profile";
    }
  };
  return (
    <div className="card profile-box rounded-3xl p-5">
      <div className="card-body">
        <div className="flex media-wrapper justify-between">
          <div className="grow text-white">
            <div className="greeting-user">
              <h2 className="text-xl font-semibold line-clamp-1">
                Welcome {user?.name}!
              </h2>
              <p className="line-clamp-2">
                Here whats happing in your
                <br /> account today
              </p>
              <div className="pt-10">
                <Link
                  href={profileLink()}
                  className="text-sm border border-slate-50 rounded-md py-2 px-3 hover:bg-white hover:text-slate-700"
                >
                  View Profile
                </Link>
              </div>
            </div>
          </div>
          <div>
            <div className="clockbox">
              <Image src={watch} alt="Watch" className="h-10 w-10" />
            </div>
          </div>
        </div>
        <div className="cartoon flex justify-end">
          <Image
            className="max-w-full h-auto"
            src={cartoon}
            alt="vector women with leptop"
          />
        </div>
      </div>
    </div>
  );
};
