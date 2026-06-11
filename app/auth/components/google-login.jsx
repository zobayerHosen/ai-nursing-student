"use client"
import { FcGoogle } from "react-icons/fc";
import { GoogleLogin } from "@react-oauth/google";
import { useSocialLogin } from "@/hooks";
import toast from "react-hot-toast";
import LoadingIcon from "@/components/loading-icon";
import { ROUTE_PATH } from "@/constants/route-naming";
import setToken from "@/utils/setToken";
import { useRouter } from "next/navigation";
import { Icon } from "lucide-react";

const GoogleLogins = () => {
    // hooks
    const { sociallogin, isPending } = useSocialLogin();
    const router = useRouter();

    const handleGoogleSuccess = async (credentialResponse) => {
        try {
            const idToken = credentialResponse?.credential;

            const response = await sociallogin({
                id_token: idToken,
            });

            const responseData = response?.data || response;

            console.log("Success token", responseData);

            setToken(
                responseData?.tokens?.access || responseData?.token,
                responseData?.expires_in,
            );

            toast.success(responseData?.message || "Login successful");

            if (responseData?.is_profile_complete === false) {
                router.push("/auth/profile-setup");
            } else {
                router.push(ROUTE_PATH.DASHBOARD);
            }
        } catch (error) {
            console.error("Google login failed:", error);

            toast.error(
                error?.response?.data?.message ||
                "Google login failed. Please try again."
            );
        }
    };

    return (
        <div className="w-full flex items-center justify-center px-4 sm:px-0">
            <div id="google-hidden-btn" className="hidden">
                <GoogleLogin
                    onSuccess={handleGoogleSuccess}
                    onError={() => {
                        console.error("Login Failed");
                        toast.error("Google login failed");
                    }}
                />
            </div>


            <button
                onClick={() => {
                    const btn = document.querySelector(
                        "#google-hidden-btn div[role=button]"
                    );
                    btn?.click();
                }}
                disabled={isPending}
                className="w-full h-14 rounded-2xl border border-gray-300 bg-white hover:bg-gray-50 transition-all duration-200 flex items-center justify-center gap-3 font-medium text-gray-800 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            >
                {isPending ? (
                    <>
                        <LoadingIcon />
                        <span>Signing in...</span>
                    </>
                ) : (
                    <>
                        <FcGoogle size={24} />
                        <span>Google</span>
                    </>
                )}
            </button>
        </div>
    );
};

export default GoogleLogins;