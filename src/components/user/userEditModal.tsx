"use client";
import { updateUser } from "@/actions/studentProfile.ction";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";

export function UserEditModal({ user }: { user: any }) {
  const form = useForm({
    defaultValues: {
      name: user.name || "",
      email: user.email || "",
      image: user.image || "",
    },
    onSubmit: async ({ value }) => {
      try {
        await updateUser(user.id, value);
        toast.success("Successfully Updated", { position: "top-right" });
      } catch (error) {
        toast.error("Failed to Update", { position: "top-right" });
      }
    },
  });
  return (
    <Dialog>
      <form
        id="update_form"
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <DialogTrigger asChild>
          <Button variant="outline">Edit</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
          </DialogHeader>
          <FieldGroup>
            <form.Field
              name="name"
              children={(field) => {
                return (
                  <Field>
                    <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                  </Field>
                );
              }}
            />
            <form.Field
              name="email"
              children={(field) => {
                return (
                  <Field>
                    <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                  </Field>
                );
              }}
            />
            <form.Field
              name="image"
              children={(field) => {
                return (
                  <Field>
                    <FieldLabel htmlFor={field.name}>Image</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                  </Field>
                );
              }}
            />
          </FieldGroup>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" form="update_form">
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
