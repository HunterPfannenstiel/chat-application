import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getIronSession } from "iron-session/edge";
import { cookieSettings } from "./pages/api/utils";

export const middleware = async (req: NextRequest) => {
  const res = NextResponse.next();
  const session = (await getIronSession(req, res, cookieSettings)) as any;
  const { isVerified } = session;
  if (isVerified) {
    console.log("VERIFIED");
  } else {
    console.log("NOT VERIFIED");
    return NextResponse.redirect(new URL("/login", req.url));
  }
  return res;
};

export const config = {
  matcher: "/login",
};
