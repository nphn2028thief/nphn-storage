"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import RenderIf from "@/components/common/RenderIf";
import OtpModal from "../OtpModal";
import { EPath } from "@/constants/path";
import { createUser } from "@/lib/actions/user";

type TProps = "sign-in" | "sign-up";

function AuthForm({ type }: { type: TProps }) {
  const [userId, setuserId] = useState<string>("");

  const authSchema = useMemo(() => {
    return z.object({
      fullname:
        type === "sign-up"
          ? z
              .string()
              .min(3, {
                message: "Full name must be at least 3 character(s)",
              })
              .trim()
          : z.string().optional(),
      email: z.string().email().trim(),
    });
  }, [type]);

  const form = useForm<z.infer<typeof authSchema>>({
    defaultValues: {
      fullname: "",
      email: "",
    },
    resolver: zodResolver(authSchema),
  });

  const onSubmit = async (values: z.infer<typeof authSchema>) => {
    const { email, fullname } = values;

    try {
      const { id } = await createUser({ email, fullName: fullname || "" });
      setuserId(id);
    } catch (error) {
      console.log("error: ", error);
    }
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="auth-form">
          <h1 className="form-title">
            {type === "sign-in" ? "Login" : "Create Account"}
          </h1>

          <RenderIf condition={type === "sign-up"}>
            <FormField
              control={form.control}
              name="fullname"
              render={({ field }) => (
                <FormItem>
                  <div className="shad-form-item">
                    <FormLabel className="shad-form-label">Full name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter full name"
                        className="shad-input"
                        spellCheck={false}
                        disabled={form.formState.isSubmitting}
                        {...field}
                      />
                    </FormControl>
                  </div>
                  <FormMessage className="shad-form-error-message" />
                </FormItem>
              )}
            />
          </RenderIf>

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <div className="shad-form-item">
                  <FormLabel className="shad-form-label">Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your email"
                      className="shad-input"
                      spellCheck={false}
                      disabled={form.formState.isSubmitting}
                      {...field}
                    />
                  </FormControl>
                </div>
                <FormMessage className="shad-form-error-message" />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
            className="form-submit-button"
          >
            {type === "sign-in" ? "Login" : "Create Account"}
            <RenderIf condition={form.formState.isSubmitting}>
              <Image
                src="/assets/icons/loader.svg"
                alt="loader"
                width={24}
                height={24}
                className="animate-spin ml-1"
              />
            </RenderIf>
          </Button>

          <div className="flex justify-center body-2">
            <p className="text-light-100">
              {type === "sign-in"
                ? "Don't have an account?"
                : "Already have an account?"}
            </p>
            <Link
              href={type === "sign-in" ? EPath.SIGNUP : EPath.SIGNIN}
              className="font-medium text-brand ml-1"
              onClick={(e) => form.formState.isSubmitting && e.preventDefault()}
            >
              {type === "sign-in" ? "Create Account" : "Login"}
            </Link>
          </div>
        </form>
      </Form>
      <OtpModal email={form.getValues("email")} userId={userId} />
    </>
  );
}

export default AuthForm;
