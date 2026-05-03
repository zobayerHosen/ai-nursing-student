import AuthFooter from "./components/auth-footer";
import AuthHeader from "./components/auth-header";
import SignInForm from "./components/sign-in-form";


export default function LoginPage() {
  return (
    <>
      <AuthHeader type={"/auth"}/>
      <div className="flex-1 flex items-center justify-center">
        <SignInForm />
      </div>
      <AuthFooter />
    </>
  );
}