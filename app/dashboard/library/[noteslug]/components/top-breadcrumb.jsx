import { Bookmark, ChevronRight, Pill, Share2 } from "lucide-react";

const TopBreadcrumb = ({ note }) => {
    return (
        <div className="flex items-center justify-between border-b border-gray-300 pb-4">
            <div className="flex items-center gap-2 text-sm text-[#667085]">
                <Pill className="w-4 h-4 text-[#2C5F8D] shrink-0" />
                <span className="text-[#787878] hover:text-[#4d4d4d] cursor-pointer text-sm font-medium">{note?.folder || ""}</span>
                <ChevronRight className="w-4 h-4" />
                <span className="text-[#323232] font-medium text-base">{note?.title || ""}</span>
            </div>
            <div className="flex items-center gap-3">
                <button className="cursor-pointer flex items-center gap-2 px-3 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-[#153a50] transition-colors">
                    <Bookmark className="w-4 h-4 fill-current" />
                    Saved
                </button>
                <button className="flex items-center gap-2 px-3 py-2 border border-[#D0D5DD] text-primary rounded-lg text-sm font-medium hover:bg-primary hover:text-white transition-colors cursor-pointer">
                    <Share2 className="w-4 h-4" />
                    Share
                </button>
            </div>
        </div>
    );
};
export default TopBreadcrumb;