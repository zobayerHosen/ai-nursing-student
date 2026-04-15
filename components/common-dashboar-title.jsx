import { cn } from '@/utils';

const CommonDashboardTitle = ({ title = "", className }) => {
    return (
        <h4 className={cn("text-2xl font-semibold text-[#12283B]", className)}>
            {title}
        </h4>
    );
};
export default CommonDashboardTitle;