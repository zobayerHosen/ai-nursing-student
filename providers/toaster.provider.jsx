"use client";

import { Toaster } from "react-hot-toast";

export function ToasterProvider() {
    return (
        <Toaster
            position="top-center"
            toastOptions={{
                duration: 4000, // <-- increase time to 8 seconds
                style: {
                    background: "#0f172a",
                    color: "#f8fafc",
                    fontSize: "18px",
                },
                success: {
                    iconTheme: {
                        primary: "#22c55e",
                        secondary: "#0f172a",
                    },
                },
                error: {
                    iconTheme: {
                        primary: "#ef4444",
                        secondary: "#0f172a",
                    },
                },
                loading: {
                    iconTheme: {
                        primary: "#3b82f6",
                        secondary: "#0f172a",
                    },
                },
            }}
        />
    );
}