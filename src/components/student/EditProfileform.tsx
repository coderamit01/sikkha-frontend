"use client"

import { updateUser } from "@/actions/studentProfile.ction";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { IUpdatePayload, IUser } from "@/types/user.types";
import { useForm } from "@tanstack/react-form";
import { useTransition } from "react";
import { toast } from "sonner";

export interface IEditProfileForm {
  user: IUser
}

const EditProfileform = ({ user }: IEditProfileForm) => {

  const [isPending, startTransition] = useTransition();

  const form = useForm({
    defaultValues: {
      name: user.name || "",
      email: user.email,
      bio: user.bio || "",
      image: user.image || ""
    },
    onSubmit: async ({ value }) => {
      startTransition(async () => {
        const result = await updateUser(user.id, value);

        if (result?.success) {
          toast.success("Profile updated!");
        } else {
          toast.error(result.error ?? "Something went wrong");
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

        <form.Field name="image">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (

              <div className="space-y-3">
                <label className="text-sm font-medium text-gray-700 block">
                  Avatar URL
                </label>
                <div className="flex items-center gap-4">
                  <Avatar className="w-14 h-14">
                    <AvatarImage src={field.state.value} />
                    <AvatarFallback className="bg-[#25a5a21c] text-brand font-bold">
                      {user.name?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    placeholder="https://example.com/avatar.jpg"
                    className="flex-1"
                  />
                </div>
              </div>
            )
          }}
        </form.Field>

        <form.Field name="name">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1.5">
                  Full Name
                </label>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  placeholder="Your full name"
                />
              </div>
            )
          }}
        </form.Field>

        <div>
          <label className="text-sm font-medium text-gray-700 block mb-1.5">
            Email <span className="text-gray-400 font-normal">(cannot be changed)</span>
          </label>
          <Input
            value={user.email}
            disabled
            className="bg-gray-50 text-gray-400 cursor-not-allowed"
          />
        </div>

        <form.Field name="bio">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1.5">
                  Bio
                </label>
                <Textarea
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  placeholder="Tell us about yourself..."
                  rows={3}
                />

              </div>
            )
          }}
        </form.Field>

        <div className="flex gap-3 pt-2">
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

export default EditProfileform