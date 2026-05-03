"use client";

import { useForm } from "react-hook-form";
import AuthCommonTitle from "./auth-common-title";
import CommonFieldsetInput from "@/components/common-fieldset-input";

const ForgetPasswordForm = () => {
    // Note: react hook form
    const {
        control,
        formState: { errors },
        handleSubmit,
        watch
    } = useForm({
        mode: "onChange",
    });


    const onSubmit = (data) => {
        console.log(data);
    };
    return (
        <div className="w-full max-w-130 mx-auto flex flex-col gap-8 pt-10">
            <AuthCommonTitle
                title="Reset Password"
                description="Enter your email and we'll send a reset link."
            />

            <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-5">
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
                <button
                    // onClick={() => router.push("/auth/profile-setup")}
                    type="submit"
                    className="cursor-pointer w-full bg-primary hover:bg-primary/80 text-white py-4 rounded-xl text-base font-medium transition mt-2"
                >
                    Continue
                </button>
            </form>
        </div>
    );
};

export default ForgetPasswordForm;