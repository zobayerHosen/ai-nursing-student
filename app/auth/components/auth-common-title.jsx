"use client";

const AuthCommonTitle = ({ title, description }) => {
    return (
        <div>
            <h2 className="text-[32px] font-semibold">
                {title}
            </h2>
            <p className="text-base opacity-90">
                {description}
            </p>
        </div>
    )
};

export default AuthCommonTitle;