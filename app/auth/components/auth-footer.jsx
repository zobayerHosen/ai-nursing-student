import Link from "next/link";

const AuthFooter = () => {
    return (
        <div className="w-full flex flex-col sm:flex-row items-center justify-between sm:gap-0 sm:pb-8 px-4 sm:px-0 pt-8 sm:pt-11">
            <p className="text-sm sm:text-base text-[#525252] flex-1 text-center sm:text-left pb-4 sm:pb-0">
                © 2026 stemrn
            </p>
            <p className="text-sm sm:text-base text-[#525252] flex-1 text-center sm:text-left">
                By logging in you agree to our <Link href="/terms-and-conditions" className="font-semibold text-[#2C5F8D] hover:underline">Terms</Link> and <Link href="/privacy-policy" className="font-semibold text-[#2C5F8D] hover:underline">Privacy Policy</Link>.
                STEMRN is for educational purposes only.
            </p>
        </div>
    )
};
export default AuthFooter;