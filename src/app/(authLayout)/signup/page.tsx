import { SignupForm } from "@/components/authentication/signup-form"
import authBg from "../../../assets/login_bg.jpg"

export default function SignupPage() {
  return (
    <div className="flex min-h-svh w-full flex-col items-center bg-cover justify-center gap-6 p-6 md:p-10" style={{backgroundImage: `url(${authBg.src})`}}>
      <div className="flex w-full max-w-sm flex-col gap-6">
        <SignupForm />
      </div>
    </div>
  )
}
