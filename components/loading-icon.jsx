import { cn } from "@/utils";
import { BiLoaderCircle } from "react-icons/bi";

const LoadingIcon = ({ className }) => {
    return (
        <div className={cn("animate-spin flex items-center justify-center", className)}>
            <BiLoaderCircle className="text-xl "/>
        </div>
    );
};

export default LoadingIcon;