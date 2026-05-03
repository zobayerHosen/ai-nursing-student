import authPageImage from "@/public/assets/auth/auth.png"
import Image from "next/image";

export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      
      {/* LEFT SIDE */}
      <div className="w-full lg:w-1/2 flex flex-col bg-white overflow-y-auto px-4 sm:px-6 md:px-10 lg:px-4 xl:px-10 py-6 sm:py-8 lg:py-0">
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
        <div className="absolute text-white text-center px-5 w-full max-w-[484px] z-10 bottom-4 lg:bottom-8">
          <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-semibold mb-2 lg:mb-4">
            Welcome Back, Nurse Scholar
          </h2>
          <p className="text-sm sm:text-base lg:text-base opacity-90 px-2 lg:px-0">
            Your NCLEX prep continues where you left off. CARA is ready
            for your next session.
          </p>
        </div>
      </div>
    </div>
  );
}