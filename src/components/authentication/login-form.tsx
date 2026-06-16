"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useForm } from "@tanstack/react-form";
import * as z from "zod";
import { toast } from "sonner";
import { Role } from "@/types/user.types";
import { useRouter } from "next/navigation";
import { setAuthTokens, userLogin } from "@/actions/auth.action";

const formSchema = z.object({
  email: z.email(),
  password: z.string().min(8, "Password length required 8 character"),
});

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        const data = await userLogin(value);

        await setAuthTokens({
          accessToken: data?.data?.accessToken,
          refreshToken: data?.data?.refreshToken,
          sessionToken: data?.data?.token
        })

        const role = data?.data?.user?.role;
        toast.success("Successfully Login", { position: "top-right" });

        form.reset();

        if (role === Role.ADMIN) router.push("/admin");
        if (role === Role.TUTOR) router.push("/tutor");
        if (role === Role.STUDENT) router.push("/dashboard");
      } catch (error) {
        console.log(error);
        toast.error("Failled to Login", { position: "top-right" });
      }
    },
  });

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <h2 className="text-center font-bold text-3xl ">
        Skill<span className="text-[#2EA2A3]">Bridge</span>
      </h2>
      <Card>
        <CardHeader className="text-start">
          <CardTitle className="text-xl">Sign in to account</CardTitle>
          <CardDescription>
            Enter your email & password to login
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            id="login_form"
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
          >
            <FieldGroup className="gap-4">
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
                        placeholder="example@gmail.com"
                        autoComplete="off"
                        className="h-11"
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
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
                        name={field.name}
                        type="password"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                        placeholder="Type your password"
                        autoComplete="off"
                        className="h-11"
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              />
              <Field className="gap-2 pt-3">
                <form.Subscribe selector={(state) => state.isSubmitting}>
                  {(isSubmitting) => (
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      size="default"
                      className="py-5 cursor-pointer bg-brand hover:bg-brand-dark text-white"
                    >
                      {isSubmitting ? "Logging..." : "Login"}
                    </Button>
                  )}
                </form.Subscribe>

                <FieldDescription className="text-center">
                  Don&apos;t have an account?{" "}
                  <Link
                    href="/signup"
                    className="text-violet-600 hover:underline"
                  >
                    Sign up
                  </Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
