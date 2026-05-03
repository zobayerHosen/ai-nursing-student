import React from "react";
import AuthHeader from "../components/auth-header";
import RegisterForm from "../components/register-form";
import AuthFooter from "../components/auth-footer";
import ProfileSetupForm from "../components/profile-setup-form";

export default function ProfileSetupPage() {
  return (
    <>
      <AuthHeader type={"/auth/register"} />
      <div className="flex-1 flex items-center justify-center">
        <ProfileSetupForm />
      </div>
      <AuthFooter />
    </>
  );
}


