import React from "react";
import AuthHeader from "../components/auth-header";
import RegisterForm from "../components/register-form";
import AuthFooter from "../components/auth-footer";
import ReviewAndSetupForm from "../components/review-and-setup-form";

const page = () => {
  return (
    <>
      <AuthHeader type={"/auth/register"} />
      <div className="flex-1 flex items-center justify-center">
        <ReviewAndSetupForm />
      </div>
      <AuthFooter />
    </>
  );
};

export default page;
