import AuthFooter from "../components/auth-footer";
import AuthHeader from "../components/auth-header";
import ResetPasswordForm from "../components/forget-password-form";

export default function ForgetPasswordPage() {
    return (
        <>
            <AuthHeader type={""} />
            <div className="flex-1 flex items-center justify-center">
                <ResetPasswordForm />
            </div>
            <AuthFooter />
        </>
    );
};