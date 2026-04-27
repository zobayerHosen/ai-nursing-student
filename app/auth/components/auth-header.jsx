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
          <div className="flex items-center justify-between sticky top-0 bg-white z-50 py-8 w-full">
            <Link href={"/"}>
              <Image
                src={logo}
                alt="logo"
                width={180}
                height={180}
                className="object-contain"
              />
            </Link>

            <p className="text-base text-[#525252]">
              Already have an account?{" "}
              <Link href={"/auth"} className="text-[#2C5F8D] font-bold">
                Log in
              </Link>
            </p>
          </div>
        ) : (
          <div className="flex items-center justify-between sticky top-0 bg-white z-50 py-8 w-full">
            <Link href={"/"}>
              <Image
                src={logo}
                alt="logo"
                width={180}
                height={180}
                className="object-contain"
              />
            </Link>

            <p className="text-base text-[#525252]">
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