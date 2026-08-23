"use client";

import { useGoogleOneTapLogin } from "@react-oauth/google";
import { useSocialLogin } from "@/hooks";
import toast from "react-hot-toast";
import setToken from "@/utils/setToken";
import { useRouter } from "next/navigation";
import { ROUTE_PATH } from "@/constants/route-naming";
import { getClientToken } from "@/utils/getClientToken";
import { useEffect, useState } from "react";

const GoogleOneTap = () => {
    const { sociallogin } = useSocialLogin();
    const router = useRouter();

    // Default to true (disabled) so Google One Tap is not triggered on initial render before auth is verified
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        if (typeof window !== "undefined") {
            return !!getClientToken();
        }
        return true;
    });

    useEffect(() => {
        const token = getClientToken();
        setIsAuthenticated(!!token);
    }, []);

    useGoogleOneTapLogin({
        onSuccess: (credentialResponse) => {
            console.log("One tap login:--->", credentialResponse);
            sociallogin(
                {
                    id_token: credentialResponse.credential,
                },
                {
                    onSuccess: (data) => {
                        const responseData = data?.data || data;
                        setToken(
                            responseData?.tokens?.access || responseData?.token,
                            responseData?.expires_in
                        );
                        toast.success(responseData?.message || "Login successful");

                        if (responseData?.is_profile_complete === false) {
                            router.push(ROUTE_PATH.PROFILE_SETUP);
                        } else {
                            router.push(ROUTE_PATH.DASHBOARD);
                        }
                    },
                    onError: (error) => {
                        toast.error(error?.response?.data?.message);
                    },
                }
            );
        },
        onError: (error) => {
            console.log("One Tap Login Failed", error);
        },
        disabled: Boolean(isAuthenticated),
    });

    return null;
};
export default GoogleOneTap;