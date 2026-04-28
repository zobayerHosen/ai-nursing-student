"use client";

const AuthCommonTitle = ({ title = "", description = "" }) => {
    return (
        <div>
            <h2 className="text-[32px] font-bold text-[#12283B]">
                {title}
            </h2>
            <p className="text-base opacity-90">
                {description}
            </p>
        </div>
    )
};

export default AuthCommonTitle;