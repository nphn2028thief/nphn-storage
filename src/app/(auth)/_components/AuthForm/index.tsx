"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
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
import { EPath } from "@/constants/path";

type TProps = "sign-in" | "sign-up";

function AuthForm({ type }: { type: TProps }) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

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

  const onSubmit = (values: z.infer<typeof authSchema>) => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      console.log("values: ", values);
    }, 2000);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="auth-form">
        <h1 className="form-title">
          {type === "sign-in" ? "Login" : "Create Account"}
        </h1>
        {type === "sign-in" ? (
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
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>
                </div>
                <FormMessage className="shad-form-error-message" />
              </FormItem>
            )}
          />
        ) : (
          <>
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
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>
                  </div>
                  <FormMessage className="shad-form-error-message" />
                </FormItem>
              )}
            />
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
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>
                  </div>
                  <FormMessage className="shad-form-error-message" />
                </FormItem>
              )}
            />
          </>
        )}
        <Button
          type="submit"
          disabled={isLoading}
          className="form-submit-button"
        >
          {type === "sign-in" ? "Login" : "Create Account"}
          <RenderIf condition={isLoading}>
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
            onClick={(e) => isLoading && e.preventDefault()}
          >
            {type === "sign-in" ? "Create Account" : "Login"}
          </Link>
        </div>
      </form>
    </Form>
  );
}

export default AuthForm;
