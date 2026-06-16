"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldError, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IAvailability } from "@/types/availability.types";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { updateAvailabilitySchema } from "@/validation/availabilitySchema";
import { updateAvailability } from "@/actions/availability.action";
import { toLocalTimeInput } from "@/utils/localTime";

const UpdateAvailabilityModal = ({
  isOpen,
  setIsOpen,
  available,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  available: IAvailability;
}) => {
  const { id, startTime, endTime } = available;

  const originalDate = new Date(startTime).toLocaleDateString("en-CA");

  const form = useForm({
    defaultValues: {
      startTime: toLocalTimeInput(startTime),
      endTime: toLocalTimeInput(endTime),
    },
    validators: {
      onSubmit: updateAvailabilitySchema,
    },
    onSubmit: async ({ value }) => {
      try {
        const start = new Date(`${originalDate}T${value.startTime}`);
        const end = new Date(`${originalDate}T${value.endTime}`);

        const result = await updateAvailability(id, { startTime: start, endTime: end });

        if (result?.success) {
          toast.success("Availability updated successfully", {
            position: "top-right",
          });
          setIsOpen(false);
        } else {
          toast.error(result.error || "Failed to update availability", {
            position: "top-right",
          });
        }
      } catch (error: any) {
        toast.error(error.message || "Failed to update availability", { position: "top-right" });
      }
    }
  });
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Edit Availability</DialogTitle>
        </DialogHeader>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <FieldGroup>
            <form.Field name="startTime">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field>
                    <Label htmlFor="startTime">Start Time</Label>
                    <Input
                      id="startTime"
                      type="time"
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

            <form.Field name="endTime">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field>
                    <Label htmlFor="endTime">End Time</Label>
                    <Input
                      id="endTime"
                      type="time"
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
              <Button variant="outline" className="cursor-pointer">Cancel</Button>
            </DialogClose>
            <form.Subscribe selector={(a) => a.isSubmitting}>
              {(isSubmitting) => (
                <Button type="submit" disabled={isSubmitting} className="bg-brand hover:bg-brand-dark cursor-pointer">
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

export default UpdateAvailabilityModal;