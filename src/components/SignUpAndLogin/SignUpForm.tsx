"use client";
import { globalStateAtom } from "@/context/atoms";
import { useSupabase } from "@/lib/supabase";
import { useAtom } from "jotai";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";

type Props = {};

const SignUpForm = (props: Props) => {
  const [state, setState] = useAtom(globalStateAtom);
  const [loginWithEmail, setLoginWithEmail] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [otpConfirmed, setOtpConfirmed] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const supabase = useSupabase();

  const sendOTP = async () => {
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
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast.error(error.message);
      } else {
        router.push("/");
      }
    }
  };

  const signUpWithGoogle = async () => {
    supabase.auth.signInWithOAuth({
      provider: "google",
    });
  };

  return (
    <div className="flex lg:max-w-[470px] flex-col justify-center pb-9 lg:px-7">
      <Link
        className="flex items-center justify-center text-2xl font-extrabold mb-4 text-blue-600"
        href="/">
        {/* <svg
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 90 24"
          className="mb-12 h-7 md:mb-6">
          <path
            d="M57.651 18.523c-1.45 0-2.518-.286-3.207-.857-.673-.57-.988-1.457-.944-2.657 0-.161.088-.242.264-.242h1.976c.147 0 .22.08.22.242 0 .527.14.915.417 1.164.278.249.703.373 1.274.373.6 0 1.047-.095 1.34-.285.293-.19.44-.484.44-.879a.955.955 0 0 0-.286-.703c-.19-.205-.498-.395-.923-.57l-2.504-1.055c-.761-.322-1.31-.703-1.647-1.142-.322-.44-.483-1.01-.483-1.713 0-.996.322-1.743.966-2.24.66-.513 1.67-.77 3.031-.77 1.391 0 2.438.264 3.14.792.704.527 1.055 1.295 1.055 2.306 0 .16-.088.241-.264.241H59.54a.321.321 0 0 1-.198-.066c-.044-.058-.066-.153-.066-.285a.835.835 0 0 0-.417-.747c-.278-.19-.666-.285-1.164-.285-.513 0-.893.087-1.142.263-.249.176-.373.44-.373.79 0 .264.073.47.22.616.16.146.468.315.922.505l2.503 1.054c.776.322 1.333.71 1.67 1.164.351.44.527 1.018.527 1.735 0 1.07-.374 1.882-1.12 2.438-.747.542-1.83.813-3.25.813ZM48.136 18.523c-1.45 0-2.518-.286-3.206-.857-.674-.57-.988-1.457-.944-2.657 0-.161.087-.242.263-.242h1.977c.146 0 .22.08.22.242 0 .527.138.915.417 1.164.278.249.702.373 1.273.373.6 0 1.047-.095 1.34-.285.293-.19.44-.484.44-.879a.955.955 0 0 0-.286-.703c-.19-.205-.498-.395-.922-.57l-2.504-1.055c-.762-.322-1.31-.703-1.648-1.142-.322-.44-.483-1.01-.483-1.713 0-.996.322-1.743.967-2.24.659-.513 1.669-.77 3.03-.77 1.392 0 2.438.264 3.141.792.703.527 1.054 1.295 1.054 2.306 0 .16-.087.241-.263.241h-1.977a.321.321 0 0 1-.197-.066c-.044-.058-.066-.153-.066-.285a.835.835 0 0 0-.418-.747c-.278-.19-.666-.285-1.164-.285-.512 0-.893.087-1.142.263-.249.176-.373.44-.373.79 0 .264.073.47.22.616.16.146.468.315.922.505l2.504 1.054c.776.322 1.332.71 1.669 1.164.351.44.527 1.018.527 1.735 0 1.07-.373 1.882-1.12 2.438-.747.542-1.83.813-3.25.813ZM40.227 18.26c-.088 0-.154-.023-.198-.067a1.696 1.696 0 0 1-.088-.22c-.029-.146-.066-.395-.11-.746-.043-.366-.08-.703-.11-1.01l-.153-.9v-4.393c0-.615-.124-1.047-.373-1.296-.25-.264-.681-.396-1.296-.396-1.113 0-1.655.403-1.625 1.208 0 .176-.081.264-.242.264h-1.977c-.175 0-.27-.132-.285-.395-.088-.981.241-1.743.988-2.285.761-.556 1.845-.834 3.25-.834 1.435 0 2.482.307 3.141.922.674.615 1.01 1.567 1.01 2.855v4.569c0 .468.008.908.023 1.318.029.41.065.783.11 1.12.029.19-.052.285-.242.285h-1.823Zm-4.195.263c-.878 0-1.552-.264-2.02-.791-.47-.527-.703-1.281-.703-2.262 0-.761.146-1.377.439-1.845.293-.483.769-.857 1.427-1.12.674-.278 1.567-.461 2.68-.55l2.042-.175v1.581l-1.822.154c-.85.073-1.435.234-1.758.483-.322.25-.483.652-.483 1.208 0 .425.088.747.264.967.176.205.446.307.813.307.439 0 .885-.139 1.34-.417.453-.293 1.024-.805 1.712-1.537l.088 1.756c-.44.484-.871.894-1.296 1.23a4.696 4.696 0 0 1-1.295.747 3.81 3.81 0 0 1-1.428.264ZM27.987 18.523a7.076 7.076 0 0 1-1.669-.22c-.585-.132-1.076-.315-1.471-.549l-.044-2.065c.38.22.79.389 1.23.506.439.102.849.153 1.23.153.702 0 1.215-.212 1.537-.636.322-.425.483-1.047.483-1.867v-2.328c0-.718-.124-1.245-.373-1.582-.25-.337-.637-.505-1.164-.505-.454 0-.915.14-1.384.417-.468.279-1.025.71-1.67 1.296l-.109-1.933c.425-.41.85-.76 1.274-1.054a5.224 5.224 0 0 1 1.318-.703 4.041 4.041 0 0 1 1.471-.263c1.07 0 1.874.322 2.416.966.542.63.813 1.604.813 2.921v3.01c0 1.493-.337 2.605-1.01 3.337-.66.733-1.618 1.099-2.878 1.099Zm-5.16 3.8c-.162 0-.243-.089-.243-.264V10.067c0-.38-.014-.776-.043-1.186-.03-.41-.066-.79-.11-1.142-.015-.19.073-.286.263-.286h1.845c.161 0 .256.081.286.242.029.117.058.27.088.461.029.176.05.359.065.55.015.19.022.343.022.46l.176 1.23V22.06c0 .175-.088.263-.263.263h-2.087ZM13.647 22.322c-.205 0-.264-.102-.176-.307l1.472-3.844-4.02-10.41c-.073-.205-.007-.308.198-.308h2.262c.147 0 .242.074.286.22l1.581 4.502c.161.454.315.938.461 1.45.147.498.286 1.003.418 1.515h.043c.147-.512.293-1.017.44-1.515.146-.498.3-.981.461-1.45l1.581-4.502c.044-.146.14-.22.286-.22h2.196c.088 0 .154.03.198.088.044.059.051.132.022.22l-5.381 14.364c-.059.131-.154.197-.286.197h-2.042ZM.242 18.26C.08 18.26 0 18.17 0 17.995V4.137c0-.176.08-.263.242-.263h4.37c1.728 0 3.024.292 3.888.878.878.586 1.317 1.479 1.317 2.68 0 .834-.19 1.5-.57 1.998-.367.498-.967.893-1.802 1.186v.066c.981.176 1.72.556 2.219 1.142.512.571.768 1.347.768 2.328 0 1.435-.46 2.482-1.383 3.14-.923.645-2.402.967-4.437.967H.242Zm2.394-2.197h2.042c1.113 0 1.91-.154 2.394-.461.483-.322.725-.857.725-1.604 0-.732-.25-1.266-.747-1.603-.483-.337-1.266-.505-2.35-.505H2.636v4.173Zm0-6.172h1.91c.923 0 1.589-.16 1.999-.483.425-.322.637-.82.637-1.493 0-.66-.22-1.135-.66-1.428-.438-.293-1.156-.44-2.151-.44H2.636v3.844Z"
            fill="#1B1746"></path>
          <path
            d="M65.126 5.845a3.808 3.808 0 0 1 3.378-3.783L84.69.222a3.808 3.808 0 0 1 4.238 3.784v15.27c0 2.274-1.98 4.041-4.238 3.784l-16.185-1.839a3.808 3.808 0 0 1-3.378-3.784V5.845Z"
            fill="#6456FF"></path>
          <path
            d="M68.814 17.26c-.165 0-.23-.084-.191-.25l4.125-12.088c.038-.115.121-.172.248-.172h2.445c.14 0 .23.057.267.172l4.145 12.089c.025.076.019.14-.02.19-.025.039-.076.058-.152.058h-2.025c-.127 0-.21-.057-.248-.172l-2.464-7.85c-.127-.42-.254-.833-.382-1.24l-.343-1.26h-.038c-.115.407-.236.82-.363 1.24-.115.408-.236.815-.363 1.223l-2.407 7.868c-.038.127-.127.191-.267.191h-1.967Zm2.616-2.617.44-1.872h4.64l.459 1.872H71.43Zm10.327 2.616c-.14 0-.21-.076-.21-.23V4.98c0-.153.07-.23.21-.23h1.853c.153 0 .229.077.229.23v12.05c0 .154-.076.23-.23.23h-1.852Z"
            fill="#fff"></path>
        </svg> */}
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
                <div className="w-full max-w-[420px]">
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
                    Didn't get the code?&nbsp;
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
          <div className="w-full max-w-[420px]">
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
  );
};

export default SignUpForm;
