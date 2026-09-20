"use client";
import Image from "next/image";
import Link from "next/link";

import logo from "@/public/assets/new_logo.png"

export default function AuthHeader({ type }) {
  const isRegisterPage = type === "/auth/register";
  const isForgetPasswordPage = type === "";
  const isNewPasswordPage = type === "/auth/new-password";

  if(isForgetPasswordPage || isNewPasswordPage){
    return (
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0 sticky top-0 bg-white z-50 py-4 sm:py-8 w-full px-4 sm:px-0">
        <Link href={"/"} className="w-full sm:w-35 xl:w-45 h-auto">
          <Image
            src={logo}
            alt="logo"
            height={180}
            width={180}
            className="object-contain w-full h-full"
          />
        </Link>
      </div>
    )
  }

  return (
    <>
      {
        isRegisterPage ? (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0 sticky top-0 bg-white z-50 py-4 sm:py-8 w-full px-4 sm:px-0">
            <Link href={"/"}>
              <Image
                src={logo}
                alt="logo"
                width={180}
                height={180}
                className="object-contain w-full sm:w-35 xl:w-45 h-auto"
              />
            </Link>

            <p className="text-sm sm:text-base text-[#525252] text-center">
              Already have an account?{" "}
              <Link href={"/auth"} className="text-[#2C5F8D] font-bold">
                Log in
              </Link>
            </p>
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0 sticky top-0 bg-white z-50 py-4 sm:py-8 w-full px-4 sm:px-0">
            <Link href={"/"}>
              <Image
                src={logo}
                alt="logo"
                width={180}
                height={180}
                className="object-contain w-full sm:w-35 xl:w-45 h-auto"
              />
            </Link>

            <p className="text-sm sm:text-base text-[#525252] text-center">
              New to STEMRN?{" "}
              <Link href={"/auth/register"} className="text-[#2C5F8D] font-bold">
                Create a free account
              </Link>
            </p>
          </div>
        )}
    </>
  );
};