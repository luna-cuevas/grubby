"use client";
import { useSupabase } from "@/lib/supabase";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";

type Props = {};

const ResetPasswordForm = (props: Props) => {
  const [email, setEmail] = useState("");
  const supabase = useSupabase();
  const params = useSearchParams();
  const emailParam = params.get("email");
  const router = useRouter();

  const sendPasswordResetEmail = async (email: string) => {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `http://localhost:3000/reset-password`,
    });

    if (error) {
      console.error("Error sending reset password email:", error.message);
      toast.error(error.message);
    } else {
      console.log("Reset password email sent:", data);
      toast.success("Reset password email sent");
    }
  };

  const resetPassword = async (password: string) => {
    const { data, error } = await supabase.auth.updateUser({
      password: password,
    });

    if (error) {
      console.error("Error resetting password:", error.message);
      toast.error(error.message);
    } else {
      console.log("Password reset successfully:", data);
      toast.success("Password reset successfully");
      router.push("/login");
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (emailParam) {
      const password = (event.target as HTMLFormElement).password.value;
      const confirmPassword = (event.target as HTMLFormElement).rePassword
        .value;

      if (password !== confirmPassword) {
        toast.error("Passwords do not match");
        return;
      }

      await resetPassword(password);
    } else {
      await sendPasswordResetEmail(email);
    }
  };

  return (
    <form className="flex flex-col" onSubmit={handleSubmit}>
      {!emailParam ? (
        <div className="flex flex-col gap-4">
          <h1 className="mb-2 text-center text-2xl font-extrabold text-gray-800">
            Forgot password?
          </h1>
          <p className="text-display-secondary mb-8 text-center font-gray-800">
            Enter the email address you used when you joined and we&apos;ll send
            you instructions to reset your password.
          </p>
          <input
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            id="email"
            className="p-4 w-full rounded-lg border border-gray-200"
            type="text"
            value={email}
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-400 text-white flex h-12 w-full items-center justify-center gap-x-1 rounded-[40px] text-lg font-semibold">
            Submit
          </button>
          <Link
            className="text-blue-600 hover:text-blue-400 flex items-center justify-center text-sm font-semibold"
            href="/login">
            Back to Login
          </Link>
        </div>
      ) : (
        <div className="w-full">
          <h1 className="mb-8 text-center text-2xl font-extrabold">
            Reset password
          </h1>
          <div className="flex flex-col gap-4">
            <input
              maxLength={16}
              placeholder="Password"
              id="password"
              type="password"
              className="p-4 w-full rounded-lg border border-gray-200"
            />
            <input
              placeholder="Confirm password"
              id="rePassword"
              type="password"
              className="p-4 w-full rounded-lg border border-gray-200"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white hover:bg-blue-400 group flex h-12 w-full items-center justify-center gap-x-1 rounded-[40px] text-lg font-semibold">
              <span>Submit</span>
            </button>
          </div>
        </div>
      )}
    </form>
  );
};

export default ResetPasswordForm;
