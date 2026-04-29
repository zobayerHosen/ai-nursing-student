"use client";

const AuthCommonTitle = ({ title = "", description = "" }) => {
    return (
        <div className="text-center sm:text-left">
            <h2 className="text-2xl sm:text-[32px] font-bold text-[#12283B]">
                {title}
            </h2>
            <p className="text-sm sm:text-base opacity-90">
                {description}
            </p>
        </div>
    )
};

export default AuthCommonTitle;