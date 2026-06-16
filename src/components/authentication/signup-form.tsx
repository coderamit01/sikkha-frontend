"use client";
import { cn } from "@/lib/utils"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";

import { StudentSignUpForm } from "./StudentSignUpForm";
import { TutorSignUpForm } from "./TutorSignUpForm";


export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
        <h2 className="text-center font-bold text-3xl ">Skill<span className="text-[#2EA2A3]">Bridge</span></h2>
      <Card>
        <CardHeader className="text-start">
          <CardTitle className="text-xl">Create your account</CardTitle>
          <CardDescription>
           Enter your personal details to create account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="STUDENT" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="STUDENT">SignUp as Student</TabsTrigger>
              <TabsTrigger value="TUTOR">SignUp as Tutor</TabsTrigger>
            </TabsList>

            <TabsContent value="STUDENT">
              <StudentSignUpForm />
            </TabsContent>

            <TabsContent value="TUTOR">
              <TutorSignUpForm />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
