"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useMemo, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

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
import envConfig from "@/config/envConfig";
import { EPath } from "@/constants/path";
import { IGetOtpResponse } from "@/types/user";
import { fetchUtility } from "@/utils";

type TProps = "sign-in" | "sign-up";

function AuthForm({ type }: { type: TProps }) {
  const [userId, setuserId] = useState<number | null>(null);

  const t = useTranslations("AuthForm");

  const authSchema = useMemo(() => {
    return z.object({
      fullname:
        type === "sign-up"
          ? z
              .string()
              .min(3, {
                message: t("SM_AuthForm_Validate_Fullname"),
              })
              .trim()
          : z.string().optional(),
      email: z.string().email(t("SM_AuthForm_Email_Incorrect_Email")).trim(),
    });
  }, [type, t]);

  const form = useForm<z.infer<typeof authSchema>>({
    defaultValues: {
      fullname: "",
      email: "",
    },
    resolver: zodResolver(authSchema),
  });

  const onSubmit = async (values: z.infer<typeof authSchema>) => {
    const { email, fullname } = values;
    const payload = type === "sign-in" ? { email } : { fullname, email };

    try {
      const options: RequestInit = {
        method: "POST",
        body: JSON.stringify(payload),
      };
      const res = await fetchUtility<IGetOtpResponse>(
        `${envConfig.apiUrl}/auth/getOtp`,
        options
      );

      if (res) {
        toast.success("The OTP has been sent. Please check your email.");
        setuserId(res.data.userId);
      }
    } catch (error) {
      toast.error("Failed to get OTP.");
      console.log("Get OTP error: ", error);
    }
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="auth-form">
          <h1 className="form-title">
            {type === "sign-in"
              ? t("SM_AuthForm_Login")
              : t("SM_AuthForm_Create_Account")}
          </h1>

          <RenderIf condition={type === "sign-up"}>
            <FormField
              control={form.control}
              name="fullname"
              render={({ field }) => (
                <FormItem>
                  <div className="shad-form-item">
                    <FormLabel className="shad-form-label">
                      {t("SM_AuthForm_Fullname")}
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t("SM_AuthForm_Enter_Fullname")}
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
                  <FormLabel className="shad-form-label">
                    {t("SM_AuthForm_Email")}
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t("SM_AuthForm_Email_Placeholder")}
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
            {type === "sign-in"
              ? t("SM_AuthForm_Login")
              : t("SM_AuthForm_Create_Account")}
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
                ? t("SM_AuthForm_Do_Not_Have_Account")
                : t("SM_AuthForm_Have_Account")}
            </p>
            <Link
              href={type === "sign-in" ? EPath.SIGNUP : EPath.SIGNIN}
              className="font-medium text-brand ml-1"
              onClick={(e) => form.formState.isSubmitting && e.preventDefault()}
            >
              {type === "sign-in"
                ? t("SM_AuthForm_Create_Account")
                : t("SM_AuthForm_Login")}
            </Link>
          </div>
        </form>
      </Form>
      <OtpModal email={form.getValues("email")} userId={userId} />
    </>
  );
}

export default AuthForm;
