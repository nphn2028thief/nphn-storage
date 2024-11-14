"use server";

import { ID, Query } from "node-appwrite";

import { createAdminClient } from "../appwrite";
import { appwriteConfig } from "../appwrite/config";
import { ICreateAccount, IVerifyOtp } from "@/types/user";
import { parseStringify } from "../utils";
import { cookies } from "next/headers";

const handleError = (error: unknown, message: string) => {
  console.log(error, message);
  throw error;
};

const getUserByEmail = async (email: string) => {
  const { databases } = await createAdminClient();

  const result = await databases.listDocuments(
    appwriteConfig.databaseId,
    appwriteConfig.usersCollectionId,
    [Query.equal("email", [email])]
  );

  return result.total > 0 ? result.documents[0] : null;
};

export const sendEmailOTP = async ({ email }: { email: string }) => {
  const { account } = await createAdminClient();

  try {
    const session = await account.createEmailToken(ID.unique(), email);
    return session.userId;
  } catch (error) {
    handleError(error, "Failed to send email OTP.");
  }
};

export const createUser = async ({
  email,
  fullName,
}: ICreateAccount): Promise<{ id: string }> => {
  // UserId
  const id = await sendEmailOTP({ email });

  if (!id) {
    throw new Error("Failed to send an OTP");
  }

  const existingUser = await getUserByEmail(email);

  if (!existingUser) {
    const { databases } = await createAdminClient();

    await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      ID.unique(),
      {
        fullName,
        email,
        avatar:
          "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg",
        id,
      }
    );
  }

  return parseStringify({ id });
};

export const verifyOtp = async ({ userId, otpCode }: IVerifyOtp) => {
  try {
    const { account } = await createAdminClient();
    const session = await account.createSession(userId, otpCode);

    (await cookies()).set("appwrite-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    return parseStringify({ sessionId: session.$id });
  } catch (error) {
    handleError(error, "Failed to verify OTP.");
  }
};
