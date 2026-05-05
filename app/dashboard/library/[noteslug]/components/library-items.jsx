import { CircleCheck } from "lucide-react";

const LibraryItems = ({ title, desc }) => {
    return (
        <div className="flex items-start gap-2">
            <CircleCheck className="w-4.5 h-4.5 text-[#1B4B66] shrink-0 mt-1" />
            <p className="text-[#555555] text-base leading-snug font-normal">
                <span className="font-medium text-[#2C5F8D]">{title}:</span> {desc}
            </p>
        </div>
    );
};
export default LibraryItems;