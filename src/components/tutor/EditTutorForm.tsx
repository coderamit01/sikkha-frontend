"use client"

import { updateTutor } from "@/actions/TutorProfile.action";
import { IUser, Gender } from "@/types/user.types";
import { useForm } from "@tanstack/react-form";
import { useTransition } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FieldLabel } from "@/components/ui/field";

export interface IEditTutorProfileForm {
  user: IUser
}

export const EditTutorForm = ({ user }: IEditTutorProfileForm) => {
  const [isPending, startTransition] = useTransition();

  const form = useForm({
    defaultValues: {
      name: user.tutor?.name,
      contactNumber: user.tutor?.contactNumber || "",
      gender: user.tutor?.gender || Gender.MALE,
      hourlyRate: user.tutor?.hourlyRate || "",
      yearsExperience: user.tutor?.yearsExperience || "",
      isAvailable: user.tutor?.isAvailable ?? true
    },
    onSubmit: async ({ value }) => {
      startTransition(async () => {
        const result = await updateTutor(value);
        if (result?.success) {
          toast.success("Tutor profile updated!", { position: "top-right" });
        } else {
          toast.error(result.error ?? "Something went wrong", { position: "top-right" });
        }
      })
    }
  })

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6">
      <form
        onSubmit={(e) => { e.preventDefault(); form.handleSubmit() }}
        className="space-y-5"
      >
        <form.Field name="name">
          {(field) => {
            return (
              <div>
                <FieldLabel className="text-sm font-medium text-gray-700 block mb-1.5">
                  Name
                </FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                />
              </div>
            )
          }}
        </form.Field>
        <form.Field name="contactNumber">
          {(field) => {
            return (
              <div>
                <FieldLabel className="text-sm font-medium text-gray-700 block mb-1.5">
                  Contact Number
                </FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  placeholder="+1 (555) 000-0000"
                />
              </div>
            )
          }}
        </form.Field>

        <form.Field name="gender">
          {(field) => {
            return (
              <div>
                <FieldLabel className="text-sm font-medium text-gray-700 block mb-1.5">
                  Gender
                </FieldLabel>
                <Select value={field.state.value} onValueChange={(value) => field.handleChange(value as Gender)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={Gender.MALE}>Male</SelectItem>
                    <SelectItem value={Gender.FEMALE}>Female</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )
          }}
        </form.Field>

        <form.Field name="hourlyRate">
          {(field) => {
            return (
              <div>
                <FieldLabel className="text-sm font-medium text-gray-700 block mb-1.5">
                  Hourly Rate ($)
                </FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  type="number"
                  step="0.01"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  placeholder="50.00"
                />
              </div>
            )
          }}
        </form.Field>

        <form.Field name="yearsExperience">
          {(field) => {
            return (
              <div>
                <FieldLabel className="text-sm font-medium text-gray-700 block mb-1.5">
                  Years of Experience
                </FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  type="number"
                  step="0.5"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  placeholder="5"
                />
              </div>
            )
          }}
        </form.Field>

        <form.Field name="isAvailable">
          {(field) => {
            return (
              <div className="flex items-center gap-2">
                <input
                  id={field.name}
                  type="checkbox"
                  name={field.name}
                  checked={field.state.value}
                  onChange={(e) => field.handleChange(e.target.checked)}
                  onBlur={field.handleBlur}
                  className="w-4 h-4 text-brand bg-gray-100 border-gray-300 rounded cursor-pointer"
                />
                <FieldLabel htmlFor={field.name} className="text-sm font-medium text-gray-700 cursor-pointer">
                  Available for Booking
                </FieldLabel>
              </div>
            )
          }}
        </form.Field>

        <div className="flex gap-3 pt-4 border-t">
          <Button
            type="button"
            variant="outline"
            className="flex-1 rounded-full cursor-pointer"
          >
            Cancel
          </Button>
          <form.Subscribe selector={(s) => s.isSubmitting}>
            {(isSubmitting) => (
              <Button
                type="submit"
                disabled={isSubmitting || isPending}
                className="flex-1 rounded-full bg-brand hover:bg-brand-dark cursor-pointer text-white"
              >
                {isSubmitting || isPending ? "Saving..." : "Save Changes"}
              </Button>
            )}
          </form.Subscribe>
        </div>
      </form>
    </div>
  )
}
