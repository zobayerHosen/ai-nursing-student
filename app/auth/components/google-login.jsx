"use client"
import { FcGoogle } from "react-icons/fc";

const GoogleLogin = () => {
    return (
        <div className="w-full flex items-center justify-center px-4 sm:px-0">
            <button className="cursor-pointer w-full bg-white border border-gray-300 py-3 sm:py-4 rounded-xl text-sm sm:text-base font-medium hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-center gap-2">
                    <FcGoogle className="text-lg sm:text-xl shrink-0" />
                    <span>Sign up with Google</span>
                </div>
            </button>
        </div>
    )
};
export default GoogleLogin;