import { NextRequest, NextResponse } from "next/server";

import envConfig from "./config/envConfig";
import { EPath } from "./constants/path";

export async function middleware(request: NextRequest) {
  const cookie = request.cookies;

  if (!cookie.toString()) {
    return NextResponse.redirect(new URL(EPath.SIGNIN, request.url));
  }

  try {
    const res = await fetch(`${envConfig.apiUrl}/auth/getMe`, {
      method: "GET",
      credentials: "include",
      headers: {
        Cookie: cookie.toString(),
      },
    });

    if (!res.ok) {
      return NextResponse.redirect(new URL(EPath.SIGNIN, request.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Get user error:", error);
    return NextResponse.redirect(new URL(EPath.SIGNIN, request.url));
  }

  // return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/documents/:path*",
    "/images/:path*",
    "/media/:path*",
    "/others/:path*",
  ],
};
