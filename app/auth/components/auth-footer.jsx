import Link from "next/link";

const AuthFooter = () => {
    return (
        <div className="w-full flex items-center justify-between pb-8">
            <p className="text-base text-[#525252] mt-10 flex-1">
                © 2026 stemrn
            </p>
            <p className="text-base text-[#525252] mt-10 flex-1">
                By logging in you agree to our <Link href="/terms-and-conditions" className="font-semibold text-[#2C5F8D] hover:underline">Terms</Link> and <Link href="/privacy-policy" className="font-semibold text-[#2C5F8D] hover:underline">Privacy Policy</Link>.
                STEMRN is for educational purposes only.
            </p>
        </div>
    )
};
export default AuthFooter;