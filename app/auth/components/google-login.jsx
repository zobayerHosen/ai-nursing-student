"use client"
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import { useSocialLogin } from "@/hooks";
import toast from "react-hot-toast";
import LoadingIcon from "@/components/loading-icon";
import { ROUTE_PATH } from "@/constants/route-naming";
import setToken from "@/utils/setToken";
import { useRouter } from "next/navigation";

const GoogleLogin = () => {
    // hooks
    const { sociallogin, isPending } = useSocialLogin();
    const router = useRouter();

    // google login
    const login = useGoogleLogin({
        onSuccess: (tokenResponse) => {
            console.log("Token response", tokenResponse)

            // send to backend
            sociallogin({
                id_token: tokenResponse.access_token,
            }, {
                onSuccess: (data) => {
                    const responseData = data?.data || data;
                    console.log("Success token", responseData)

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
                },
                onError: (error) => {
                    toast.error(error?.response?.data?.message);
                },
            },
            );
        },
        onError: (error) => {
            console.log("Google Login Failed", error);
        },
    });

    return (
        <div className="w-full flex items-center justify-center px-4 sm:px-0">
            <button
                onClick={() => login()}
                disabled={isPending}
                className="cursor-pointer w-full bg-white border border-gray-300 py-3 sm:py-4 rounded-xl text-sm sm:text-base font-medium hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
                <div className="flex items-center justify-center gap-2">
                    {isPending ? (
                        <LoadingIcon />
                    ) : (
                        <FcGoogle className="text-lg sm:text-xl shrink-0" />
                    )}
                    <span>{isPending ? "Signing in..." : "Sign up with Google"}</span>
                </div>
            </button>
        </div>
    );
};

export default GoogleLogin;