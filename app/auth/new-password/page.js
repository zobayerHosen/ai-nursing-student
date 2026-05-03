import AuthFooter from "../components/auth-footer";
import AuthHeader from "../components/auth-header";
import SetNewPasswordForm from "../components/set-new-password-form";

export default function NewPasswordPage() {
  return (
    <>
      <AuthHeader type={"/auth/new-password"} />
      <div className="flex-1 flex items-center justify-center">
        <SetNewPasswordForm />
      </div>
      <AuthFooter />
    </>
  )
}
