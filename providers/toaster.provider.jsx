"use client";

import { Toaster } from "react-hot-toast";

export function ToasterProvider() {
    return (
        <Toaster
            position="top-center"
            toastOptions={{
                // No icons for any toast
                icon: null,
                style: {
                    background: "#1a1a1a",
                    color: "#f5f5f7",
                    fontSize: "16px",
                    fontWeight: "600",
                    borderRadius: "8px",
                    padding: "6px 16px",
                    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.2)",
                    border: "3px solid #1D1D1D",
                },
                success: {
                    style: {
                        border: "2px solid #007AFF",
                    },
                },
                error: {
                    style: {
                        border: "1px solid #ef4444",
                    },
                },
                loading: {
                    style: {
                        border: "1px solid #007AFF",
                    },
                },
            }}
        />
    );
}