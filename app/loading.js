export default function ScreenLoading() {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
            <div className="relative flex flex-col items-center justify-center gap-6">
                {/* Minimalist spinner */}
                <div className="relative h-16 w-16">
                    {/* Outer ring */}
                    <div className="absolute inset-0 rounded-full border-2 border-gray-200"></div>

                    {/* Animated arc */}
                    <div className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-black"></div>
                </div>

                {/* Descriptive text */}
                <div className="flex flex-col items-center gap-2 text-center">
                    <p className="text-xl font-light tracking-widest text-gray-700">
                        LOADING
                    </p>

                    <p className="max-w-sm text-lg font-light text-gray-500">
                        Please wait while we prepare everything for you.
                    </p>

                    <div className="flex gap-1">
                        <div
                            className="h-1 w-1 animate-pulse rounded-full bg-gray-400"
                            style={{ animationDelay: "0ms" }}
                        />
                        <div
                            className="h-1 w-1 animate-pulse rounded-full bg-gray-400"
                            style={{ animationDelay: "150ms" }}
                        />
                        <div
                            className="h-1 w-1 animate-pulse rounded-full bg-gray-400"
                            style={{ animationDelay: "300ms" }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
