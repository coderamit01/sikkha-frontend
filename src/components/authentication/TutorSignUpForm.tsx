"use client";

import * as z from "zod";

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { Gender } from "@/types/user.types";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { createTtutor } from "@/services/tutor.service";

const formSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  gender: z.nativeEnum(Gender),
  password: z.string().min(8, "Minimum length is 8"),
});

export const TutorSignUpForm = () => {
  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      gender: "" as Gender,
      password: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        const result = await createTtutor(value);
        if (result?.success) {
          toast.success("Tutor created successfully!", { position: "top-right" });
        } else {
          toast.error(result?.message || "Registration failed", { position: "top-right" });
        }
        form.reset();
      } catch (error: any) {
        toast.error(error.response?.data?.message || "Registration failed");
      }
    },
  });

  return (
    <form
      id="registration_form_tutor"
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <FieldGroup className="gap-4">
        <form.Field
          name="name"
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field className="gap-2">
                <FieldLabel htmlFor={field.name}>Full Name</FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  aria-invalid={isInvalid}
                  placeholder="Your name"
                  className="h-11"
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        />
        <form.Field
          name="email"
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field className="gap-2">
                <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  type="email"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  aria-invalid={isInvalid}
                  placeholder="Your email"
                  className="h-11"
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        />

        <form.Field
          name="gender"
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <FieldSet>
                <FieldLabel htmlFor={field.name}>Gender</FieldLabel>
                <RadioGroup
                  name={field.name}
                  value={field.state.value}
                  onValueChange={(val) => field.handleChange(val as Gender)}
                  className="flex space-x-1"
                >
                  {["MALE", "FEMALE"].map((gndr, id) => (
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value={gndr} id={`gender-${id}`} />
                      <Label htmlFor={`gender-${id}`}>{gndr}</Label>
                    </div>
                  ))}
                </RadioGroup>
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </FieldSet>
            );
          }}
        />

        <form.Field
          name="password"
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field className="gap-2">
                <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  type="password"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  aria-invalid={isInvalid}
                  placeholder="Your password"
                  className="h-11"
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        />
        <Field className="gap-2">
          <form.Subscribe selector={(state) => state.isSubmitting}>
            {(isSubmitting) => (
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full cursor-pointer py-5 bg-brand hover:bg-brand-dark text-white"
              >
                {isSubmitting ? "Creating account..." : "Create Account"}
              </Button>
            )}
          </form.Subscribe>
          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="text-violet-600 hover:underline">
              Sign in
            </Link>
          </p>
        </Field>
      </FieldGroup>
    </form>
  );
};
