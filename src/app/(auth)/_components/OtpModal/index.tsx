"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { memo, MouseEvent, useState } from "react";

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
import { EPath } from "@/constants/path";
import { sendEmailOTP, verifyOtp } from "@/lib/actions/user";

interface IProps {
  email: string;
  userId: string;
}

function OtpModal(props: IProps) {
  const { email, userId } = props;

  const router = useRouter();

  const [otpCode, setOtpCode] = useState<string>("");
  const [otpValidate, setOtpValidate] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isResendLoading, setIsResendLoading] = useState<boolean>(false);

  const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!otpCode) {
      setOtpValidate("Please enter your OTP code.");
      return;
    }

    if (otpCode.length < 6) {
      setOtpValidate("OTP code is incorrect.");
      return;
    }

    setOtpValidate("");
    setIsLoading(true);

    try {
      const { sessionId } = await verifyOtp({ userId, otpCode });

      if (sessionId) {
        router.push(EPath.HOME);
      }
    } catch (error) {
      // Do something with error
      console.log(error);
    }

    setIsLoading(false);
  };

  const handleResendOtp = async () => {
    setIsResendLoading(true);
    try {
      await sendEmailOTP({ email });
    } catch (error) {
      // Do something with error
      console.log(error);
    } finally {
      setIsResendLoading(false);
    }
  };

  return (
    <AlertDialog open={!!userId}>
      <AlertDialogContent className="shad-alert-dialog">
        <AlertDialogHeader className="relative flex justify-center">
          <AlertDialogTitle className="h2 text-center">
            Enter your OTP
          </AlertDialogTitle>
          <AlertDialogDescription className="subtitle-2 text-center text-light-100">
            We&apos;ve sent the code to{" "}
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
              Submit
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
              Didn&apos;t get a code?
              <Button
                type="button"
                variant="link"
                className="pl-1.5 text-brand"
                disabled={isLoading || isResendLoading}
                onClick={handleResendOtp}
              >
                Resend
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
