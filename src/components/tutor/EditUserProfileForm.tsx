"use client"

import { updateUserProfile } from "@/actions/userProfile.action";
import { IUser } from "@/types/user.types";
import { useForm } from "@tanstack/react-form";
import { useRef, useState, useTransition } from "react";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FieldLabel } from "@/components/ui/field";
import { updateUser } from "@/actions/studentProfile.ction";

export interface IEditUserProfileForm {
  user: IUser
}

export const EditUserProfileForm = ({ user }: IEditUserProfileForm) => {
  const [isPending, startTransition] = useTransition();
  const fileRef = useRef<HTMLInputElement>(null)
  const [previewUrl, setPreviewUrl] = useState(user.image || "");

  const form = useForm({
    defaultValues: {
      name: user.name || "",
      bio: user.bio || "",
      image: user.image || ""
    },
    onSubmit: async ({ value }) => {
      startTransition(async () => {
        const formData = new FormData();
        formData.append("name", value.name)
        formData.append("bio", value.bio)

        const file = fileRef?.current?.files?.[0]
        if (file) formData.append("image", file);

        startTransition(async () => {
          const result = await updateUser(formData);

          if (result?.success) {
            toast.success("Profile updated!");
          } else {
            toast.error(result?.error ?? "Something went wrong");
          }
        })
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
            return (
              <div className="space-y-3">
                <FieldLabel className="text-sm font-medium text-gray-700 block">
                  Avatar URL
                </FieldLabel>
                <div className="flex items-center gap-4">
                  <Avatar className="w-14 h-14">
                    <AvatarImage src={previewUrl} />
                    <AvatarFallback className="bg-[#25a5a21c] text-brand font-bold">
                      {user.name?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <Input
                    ref={fileRef}
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) setPreviewUrl(URL.createObjectURL(file))
                    }}
                    className="flex-1"
                  />
                </div>
              </div>
            )
          }}
        </form.Field>

        <form.Field name="name">
          {(field) => {
            return (
              <div>
                <FieldLabel className="text-sm font-medium text-gray-700 block mb-1.5">
                  Full Name
                </FieldLabel>
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
          <FieldLabel className="text-sm font-medium text-gray-700 block mb-1.5">
            Email <span className="text-gray-400 font-normal">(cannot be changed)</span>
          </FieldLabel>
          <Input
            value={user.email}
            disabled
            className="bg-gray-50 text-gray-400 cursor-not-allowed"
          />
        </div>

        <form.Field name="bio">
          {(field) => {
            return (
              <div>
                <FieldLabel className="text-sm font-medium text-gray-700 block mb-1.5">
                  Bio
                </FieldLabel>
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
