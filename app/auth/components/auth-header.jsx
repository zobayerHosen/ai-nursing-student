"use client";
import Image from "next/image";
import Link from "next/link";

import logo from "@/public/assets/auth/auth-header-logo.svg"

export default function AuthHeader({ type }) {
  const isRegisterPage = type === "/auth/register";

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
                className="object-contain w-[140px] xl:w-[180px]"
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
                className="object-contain w-[140px] xl:w-[180px]"
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