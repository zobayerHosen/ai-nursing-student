export default function DashbaordLayout({ children }) {
    return (
        <>
            <div className="px-4 sm:px-6 md:px-8 lg:px-9 dashboard_gradient min-h-screen">
                {/* <DashboardHeader /> */}
                <div className="w-full py-6 sm:py-8 md:py-10">{children}</div>
                {/* <CommonFooter /> */}
            </div>
        </>
    )
}
