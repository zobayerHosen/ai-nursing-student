import authPageImage from "@/public/assets/auth/auth.png"
import Image from "next/image";

export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen flex">
      
      {/* LEFT SIDE */}
      <div className="w-full lg:w-1/2 flex flex-col bg-white overflow-y-auto px-10">
        {children}
      </div>

      {/* RIGHT SIDE */}
      <div className="hidden lg:flex w-1/2 items-center justify-center overflow-hidden h-screen sticky top-0">
        
        {/* Background Image */}
        <Image
          src={authPageImage}
          alt="Auth Background"
          fill
          priority
          className="object-cover w-full h-full"
        />

        {/* Content */}
        <div className="absolute text-white text-center px-5 w-full max-w-[484px] z-10 bottom-4">
          <h2 className="text-[40px] font-semibold mb-4">
            Welcome Back, Nurse Scholar
          </h2>
          <p className="text-base opacity-90">
           Your NCLEX prep continues where you left off. CARA is ready
            for your next session.
          </p>
        </div>
      </div>
    </div>
  );
}