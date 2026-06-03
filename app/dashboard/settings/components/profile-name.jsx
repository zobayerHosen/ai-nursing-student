"use client";
import CommonFieldsetInput from "@/components/common-fieldset-input";
import { useGetUser } from "@/hooks";
import { useUpdateInfo } from "@/hooks/user/update-info.hook";
import { useForm } from "react-hook-form";

const ProfileName = () => {
    const { user } = useGetUser();
    const { updateInfo, isPending: updateInfoPending } = useUpdateInfo();

    // Note: React Hook Form setup
    const {
        formState: { errors },
        control,
        handleSubmit,
    } = useForm({
        defaultValues: {
            first_name: user?.first_name ?? "Zobayer",
            last_name: user?.last_name ?? "Hosen",
            email: user?.email,
        }
    });

    const onSubmit = (data) => {
        console.log("General Save: ", data);
        showToast("Account details saved successfully!");
    };

    // Note: UI
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 animate-fadeIn">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <CommonFieldsetInput
                    label="First Name"
                    type="text"
                    control={control}
                    placeholder="e.g. Zobayer"
                    name="first_name"
                    register_as="first_name"
                    required
                    errors={errors}
                    validationRules={{ required: "First Name is required" }}
                />

                {/* Last Name Field */}
                <CommonFieldsetInput
                    label="Last Name"
                    type="text"
                    control={control}
                    placeholder="e.g. Hosen"
                    name="last_name"
                    register_as="last_name"
                    required={false}
                    errors={errors}
                />
            </div>
            {/* Email Field */}
            <CommonFieldsetInput
                label="Email"
                type="email"
                control={control}
                placeholder="e.g. johndoe@mail.com"
                name="email"
                disabled={true}
                register_as="email"
                required={false}
                errors={errors}
                innerWrapper="bg-gray-200!"
            />

            {/* Save Changes button on bottom right */}
            <div className="flex justify-end">
                <button
                    type="submit"
                    className="bg-[#2C5F8D] hover:bg-[#224b70] text-white px-6 py-2.5 rounded-lg text-sm font-semibold shadow-sm active:scale-95 transition-all cursor-pointer flex items-center gap-2"
                >
                    Save Changes
                </button>
            </div>
        </form>
    );
};

export default ProfileName;