import React from "react";

export default function Loading() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
                <div
                    key={index}
                    className="relative bg-white border border-gray-100 rounded-2xl p-4 shadow-sm overflow-hidden animate-pulse"
                >
                    {/* Background Circle */}
                    <div className="absolute -right-6 -top-6 w-14 h-14 bg-gray-100 rounded-full"></div>

                    <div className="relative z-10 space-y-4">
                        {/* Header */}
                        <div className="flex items-center gap-3">
                            <div className="h-6 w-6 rounded-md bg-gray-200"></div>

                            <div className="h-4 w-40 bg-gray-200 rounded-md"></div>
                        </div>

                        {/* Description Line */}
                        <div className="space-y-2">
                            <div className="h-3 w-full bg-gray-100 rounded"></div>
                            <div className="h-3 w-3/4 bg-gray-100 rounded"></div>
                        </div>

                        {/* Footer */}
                        <div className="flex items-center justify-between pt-2">
                            <div className="h-8 w-20 bg-gray-100 rounded-md"></div>

                            <div className="h-4 w-16 bg-gray-200 rounded"></div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}