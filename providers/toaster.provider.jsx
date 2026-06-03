"use client";

import { CircleAlert, CircleX } from "lucide-react";
import { GiCheckMark } from "react-icons/gi";

import { Toaster } from "react-hot-toast";

export function ToasterProvider() {
    return (
        <Toaster
            position="top-center"
            toastOptions={{
                // No icons for any toast
                icon: null,
                style: {
                    background: "#2c5f8d",
                    color: "#fff",
                    fontSize: "16px",
                    fontWeight: "600",
                    borderRadius: "8px",
                    padding: "6px 16px",
                    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.2)",
                    border: "2px solid #1D1D1D",
                },
                success: {
                    icon: <GiCheckMark size={20} className="text-green-400"/>,
                    style: {
                        border: "2px solid #007AFF",
                    },
                },
                error: {
                    icon: <CircleX size={16} className="text-red-400"/>,
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