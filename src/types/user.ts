export interface IMessage {
  message: string;
}

// export interface IGetOtpCode {
//   email: string;
// }

export interface IGetOtpResponse extends IMessage {
  data: {
    userId: number;
  };
}

// export interface ISignIn {
//   userId: string;
//   otpCode: string;
// }

export interface IGetMe extends IMessage {
  data: {
    id: number;
    fullName: string;
    email: string;
    avatar: string;
  };
}

// export interface ICreateAccount {
//   email: string;
//   fullName: string;
// }
