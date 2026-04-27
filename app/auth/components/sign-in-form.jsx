"use client";
import CommonFieldsetInput from "@/components/common-fieldset-input"
import AuthCommonTitle from "./auth-common-title"
import { useForm } from "react-hook-form"
import Link from "next/link";
import { Divider } from "antd";
import GoogleLogin from "./google-login";


const SignInForm = () => {
  const {
    control,
    formState: { errors },
    handleSubmit
  } = useForm();


  const onSubmit = (data) => {
    console.log(data);
  }

  // Note: UI
  return (
    <div className="w-full max-w-[470px] flex flex-col gap-8">
      <AuthCommonTitle
        title="Welcome to Stemrn"
        description="Please enter your details to create your account"
      />

      {/* form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-col gap-4"
      >

        {/* email */}
        <CommonFieldsetInput
          label="Email"
          register_as="email"
          type="email"
          name="email"
          control={control}
          placeholder="Enter your email"
          required
          errors={errors}
          validationRules={{
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address",
            },
          }}
        />
        {/* password */}
        <CommonFieldsetInput
          label="Password"
          register_as="password"
          type="password"
          name="password"
          control={control}
          placeholder="Enter your password"
          required
          errors={errors}
          validationRules={{
            required: "Password is required",
          }}
        />

        {/* forgot password */}
        <div className="w-full flex items-center justify-end">
          <Link
            href="/auth"
            className="text-base font-medium text-primary hover:text-primary/80 transition-colors hover:underline"
          >
            Forgot Password?
          </Link>
        </div>

        {/* remember me checkbox */}
        <div className="w-full flex items-center justify-between mb-4">
          <label className="flex items-center gap-2 cursor-pointer font-normal text-[#4c4b4b]">
            <input type="checkbox" className="accent-primary w-4 h-4" />
            Keep me signed in for 30 days
          </label>
        </div>

        {/* submit button */}
        <button
          type="submit"
          className="cursor-pointer w-full bg-primary text-white py-4 rounded-xl text-base font-medium hover:bg-primary/80 transition-colors"
        >
          Log in
        </button>
      </form>

      {/* or sign up with google */}
      <Divider className="text-base">or sign up with</Divider>

      <GoogleLogin />

    </div>
  )
};
export default SignInForm;