"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { memo, MouseEvent, useState } from "react";
import toast from "react-hot-toast";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import RenderIf from "@/components/common/RenderIf";
import envConfig from "@/config/envConfig";
import { EPath } from "@/constants/path";
import { IGetOtpResponse, IMessage } from "@/types/user";
import { fetchUtility } from "@/utils";

interface IProps {
  email: string;
  userId: number | null;
}

function OtpModal(props: IProps) {
  const { email, userId } = props;

  const router = useRouter();

  const [otpCode, setOtpCode] = useState<string>("");
  const [otpValidate, setOtpValidate] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isResendLoading, setIsResendLoading] = useState<boolean>(false);

  const t = useTranslations("AuthForm");

  const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!otpCode) {
      setOtpValidate(t("SM_AuthForm_OTP_Empty"));
      return;
    }

    if (otpCode.length < 6) {
      setOtpValidate(t("SM_AuthForm_OTP_Incorrect"));
      return;
    }

    setOtpValidate("");
    setIsLoading(true);

    try {
      const options: RequestInit = {
        method: "POST",
        body: JSON.stringify({ userId, otpCode }),
      };
      const { message } = await fetchUtility<IMessage>(
        `${envConfig.apiUrl}/auth/signIn`,
        options
      );
      toast.success(message);
      router.push(EPath.HOME);
    } catch (error) {
      toast.error("Failed to verify OTP.");
      console.log("Verify OTP error: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setIsResendLoading(true);

    try {
      const options: RequestInit = {
        method: "POST",
        body: JSON.stringify({ email }),
      };
      await fetchUtility<IGetOtpResponse>(
        `${envConfig.apiUrl}/auth/getOtp`,
        options
      );
      toast.success("The OTP has been sent. Please check your email.");
    } catch (error) {
      toast.error("Failed to get OTP.");
      console.log("Get OTP error: ", error);
    } finally {
      setIsResendLoading(false);
    }
  };

  return (
    <AlertDialog open={!!userId}>
      <AlertDialogContent className="shad-alert-dialog">
        <AlertDialogHeader className="relative flex justify-center">
          <AlertDialogTitle className="h2 text-center">
            {t("SM_AuthForm_OTP_Dialog_Header")}
          </AlertDialogTitle>
          <AlertDialogDescription className="subtitle-2 text-center text-light-100">
            {t("SM_AuthForm_OTP_Dialog_Sent_To")}{" "}
            <span className="pl-1 text-brand">{email}</span>
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="flex flex-col gap-3">
          <InputOTP
            maxLength={6}
            disabled={isLoading}
            value={otpCode}
            autoFocus
            onChange={(value) => {
              setOtpValidate("");
              setOtpCode(value);
            }}
          >
            <InputOTPGroup className="shad-otp">
              <InputOTPSlot index={0} className="shad-otp-slot" />
              <InputOTPSlot index={1} className="shad-otp-slot" />
              <InputOTPSlot index={2} className="shad-otp-slot" />
              <InputOTPSlot index={3} className="shad-otp-slot" />
              <InputOTPSlot index={4} className="shad-otp-slot" />
              <InputOTPSlot index={5} className="shad-otp-slot" />
            </InputOTPGroup>
          </InputOTP>

          <span className="text-red body-3">{otpValidate}</span>
        </div>

        <AlertDialogFooter>
          <div className="w-full flex flex-col gap-4">
            <AlertDialogAction
              type="button"
              className="shad-submit-btn h-12"
              disabled={isLoading || isResendLoading}
              onClick={handleSubmit}
            >
              {t("SM_AuthForm_OTP_Dialog_Submit")}
              <RenderIf condition={isLoading}>
                <Image
                  src="/assets/icons/loader.svg"
                  alt="loader"
                  width={24}
                  height={24}
                  className="animate-spin ml-1"
                />
              </RenderIf>
            </AlertDialogAction>
            <div className="text-center text-sm">
              {t("SM_AuthForm_OTP_Dialog_Did_Not_Get_Code")}
              <Button
                type="button"
                variant="link"
                className="pl-1.5 text-brand"
                disabled={isLoading || isResendLoading}
                onClick={handleResendOtp}
              >
                {t("SM_AuthForm_OTP_Dialog_Resend")}
                <RenderIf condition={isResendLoading}>
                  <Image
                    src="/assets/icons/loader-brand.svg"
                    alt="loader"
                    width={20}
                    height={20}
                    className="animate-spin ml-1"
                  />
                </RenderIf>
              </Button>
            </div>
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default memo(OtpModal);
