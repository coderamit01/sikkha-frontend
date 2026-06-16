"use client";

import { useForm } from "@tanstack/react-form";
import { useTransition } from "react";
import { FieldError, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { createAvailability } from "@/actions/availability.action";
import { availabilitySchema } from "@/validation/availabilitySchema";



const AvailabilityForm = () => {
  const [isPending, starTransition] = useTransition();

  const form = useForm({
    defaultValues: {
      date: "",
      startTime: "",
      endTime: "",
    },
    validators: {
      onSubmit: availabilitySchema
    },
    onSubmit: async ({ value }) => {
      starTransition(async () => {
        try {
          const start = new Date(`${value.date}T${value.startTime}`);
          const end = new Date(`${value.date}T${value.endTime}`);

          const result = await createAvailability({
            startTime: start,
            endTime: end,
          });
          if (result?.success) {
            toast.success("Availability created successfuly", {
              position: "top-right",
            });
          }
          form.reset();
        } catch (error: any) {
          toast.error(error.message || "Failed to create availability", {
            position: "top-right",
          });
        }
      });
    },
  });

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className="space-y-6"
      >
        <form.Field name="date">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <div>
                <FieldLabel className="block text-sm font-medium text-gray-700 mb-1">
                  Select Date
                </FieldLabel>
                <Input
                  type="date"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </div>
            );
          }}
        </form.Field>

        <form.Field name="startTime">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <div>
                <FieldLabel className="block text-sm font-medium text-gray-700 mb-1">
                  Start Time
                </FieldLabel>
                <Input
                  type="time"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </div>
            );
          }}
        </form.Field>

        <form.Field name="endTime">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <div>
                <FieldLabel className="block text-sm font-medium text-gray-700 mb-1">
                  End Time
                </FieldLabel>
                <Input
                  type="time"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </div>
            );
          }}
        </form.Field>
        <form.Subscribe selector={(a) => a.isSubmitting}>
          {(isSubmitting) => (
            <Button
              type="submit"
              disabled={isSubmitting || isPending}
              className="w-full bg-brand hover:bg-brand-dark text-white cursor-pointer"
            >
              {isPending || isSubmitting
                ? "Creating..."
                : "Create Availability"}
            </Button>
          )}
        </form.Subscribe>
      </form>
    </div>
  );
};
export default AvailabilityForm;
