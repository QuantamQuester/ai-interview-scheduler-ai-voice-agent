"use client";
import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { supabase } from "@/services/supabaseClient";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();

  const signInWithGoogle = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/dashboard`, // Redirects to dashboard after login
      },
    });

    if (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex flex-col items-center border rounded-2xl p-8">
        <Image
          src={"/logo.png"}
          alt="logo"
          width={400}
          height={100}
          className="w-[180px]"
        />
        <div className="flex flex-col items-center">
          <Image
            src={"/login.png"}
            alt="login"
            width={600}
            height={400}
            className="w-[400px] rounded-2xl"
          />
          <h2 className="text-2xl font-bold text-center mt-5">
            Welcome to RecruitMaster
          </h2>
          <p className="text-gray-500 text-center">
            Sign in with Google Authentication
          </p>
          <Button className="mt-7 w-full" onClick={signInWithGoogle}>
            Login with Google
          </Button>
        </div>
      </div>
    </div>
  );
}
