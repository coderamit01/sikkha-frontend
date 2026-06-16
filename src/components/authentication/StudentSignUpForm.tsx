"use client";

import { Role } from "@/types/user.types";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import * as z from "zod";

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { userRegister } from "@/actions/auth.action";

const formSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  role: z.nativeEnum(Role),
  password: z.string().min(8, "Minimum length is 8"),
});

export const StudentSignUpForm = () => {
  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: Role.STUDENT as Role,
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        const result = await userRegister(value);
        if (result?.success) {
          toast.success("Account created successfully!", { position: "top-right" });
        } else {
          toast.error(result?.message || "Registration failed", { position: "top-right" });
        }
        form.reset();
      } catch (error: any) {
        console.log(error);
        toast.error(error.response?.data?.message || "Registration failed");
      }
    },
  });

  return (
    <form
      id="registration_form"
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
                  type="email"
                  name={field.name}
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
          name="password"
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field className="gap-2">
                <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                <Input
                  id={field.name}
                  type="password"
                  name={field.name}
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
        <Field>
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
