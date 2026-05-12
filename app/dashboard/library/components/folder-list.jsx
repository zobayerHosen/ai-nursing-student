"use client";
import { ChevronDown, ClipboardList, Info, MoreHorizontal } from "lucide-react";
import Link from "next/link";

const FolderList = ({ folder, toggleFolder }) => {

    return (
        <>
            <div
                className="flex items-center justify-between py-3 px-2 rounded-xl hover:bg-gray-100 cursor-pointer transition"
            >
                {/* LEFT SIDE */}
                <div onClick={() => toggleFolder(folder?.id)} className="flex items-center gap-3">

                    {/* Arrow Icon */}
                    <ChevronDown className={`w-4.5 h-4.5 text-gray-500 transition-transform ${folder?.isOpen ? "rotate-180" : ""}`} />

                    {/* Icon */}
                    <span className="text-lg">{folder?.icon}</span>

                    {/* Text */}
                    <div>
                        <p className="text-sm font-semibold text-[#424242]">
                            {folder?.name}
                        </p>
                        <p className="text-xs text-gray-500">
                            {folder?.notes?.length} notes
                        </p>
                    </div>
                </div>

                {/* RIGHT SIDE */}
                <button
                    // onClick={""}
                    className="cursror-pointer p-1 rounded-md hover:bg-gray-200"
                >
                    <MoreHorizontal className="w-5 h-5 text-gray-500 shrink-0" />
                </button>
            </div>

            {/* Notes List */}
            {
                folder?.isOpen && (
                    <div className="ml-7 mt-2 space-y-2">
                        {
                            folder?.notes?.length === 0 ? (
                                <p className="text-sm text-[#666565] py-2 flex items-center gap-1.5">
                                    <span>
                                        <Info className="w-4.5 h-4.5 text-red-400 shrink-0" />
                                    </span>
                                    No notes in this folder yet
                                </p>
                            ) : (
                                folder?.notes?.map((note) => (
                                    <Link
                                        href={`/dashboard/library/${note?.slug}`}
                                        key={note?.id}
                                        className="flex gap-1 items-center p-2 rounded-lg hover:bg-gray-100 cursor-pointer"
                                    >
                                        <ClipboardList className="w-4 h-4 text-gray-500 shrink-0" />
                                        <div className="min-w-0">
                                            <p className="flex items-center gap-1 text-sm font-medium text-[#333]">
                                                {note?.title ?? ""}
                                            </p>
                                            <p className="text-xs text-gray-500 truncate" title="See All Notes">
                                                {note?.desc ?? ""}
                                            </p>
                                        </div>
                                    </Link>
                                ))
                            )
                        }
                    </div>
                )
            }
        </>
    );
};

export default FolderList;