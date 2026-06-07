"use client"
import { FaCheck } from "react-icons/fa";
import AuthCommonTitle from "./auth-common-title";
import { useForm } from "react-hook-form";
import CommonFieldsetInput from "@/components/common-fieldset-input";
import { useRouter } from "next/navigation";
import useNursingProgramOptions from "@/hooks/auth/options/nursing-program";
import useStateCountryOptions from "@/hooks/auth/options/state-country";
import useHearAboutOptions from "@/hooks/auth/options/hear-about-stemrn";

const howDidHereStemrnOptions = [
    { id: 1, label: "Google Search" },
    { id: 2, label: "Instagram" },
    { id: 3, label: "TikTok" },
    { id: 4, label: "YouTube" },
    { id: 5, label: "Facebook" },
    { id: 6, label: "X" },
    { id: 7, label: "Reddit (r/nursing)" },
    { id: 8, label: "Friend or Classmate" },
    { id: 9, label: "Professor / Instructor" },
    { id: 10, label: "Clinical Instructor" },
    { id: 11, label: "Nursing School Website" },
    { id: 12, label: "Podcast" },
    { id: 13, label: "LinkedIn" },
    { id: 14, label: "Other" }
]

const ProfileSetupForm = () => {
    const { nursingProgramData } = useNursingProgramOptions();
    const { stateCountryData } = useStateCountryOptions();
    const { hearAboutData } = useHearAboutOptions();

    // Note: Nursing convert id and name to options array
    const convertNursingData = nursingProgramData?.data?.map((list) => ({
        value: list?.id,
        label: list?.name
    }));

    // Note: State and councty data convert id and name to options array
    const convertStateCountryData = stateCountryData?.data?.map((list) => ({
        value: list?.id,
        label: list?.name
    }));

    // Note: Hear about data convert id and name to options array
    const convertHearAboutData = hearAboutData?.data?.map((list) => ({
        value: list?.id,
        label: list?.name
    }));

    const router = useRouter();
    const {
        formState: { errors },
        control,
        handleSubmit,
    } = useForm();

    // Note: Form submit data
    const onSubmit = (data) => {
        // Save form data to localstorage
        localStorage.setItem("profile-setup-data", JSON.stringify(data))

        router.push("/auth/review-and-finish");
    };

    // Note: UI
    return (
        <div className="w-full max-w-130 flex flex-col pt-10">
            <StepProgress />
            <AuthCommonTitle title={"Tell Us About You"} />
            <p className="text-[#525252] mb-8">Step 2 of 3 — Academic profile</p>

            <p className="text-[#525252] pb-2 border-b-2 border-[#e7e4e4]">Academic Information</p>


            <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full flex flex-col items-start gap-4 pt-6"
            >
                {/* Nursing Program - select */}
                <CommonFieldsetInput
                    label="Nursing Program"
                    type="select"
                    control={control}
                    placeholder="Select Program"
                    name="program"
                    register_as="program"
                    required
                    errors={errors}
                    validationRules={{
                        required: "Nursing Program is required"
                    }}
                    options={convertNursingData}
                />

                {/* school and university */}
                <CommonFieldsetInput
                    label="School / University"
                    type="text"
                    control={control}
                    placeholder="e.g. University of Texas at Austin"
                    name="university"
                    register_as="university"
                    required
                    errors={errors}
                    validationRules={{
                        required: "School / University is required"
                    }}
                />

                {/* state/country - select */}
                <CommonFieldsetInput
                    label="State / Country"
                    type="select"
                    control={control}
                    placeholder="Select State / Country"
                    name="country"
                    register_as="country"
                    required
                    errors={errors}
                    validationRules={{
                        required: "State / Country name is required"
                    }}
                    options={convertStateCountryData}
                />

                {/* How Did You Hear About STEMRN? */}
                <CommonFieldsetInput
                    label="How Did You Hear About STEMRN?"
                    type="select"
                    control={control}
                    placeholder="Select one"
                    name="about_us"
                    register_as="about_us"
                    required
                    errors={errors}
                    validationRules={{
                        required: "How Did You Hear About STEMRN? is required"
                    }}
                    options={convertHearAboutData}
                />

                {/* Continue Button */}
                <button
                    type="submit"
                    className="cursor-pointer w-full bg-primary hover:bg-primary/80 text-white py-4 rounded-xl text-base font-medium transition mt-2"
                >
                    Continue
                </button>

            </form>
        </div>
    );
};
export default ProfileSetupForm;

// Step Progress Bar
const StepProgress = () => {
    return (
        <div className="flex items-center justify-center w-full px-4 bg-white shadow-md rounded-2xl py-5 mb-8">
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
                    <div className={`p-2 w-8 h-8 rounded-full border-8 border-primary flex items-center justify-center shadow-sm transition-all bg-white`}>
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
};