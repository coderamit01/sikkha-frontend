import { SignupForm } from "@/components/authentication/signup-form"
import authBg from "../../../assets/login_bg.jpg"

export default function SignupPage() {
  return (
    <div className="flex min-h-svh w-full flex-col items-center bg-cover justify-center gap-6 p-6 md:p-10" style={{ backgroundImage: `url(${authBg.src})` }}>
      <div className="flex w-full max-w-sm flex-col gap-6">
        <div className="flex flex-col gap-6">
          <h2 className="text-center font-bold text-3xl ">Shik<span className="text-[#2EA2A3]">kha</span></h2>
          <SignupForm />
        </div>
      </div>
    </div >
  )
}
