import { NextRequest, NextResponse } from "next/server";
import { getUser } from "@/services/auth.service";
import { Role } from "@/types/user.types";

export async function proxy(req: NextRequest) {
  const pathName = req.nextUrl.pathname;

  const user = await getUser(req);
  if (!user) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("redirect", pathName);
    return NextResponse.redirect(loginUrl);
  }

  const isAdmin = user.role === Role.ADMIN
  const isTutor = user.role === Role.TUTOR
  const isStudent = user.role === Role.STUDENT

  // Admin
  if (
    (isAdmin && pathName.startsWith("/tutor")) ||
    (isAdmin && pathName.startsWith("/dashboard"))
  ) {
    return NextResponse.redirect(new URL("/admin", req.url));
  }
  // Tutor
  if (
    (isTutor && pathName.startsWith("/admin")) ||
    (isTutor && pathName.startsWith("/dashboard"))
  ) {
    return NextResponse.redirect(new URL("/tutor", req.url));
  }
  // Student
  if (
    (isStudent && pathName.startsWith("/admin")) ||
    (isStudent && pathName.startsWith("/tutor"))
  ) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }
  const headers = new Headers(req.headers);
  headers.set("x-user-id", user.id)
  headers.set("x-user-role", user.role)
  headers.set("x-user-name", user.name)

  return NextResponse.next({ request: { headers } });
}

export const config = {
  matcher: [
    "/admin",
    "/admin/:path*",
    "/tutor",
    "/tutor/:path*",
    "/dashboard",
    "/dashboard/:path*",
  ],
};
