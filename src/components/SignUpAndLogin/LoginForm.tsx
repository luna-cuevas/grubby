"use client";
import { globalStateAtom } from "@/context/atoms";
import { useSupabase } from "@/lib/supabase";
import { useAtom } from "jotai";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";

type Props = {};

const LoginForm = (props: Props) => {
  const [state, setState] = useAtom(globalStateAtom);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const supabase = useSupabase();

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      router.push("/");
    } catch (error: any) {
      toast.error(error.error_description || error.message);
    }
  };

  const signUpWithGoogle = async () => {
    supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}`,
      },
    });
  };

  return (
    <div className="flex lg:max-w-[470px] flex-col justify-center pb-9 lg:px-7">
      <Link
        className="flex items-center justify-center text-2xl font-extrabold mb-4 text-blue-600"
        href="/">
        GrubbyAI
      </Link>
      <h1 className="mb-4 text-center text-3xl font-bold md:text-3xl">
        Log in to GrubbyAI
      </h1>
      <p className="y mb-12 text-center md:mb-12">
        Try Our Next-Gen Undetectable AI Writer to Bypass AI Detection
        Effortlessly
      </p>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          signIn(email, password);
        }}
        className="flex flex-col gap-4">
        <input
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email address"
          id="email"
          className="w-full p-4 rounded-lg border border-gray-200"
          type="text"
          value={email}
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          maxLength={16}
          value={password}
          placeholder="Password"
          id="password"
          type="password"
          className="w-full p-4 rounded-lg border border-gray-200"
        />
        <Link
          className="text-blue-600 hover:text-blue-300 mb-6 inline-block text-sm hover:underline"
          href="/reset-password">
          Forgot password?
        </Link>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-400 rounded-lg text-white flex h-12 items-center justify-center">
          Log in
        </button>
      </form>

      <div className="flex flex-col">
        <button
          onClick={() => signUpWithGoogle()}
          type="button"
          className="bg-transparent border-blue-600 mt-8 border hover:bg-blue-700 transition-all duration-300 rounded-lg text-blue-600 hover:text-white group flex h-16 items-center justify-center text-lg font-semibold mb-5">
          <span className="inline-flex justify-center items-center mr-2  h-9 w-9 rounded-full bg-white">
            <span className="inline-flex justify-center items-center h-8 w-8">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 32 32"
                width="64"
                height="64">
                <defs>
                  <path
                    id="A"
                    d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"
                  />
                </defs>
                <clipPath id="B">
                  <use xlinkHref="#A" />
                </clipPath>
                <g transform="matrix(.727273 0 0 .727273 -.954545 -1.45455)">
                  <path
                    d="M0 37V11l17 13z"
                    clip-path="url(#B)"
                    fill="#fbbc05"
                  />
                  <path
                    d="M0 11l17 13 7-6.1L48 14V0H0z"
                    clip-path="url(#B)"
                    fill="#ea4335"
                  />
                  <path
                    d="M0 37l30-23 7.9 1L48 0v48H0z"
                    clip-path="url(#B)"
                    fill="#34a853"
                  />
                  <path
                    d="M48 48L17 24l-4-3 35-10z"
                    clip-path="url(#B)"
                    fill="#4285f4"
                  />
                </g>
              </svg>
            </span>
          </span>
          Log in with Google
          <span className="inline-flex justify-center items-center ml-2 h-6 w-6 transition-transform group-hover:translate-x-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-6">
              <path
                fillRule="evenodd"
                d="M12.97 3.97a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06l6.22-6.22H3a.75.75 0 0 1 0-1.5h16.19l-6.22-6.22a.75.75 0 0 1 0-1.06Z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </button>
        {/* <button
          onClick={() => setLoginWithEmail(true)}
          type="button"
          className="bg-gray-200 hover:text-blue-600 transition-all duration-300 rounded-lg mb-8 h-16 border-none font-semibold">
          Or sign up with your email
        </button> */}
        <p className="text-display-secondary mb-6 mt-3 text-center text-sm">
          Need an account?{" "}
          <Link href={"/sign-up"} className="text-blue-600 cursor-pointer">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
