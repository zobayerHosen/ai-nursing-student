"use client";
import Button from "@/components/common-button";
import CommonFieldsetInput from "@/components/common-fieldset-input";
import { useGetUser, useUpdateInfo } from "@/hooks";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const ProfileName = () => {
    const { user } = useGetUser();
    const { updateInfo, isPending: updateInfoPending } = useUpdateInfo();
    const queryClient = useQueryClient();

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
        updateInfo(data, {
            onSuccess: (response) => {
                toast.success(response?.message ?? "Profile Information Updated");
                queryClient.invalidateQueries({ queryKey: ["user"] });
            },
            onError: (error) => {
                toast.error(error?.response?.data?.message ?? "Something went wrong!");
            }
        });
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
                <Button
                    type="submit"
                    disabled={updateInfoPending}
                    loading={updateInfoPending}
                    className="px-6 py-2.5 text-sm"
                >
                    Save Changes
                </Button>
            </div>
        </form>
    );
};
export default ProfileName;