export const BillingPlanSkeleton = () => {
    return (
        <div className="border border-slate-200 rounded-3xl bg-white shadow-sm overflow-hidden animate-pulse">
            <div className="px-6 py-5 border-b border-slate-200">
                <div className="flex justify-between items-center">
                    <div className="flex gap-3 items-center">
                        <div className="w-10 h-10 rounded-xl bg-slate-200" />
                        <div>
                            <div className="h-4 w-32 bg-slate-200 rounded mb-2" />
                            <div className="h-3 w-24 bg-slate-200 rounded" />
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <div className="h-9 w-24 bg-slate-200 rounded-lg" />
                        <div className="h-9 w-24 bg-slate-200 rounded-lg" />
                    </div>
                </div>
            </div>

            <div className="p-6">
                <div className="h-10 w-36 bg-slate-200 rounded mb-4" />

                <div className="flex gap-2 mb-4">
                    <div className="h-6 w-20 bg-slate-200 rounded-full" />
                    <div className="h-6 w-20 bg-slate-200 rounded-full" />
                </div>

                <div className="h-4 w-48 bg-slate-200 rounded mb-6" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {[...Array(6)].map((_, idx) => (
                        <div key={idx} className="flex gap-3 items-center">
                            <div className="w-5 h-5 rounded-full bg-slate-200" />
                            <div className="h-4 flex-1 bg-slate-200 rounded" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};