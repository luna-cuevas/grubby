"use client";
import { globalStateAtom } from "@/context/atoms";
import { useSupabase } from "@/lib/supabase";
import { XCircleIcon } from "@heroicons/react/24/solid";
import { useAtom } from "jotai";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";

type Props = {};

const SignUpFormModal = (props: Props) => {
  const [state, setState] = useAtom(globalStateAtom);
  const searchParams = useSearchParams();
  const [loginWithEmail, setLoginWithEmail] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [otpConfirmed, setOtpConfirmed] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const supabase = useSupabase();

  const sendOTP = async () => {
    // Check if user is already registered
    const { data: existingUser, error: checkError } = await supabase
      .from("profiles")
      .select("*")
      .eq("email", email)
      .single();

    if (checkError && checkError.code !== "PGRST116") {
      // Handle unexpected error
      toast.error("An unexpected error occurred. Please try again.");
      return;
    }

    if (existingUser) {
      // User already registered
      router.push("/login");

      toast.error("User already registered. Please log in.");
      return;
    }

    // Proceed to send OTP
    const { data, error } = await supabase.auth.signInWithOtp({
      email: email,
      options: {
        shouldCreateUser: true,
      },
    });

    if (error) {
      toast.error(error.message);
    } else {
      setOtpSent(true);
    }
  };

  const verifyOTP = async () => {
    const {
      data: { session },
      error,
    } = await supabase.auth.verifyOtp({
      email,
      token: otpCode,
      type: "email",
    });

    if (error) {
      toast.error(error.message);
      return;
    }

    if (session && session.user) {
      setOtpConfirmed(true);
    }
  };

  const resetPassword = async () => {
    const { data, error } = await supabase.auth.updateUser({
      password: password,
    });

    if (error) {
      toast.error(error.message);
    } else {
      const { data: userData, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error("Error signing in:", error.message);
        toast.error(error.message);
      } else {
        const { data, error } = await supabase
          .from("profiles")
          .insert({
            id: userData.session.user.id,
            name: email,
            email: email,
            subscription_plan: "free",
            wordCount: 0,
            wordsMax: 100,
            inputMax: 100,
          })
          .select();

        if (error) {
          console.error("Error creating profile:", error.message);
          toast.error(error.message);
        } else {
          console.log("Profile created successfully:", data);
          toast.success("Signed in successfully");

          setState({
            ...state,

            isSignUpModalOpen: false,
          });
        }
      }
    }
  };

  const signUpWithGoogle = async () => {
    supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/callback`,
      },
    });
  };

  return (
    <div
      className={`
      ${state.isSignUpModalOpen ? "flex" : " hidden"}
     z-[10000] m-auto bg-black bg-opacity-50  w-screen h-screen fixed left-0 right-0  flex-col justify-center `}>
      <div className="max-w-[600px] relative m-auto rounded-xl h-fit p-8 bg-white">
        <button
          type="button"
          className="absolute top-4 right-4"
          onClick={() =>
            setState({
              ...state,
              isSignUpModalOpen: false,
            })
          }>
          <XCircleIcon className="h-6 w-6" />
        </button>
        <Link
          className="flex items-center justify-center text-2xl font-extrabold mb-4 text-blue-600"
          href="/">
          GrubbyAI
        </Link>
        <h1 className="mb-4 text-center text-3xl font-bold md:text-3xl">
          {otpSent && !otpConfirmed
            ? "Verify Your Email Address"
            : "Sign up to GrubbyAI"}
        </h1>
        <p className="y mb-12 text-center md:mb-12">
          {otpSent
            ? `A verification code has been sent to ${email}`
            : "Try Our Next-Gen Undetectable AI Writer to Bypass AI Detection Effortlessly"}
        </p>
        {loginWithEmail ? (
          otpSent ? (
            otpConfirmed ? (
              <div className="flex flex-col items-center gap-4">
                <input
                  placeholder="Email address"
                  id="email"
                  disabled={true}
                  className="w-full h-12 p-4 text-gray-400"
                  type="text"
                  value={email}
                />
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="new-password"
                  maxLength={16}
                  placeholder="Password"
                  id="password"
                  type="password"
                  className="w-full h-12 border border-gray-200 p-4"
                />
                <button
                  onClick={() => resetPassword()}
                  type="button"
                  className="bg-blue-600 w-full text-white rounded-lg flex h-12 items-center justify-center">
                  <span>Create account</span>
                </button>
              </div>
            ) : (
              <div className="flex max-w-[470px] flex-col justify-center pb-9">
                <div className="flex flex-col items-center">
                  <div className="w-full">
                    <input
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, "");
                        setOtpCode(value);
                      }}
                      placeholder="Enter code"
                      id="code"
                      className="border border-gray-200 rounded-lg w-full p-3"
                      type="number"
                      value={otpCode || ""}
                    />
                    <p className="text-one-text-secondary text-center text-sm mb-3 mt-6">
                      Didn&apos;t get the code?&nbsp;
                      <button
                        type="button"
                        onClick={() => sendOTP()}
                        className="text-blue-600 hover:text-blue-300">
                        Resend code
                      </button>
                    </p>
                    <button
                      onClick={() => verifyOTP()}
                      type="button"
                      className="bg-blue-600 hover:bg-blue-300 w-full text-white rounded-lg flex h-12 items-center justify-center">
                      <p>Continue</p>
                    </button>
                    <p className="mt-3 text-center">
                      <button
                        type="button"
                        onClick={() => setOtpSent(false)}
                        className="text-blue-600 hover:text-blue-300 hover:cursor-pointer">
                        Change email
                      </button>
                    </p>
                  </div>
                </div>
              </div>
            )
          ) : (
            <div className="w-full">
              <input
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                id="email"
                className="border border-gray-200 w-full p-4 h-12 "
                type="text"
                value={email}
              />
              <button
                onClick={() => sendOTP()}
                type="button"
                className="bg-blue-600 hover:bg-blue-300 w-full text-white my-4 rounded-lg flex h-12 items-center justify-center">
                <p>Continue</p>
              </button>
              <button
                onClick={() => signUpWithGoogle()}
                type="button"
                className="border-blue-600 border mt-12 hover:text-blue-700 w-full transition-all duration-300 rounded-lg text-blue-600 group flex h-16 items-center justify-center text-lg font-semibold mb-5">
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
                          clipPath="url(#B)"
                          fill="#fbbc05"
                        />
                        <path
                          d="M0 11l17 13 7-6.1L48 14V0H0z"
                          clipPath="url(#B)"
                          fill="#ea4335"
                        />
                        <path
                          d="M0 37l30-23 7.9 1L48 0v48H0z"
                          clipPath="url(#B)"
                          fill="#34a853"
                        />
                        <path
                          d="M48 48L17 24l-4-3 35-10z"
                          clipPath="url(#B)"
                          fill="#4285f4"
                        />
                      </g>
                    </svg>
                  </span>
                </span>
                Sign up with Google
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
            </div>
          )
        ) : (
          <div className="flex flex-col">
            <button
              onClick={() => signUpWithGoogle()}
              type="button"
              className="bg-blue-600 hover:bg-blue-700 transition-all duration-300 rounded-lg text-white group flex h-16 items-center justify-center text-lg font-semibold mb-5">
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
                        clipPath="url(#B)"
                        fill="#fbbc05"
                      />
                      <path
                        d="M0 11l17 13 7-6.1L48 14V0H0z"
                        clipPath="url(#B)"
                        fill="#ea4335"
                      />
                      <path
                        d="M0 37l30-23 7.9 1L48 0v48H0z"
                        clipPath="url(#B)"
                        fill="#34a853"
                      />
                      <path
                        d="M48 48L17 24l-4-3 35-10z"
                        clipPath="url(#B)"
                        fill="#4285f4"
                      />
                    </g>
                  </svg>
                </span>
              </span>
              Sign up with Google
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
            <button
              onClick={() => setLoginWithEmail(true)}
              type="button"
              className="bg-gray-200 hover:text-blue-600 transition-all duration-300 rounded-lg mb-8 h-16 border-none font-semibold">
              Or sign up with your email
            </button>
            <p className="text-display-secondary mb-6 mt-3 text-center text-sm">
              Already have an account?{" "}
              <Link href={"/login"} className="text-blue-600 cursor-pointer">
                Log in
              </Link>
            </p>
            <p className="text-center text-xs">
              By signing up, you agree to our{" "}
              <Link className="text-blue-600 hover:underline" href="/terms">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link className="text-blue-600 hover:underline" href="/privacy">
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SignUpFormModal;
