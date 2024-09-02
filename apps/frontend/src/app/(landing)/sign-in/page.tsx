// Client-side component
"use client";

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { FaGithub, FaGoogle, FaSpinner } from "react-icons/fa";
import React, { useState } from "react";

const LoginPage = () => {
  const [loading, setLoading] = useState({
    loading: false,
    provider: "",
  });

  const loginWith = (provider: string) => {
    setLoading({
      loading: true,
      provider,
    });

    signIn(provider)
      .then((data) => {
        console.log({ data });
      })
      .catch((error) => {
        console.error("Authentication Error:", error);
      })
      .finally(() => {
        setLoading({
          loading: false,
          provider: "",
        });
      });
  };

  return (
    <div className="flex justify-center items-center h-[calc(100vh-200px)] max-h-full">
      <div className="mx-auto max-w-sm space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Login</h1>
          <p className="text-muted-foreground">
            Sign in to your account using your preferred method.
          </p>
        </div>
        <div className="space-y-4">
          <Button
            variant="outline"
            className="w-full"
            onClick={() => loginWith("google")}
          >
            {loading.loading && loading.provider === "google" ? (
              <div className="animate-spin">
                <FaSpinner className="h-5 w-5 mr-2" />
              </div>
            ) : (
              <FaGoogle className="h-5 w-5 mr-2" />
            )}
            Sign in with Google
          </Button>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => loginWith("github")}
          >
            {loading.loading && loading.provider === "github" ? (
              <div className="animate-spin">
                <FaSpinner className="h-5 w-5 mr-2" />
              </div>
            ) : (
              <FaGithub className="h-5 w-5 mr-2" />
            )}
            Sign in with GitHub
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
