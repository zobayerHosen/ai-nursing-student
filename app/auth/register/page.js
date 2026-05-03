import AuthFooter from "../components/auth-footer";
import AuthHeader from "../components/auth-header";
import RegisterForm from "../components/register-form";

export default function RegisterPage() {
  return (
    <>
      <AuthHeader type={"/auth/register"} />
      <div className="flex-1 flex items-center justify-center">
        <RegisterForm />
      </div>
      <AuthFooter />
    </>
  );
};