import React from "react";
import LoadingIcon from "./loading-icon";

export default function Button({
    children,
    onClick,
    type = "button",
    disabled = false,
    loading = false,
    icon,
    className = "",
}) {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled || loading}
            className={`bg-[#2C5F8D] hover:bg-[#224b70] text-white rounded-lg font-semibold shadow-sm active:scale-95 transition-all flex items-center gap-2  disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer ${className}`}
        >
            {loading ? (
                <LoadingIcon />
            ) : (
                <>
                    {icon}
                    {children}
                </>
            )}
        </button>
    );
};