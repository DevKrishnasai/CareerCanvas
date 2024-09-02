"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { isRedirectError } from "next/dist/client/components/redirect";
import { redirect } from "next/navigation";

export async function loginWithProvider(provider: string) {
  try {
    // Dynamically sign in with the chosen provider
    const success = await signIn(provider);
    console.log({ success });
    return success; // You might want to return this data to the client
  } catch (error) {
    console.error("Authentication Error:", error);

    if (error instanceof AuthError) {
      const { type, cause } = error;
      switch (type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        case "CallbackRouteError":
          return cause?.err?.toString();
        default:
          return "Something went wrong.";
      }
    } else if (isRedirectError(error)) {
      // Handle redirect-related errors
      redirect("/error-page"); // Redirect to a custom error page
    } else {
      return "Unknown error occurred.";
    }

    throw error; // Always rethrow errors if unhandled
  }
}
