import ResetPasswordForm from "@/components/SignUpAndLogin/ResetPasswordForm";
import React from "react";
import { Suspense } from "react";

type Props = {};

const page = (props: Props) => {
  return (
    <main className="flex items-center px-4">
      <div className="mx-auto max-w-[538px] w-full mt-24 overflow-hidden rounded-lg border-2 ">
        <div className="relative w-full py-[56px] md:px-4 md:py-6 md:pt-16 px-8">
          <Suspense fallback={<div>Loading...</div>}>
            <ResetPasswordForm />
          </Suspense>
        </div>
      </div>
    </main>
  );
};

export default page;
