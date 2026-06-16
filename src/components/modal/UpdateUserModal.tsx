import { IUser } from "@/types/user.types";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useForm } from "@tanstack/react-form";
import { updateUser } from "@/actions/studentProfile.ction";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const UpdateUserModal = ({
  isOpen,
  setIsOpen,
  user,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  user: IUser;
}) => {
  const { id, name, email, isBanned, image, bio } = user;
  const form = useForm({
    defaultValues: {
      name: name || "",
      email: email || "",
      isBanned: isBanned,
      bio: bio || "",
    },
    onSubmit: async ({ value }) => {
      try {
        const result = await updateUser(id, value);

        if (result?.success) {
          toast.success("Updated user successfully", {
            position: "top-right",
          });
          setIsOpen(false);
        } else {
          toast.error(result.error || "Failed to update user", {
            position: "top-right",
          });
        }
      } catch (error: any) {
        toast.error(error.message || "Failed to update user", {
          position: "top-right",
        });
      }
    },
  });
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Update user</DialogTitle>
        </DialogHeader>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <FieldGroup className="gap-4">
            <form.Field name="name">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field>
                    <Label htmlFor={field.name}>Name</Label>
                    <Input
                      id={field.name}
                      type="text"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>

            <form.Field name="email">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field>
                    <Label htmlFor={field.name}>Email</Label>
                    <Input
                      id={field.name}
                      type="email"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>

            <form.Field name="isBanned">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <>
                    <FieldLabel>Status</FieldLabel>
                    <Select
                      value={field.state.value ? "Banned" : "Active"}
                      onValueChange={(value) =>
                        field.handleChange(value === "Banned")
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue
                          placeholder={isBanned ? "Banned" : "Active"}
                        />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="Banned">Banned</SelectItem>
                          <SelectItem value="Active">Active</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </>
                );
              }}
            </form.Field>

            <form.Field name="bio">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field>
                    <Label htmlFor={field.name}>Bio</Label>
                    <Textarea
                      id={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>
          </FieldGroup>

          <DialogFooter className="pt-4">
            <DialogClose asChild>
              <Button variant="outline" className="cursor-pointer">
                Cancel
              </Button>
            </DialogClose>
            <form.Subscribe selector={(a) => a.isSubmitting}>
              {(isSubmitting) => (
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-brand hover:bg-brand-dark cursor-pointer"
                >
                  {isSubmitting ? "Updating..." : "Update"}
                </Button>
              )}
            </form.Subscribe>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateUserModal;
