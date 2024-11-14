export interface ICreateAccount {
  email: string;
  fullName: string;
}

export interface IVerifyOtp {
  userId: string;
  otpCode: string;
}
