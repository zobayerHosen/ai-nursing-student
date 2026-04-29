import Footer from "./components/footer";

export default function RootLayout({ children }) {
    return (
        <>
            {/* header */}

            {/* children */}
            {children}

            <Footer />
        </>
    );
};