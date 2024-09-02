import { auth } from "@/auth";
import { AuthRoutes, PublicRoutes } from "@/routes";
import { NextResponse } from "next/server";

export async function isUserLoggedIn() {
  const session = await auth();

  if (session?.user) {
    return true;
  }
  return false;
}
