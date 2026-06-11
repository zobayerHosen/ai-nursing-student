"use client";
import CommonFieldsetInput from "@/components/common-fieldset-input"
import AuthCommonTitle from "./auth-common-title"
import { useForm } from "react-hook-form"
import Link from "next/link";
import { Divider } from "antd";
// import GoogleLogin from "./google-login";
import { useSignin } from "@/hooks";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import setToken from "@/utils/setToken";
import LoadingIcon from "@/components/loading-icon";
import { ROUTE_PATH } from "@/constants/route-naming";
import GoogleLogins from "./google-login";

const SignInForm = () => {
  const router = useRouter();
  const { signin, isPending } = useSignin();

  // Note: React hook form
  const {
    control,
    formState: { errors },
    handleSubmit
  } = useForm();

  // Note: sign in mutation
  const onSubmit = (data) => {
    signin(data, {
      onSuccess: (res) => {
        const responseData = res?.data || res;
        if (responseData?.is_profile_complete === false) {
          router.push(ROUTE_PATH.PROFILE_SETUP);
          setToken(responseData?.tokens?.access, responseData?.expires_in);
        } else {
          toast.success("Login successfull")
          setToken(responseData?.tokens?.access, responseData?.expires_in);
          router.push(ROUTE_PATH.DASHBOARD);
        }
      },
      onError: (error) => {
        toast.error(error?.response?.data?.message ?? "Something went wrong")

        // map backend errors to RHF
        error?.response?.data?.errors?.forEach((err) => {
          setError(err.field, {
            type: "server",
            message: err.message,
          })
        })
      }
    });
  };

  // Note: UI
  return (
    <div className="w-full max-w-117.5 sm:mx-auto md:max-w-117.5 flex flex-col gap-6 sm:gap-8">
      <AuthCommonTitle
        title="Welcome to Stemrn"
        description="Please enter your details to create your account"
      />

      {/* form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-col gap-3 sm:gap-4"
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
            href="/auth/forget-password"
            className="text-sm sm:text-base font-medium text-primary hover:text-primary/80 transition-colors hover:underline"
          >
            Forgot Password?
          </Link>
        </div>

        {/* remember me checkbox */}
        <div className="w-full flex items-center justify-between">
          <label className="flex items-center gap-2 cursor-pointer font-normal text-sm sm:text-base text-[#4c4b4b]">
            <input type="checkbox" className="accent-primary w-3.5 h-3.5 sm:w-4 sm:h-4" />
            Keep me signed in for 30 days
          </label>
        </div>

        {/* submit button */}
        <button
          type="submit"
          disabled={isPending}
          className={`cursor-pointer w-full bg-primary text-white py-3 sm:py-4 rounded-xl text-sm sm:text-base font-medium hover:bg-primary/80 transition-colors ${isPending ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          {isPending ? <LoadingIcon /> : "Log in"}
        </button>
      </form>

      {/* or sign up with google */}
      <Divider className="text-sm! sm:text-base! my-0!">or sign up with</Divider>

      <GoogleLogins />

    </div>
  )
};
export default SignInForm;