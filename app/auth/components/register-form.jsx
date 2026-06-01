"use client";

import { useForm } from "react-hook-form";
import { useMemo, useState } from "react";
import AuthCommonTitle from "./auth-common-title";
import CommonFieldsetInput from "@/components/common-fieldset-input";
import GoogleLogin from "./google-login";
import { FaCheck } from "react-icons/fa6";
import { Divider } from "antd";
import { useSignup } from "@/hooks";
import CommonModal from "@/components/common-modal";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { MdOutlineMarkEmailRead } from "react-icons/md";
import { IoAirplaneOutline, IoVolumeHighOutline } from "react-icons/io5";

const RegisterForm = () => {
  const router = useRouter();
  const [openModal, setOpenModal] = useState(false);
  const { signup, isPending } = useSignup();

  // Note: react hook form
  const {
    control,
    formState: { errors },
    handleSubmit,
    watch
  } = useForm({
    mode: "onChange",
  });

  const password = watch("password", "");

  // Password strength logic
  const getPasswordStrength = (password) => {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    return score;
  };

  const strength = useMemo(() => getPasswordStrength(password), [password]);
  const strengthLabel = ["Weak", "Weak", "Medium", "Good", "Strong"][strength];
  const strengthColor = ["#ff4d4f", "#ff4d4f", "#faad14", "#52c41a", "#16a34a"][strength];

  const handleSignUp = (data) => {
    console.log(data);

    // Mutation call
    signup(data, {
      onSuccess: () => {
        setOpenModal(true)
      },
      onError: (error) => {
        console.log(error)
        toast.error(error?.response?.data?.message ?? "Something went wrong")

        // 🔥 map backend errors to RHF
        error?.response?.data?.errors?.forEach((err) => {
          setError(err.field, {
            type: "server",
            message: err.message,
          })
        })
      }
    })
  };

  // functions
  const handleOk = () => {
    router.push("/auth")
  }
  const handleCancel = () => {
    setOpenModal(false)
  }

  // Note: UI
  return (
    <>
      <div className="w-full max-w-130 mx-auto flex flex-col gap-8 pt-10">
        <StepProgress />

        <AuthCommonTitle
          title="Create Your Account"
          description="Please enter your details to create your account!"
        />

        <form onSubmit={handleSubmit(handleSignUp)} className="w-full flex flex-col gap-5">
          {/* Only show Step 1 fields (Account) */}
          <div className="flex gap-4">
            <CommonFieldsetInput
              label="First Name"
              control={control}
              placeholder="First name"
              name="first_name"
              register_as="first_name"
              required
              errors={errors}
              validationRules={{ required: "First name is required" }}
            />
            <CommonFieldsetInput
              label="Last Name"
              control={control}
              placeholder="Last name"
              name="last_name"
              register_as="last_name"
              required
              errors={errors}
              validationRules={{ required: "Last name is required" }}
            />
          </div>

          <CommonFieldsetInput
            label="Email"
            control={control}
            placeholder="johndoe@mail.com"
            name="email"
            register_as="email"
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

          <CommonFieldsetInput
            label="Password"
            type="password"
            name="password"
            control={control}
            register_as="password"
            placeholder="minimum 8 character"
            required
            errors={errors}
            validationRules={{ required: "Password is required" }}
          />

          {password && (
            <div className="flex items-center gap-3 mt-1">
              <div className="flex gap-1 flex-1">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="h-1.5 flex-1 rounded-full"
                    style={{
                      backgroundColor: i <= strength ? strengthColor : "#e5e7eb",
                    }}
                  />
                ))}
              </div>
              <span className="text-sm font-medium" style={{ color: strengthColor }}>
                {strengthLabel}
              </span>
            </div>
          )}

          <CommonFieldsetInput
            label="Confirm Password"
            type="password"
            name="confirm_password"
            control={control}
            placeholder="Repeat password"
            register_as="confirm_password"
            required
            errors={errors}
            validationRules={{
              required: "Confirm password is required",
              // eslint-disable-next-line react-hooks/incompatible-library
              validate: (value) => value === watch("password") || "Passwords do not match",
            }}
          />

          {/* Continue Button */}
          <button
            type="submit"
            disabled={isPending}
            className={`cursor-pointer w-full bg-primary hover:bg-primary/80 text-white py-4 rounded-xl text-base font-medium transition mt-2 ${isPending ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {isPending ? "Please wait..." : "Continue"}
          </button>

          <Divider className="text-sm! sm:text-base! my-0!">or sign up with</Divider>
          <GoogleLogin />
        </form>
      </div>
      {/* success modal */}
      <CommonModal
        title={null}
        open={openModal}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Go to Login"
        centered
        cancelText="Close"
      >
        <div className="flex flex-col items-center text-center gap-4 py-2">
          {/* main icon */}
          <div className="bg-green-100 text-green-600 p-4 rounded-full">
            <IoVolumeHighOutline size={36} />
          </div>

          {/* main message */}
          <p className="text-lg font-medium text-gray-800">
            Verification link sent successfully!
          </p>

          {/* description */}
          <div className="flex flex-col gap-2 text-gray-600 text-sm">
            <div className="flex items-center justify-center gap-2">
              <MdOutlineMarkEmailRead className="text-green-500" />
              <span>Please check email to verify your account.</span>
            </div>

            <div className="flex items-center justify-center gap-2">
              <IoAirplaneOutline className="text-red-500" />
              <span>
                Didn’t receive it? Check your{" "}
                <span className="font-semibold text-red-500">Spam</span> folder.
              </span>
            </div>
          </div>
        </div>
      </CommonModal>
    </>
  );
};

export default RegisterForm;

// Step Progress Bar
const StepProgress = () => (
  <div className="flex items-center justify-center w-full px-4 bg-white shadow-md rounded-2xl py-5">
    <div className="flex items-center w-full max-w-md">
      {/* Step 1 - Account */}
      <div className="flex flex-col items-center text-center flex-1">
        <div className={`p-2 w-8 h-8 rounded-full border-8 border-primary flex items-center justify-center shadow-sm transition-all bg-white`}>
          <span className={`text-lg text-primary shrink-0`}>
            <FaCheck className="p-1" />
          </span>
        </div>
        <div className="mt-2 text-center">
          <h5 className={`text-[10px] font-medium text-gray-400`}>
            STEP 1
          </h5>
          <div className={`text-sm font-medium text-[#1E40AF]`}>
            Account
          </div>
        </div>
      </div>

      {/* Line 1 */}
      <div className={`flex-1 h-0.5 mx-2 -mt-6 transition-all bg-[#1E40AF]`} />

      {/* Step 2 - Profile */}
      <div className="flex flex-col items-center text-center flex-1">
        <div className={`w-8 h-8 rounded-full border-4 flex items-center justify-center transition-all border-gray-200 bg-white`}>
          <span className={`text-lg text-primary shrink-0`}>
            <FaCheck className="p-1" />
          </span>
        </div>
        <div className="mt-2 text-center">
          <div className={`text-[10px] font-medium text-gray-400`}>
            STEP 2
          </div>
          <div className={`text-sm font-medium text-gray-700`}>
            Profile
          </div>
        </div>
      </div>

      {/* Line 2 */}
      <div className={`flex-1 h-0.5 mx-2 -mt-6 transition-all bg-[#1E40AF]`} />

      {/* Step 3 - Terms */}
      <div className="flex flex-col items-center text-center flex-1">
        <div className={`w-8 h-8 rounded-full border-4 flex items-center justify-center transition-all
            border-gray-200 bg-white`}>
          <span className={`text-lg text-primary shrink-0`}>
            <FaCheck className="p-1" />
          </span>
        </div>
        <div className="mt-2 text-center">
          <div className={`text-[10px] font-medium text-gray-400`}>
            STEP 3
          </div>
          <div className={`text-sm font-medium text-gray-700`}>
            Terms
          </div>
        </div>
      </div>
    </div>
  </div>
);