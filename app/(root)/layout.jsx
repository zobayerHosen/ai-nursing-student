import Footer from "./components/footer";
import GoogleOneTap from "./components/google-one-tap";

export default function RootLayout({ children }) {
    return (
        <>
            {/* header */}
            <GoogleOneTap />
            {/* children */}
            {children}

            <Footer />
        </>
    );
};