
import { ChevronDown, ClipboardList, Info, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Dropdown } from "antd";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { useDeleteLibrary } from "@/hooks";
import DeleteModal from "./delete-modal";
import FolderCreateModal from "./folder-create-modal";
import Image from "next/image";

const BASEURL = process.env.NEXT_PUBLIC_BASE_URL;

const FolderList = ({ folder, toggleFolder, onClose }) => {
    const queryClient = useQueryClient();
    const { deleteLibrary, isPending: isDeleting } = useDeleteLibrary();
    const [isRenameModalOpen, setIsRenameModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    // Note: rename folder handler
    const handleRenameFolder = () => {
        setIsRenameModalOpen(true);
    }

    // Note: delete folder handler
    const handleDeleteFolder = () => {
        setIsDeleteModalOpen(true);
    }

    // Note: confirm delete handler
    const confirmDelete = () => {
        deleteLibrary(folder?.id, {
            onSuccess: (data) => {
                toast.success(data?.message ?? "Folder deleted successfully!");
                queryClient.invalidateQueries({ queryKey: ["library-get"] });
                queryClient.invalidateQueries({ queryKey: ["library-topic-details", folder?.id] });
                setIsDeleteModalOpen(false);
            },
            onError: (error) => {
                toast.error(error?.response?.data?.message ?? "Something went wrong");
            }
        });
    }

    // Note: Dropdown menu items
    const menuItems = [
        {
            key: 'rename',
            label: (
                <div onClick={handleRenameFolder} className="flex items-center gap-2 px-1 py-1 text-sm font-medium text-gray-700">
                    <Pencil size={16} className="text-gray-400" />
                    <span>Rename folder name</span>
                </div>
            ),
        },
        {
            key: 'delete',
            label: (
                <div onClick={handleDeleteFolder} className="flex items-center gap-2 px-1 py-1 text-sm font-medium text-red-600">
                    <Trash2 size={16} className="text-red-400" />
                    <span>Delete</span>
                </div>
            ),
        },
    ];

    // Note: Main folder UI
    return (
        <>
            <div
                className="flex items-center justify-between py-3 px-2 rounded-xl hover:bg-gray-100 cursor-pointer transition"
            >
                {/* LEFT SIDE */}
                <div onClick={() => toggleFolder(folder?.id)} className="flex items-start gap-3">

                    {/* Arrow Icon */}
                    <ChevronDown className={`w-4.5 h-4.5 text-gray-500 transition-transform ${folder?.isOpen ? "rotate-180" : ""}`} />

                    {/* Icon */}
                    <Image
                        src={`${BASEURL}/${folder?.icon?.icon}`}
                        alt="icon"
                        width={20}
                        height={20}
                        className="shrink-0"
                    />

                    {/* Text */}
                    <div>
                        <p className="text-sm font-semibold text-[#424242]">
                            {folder?.name}
                        </p>
                        <p className="text-xs text-gray-500">
                            {folder?.total_notes} notes
                        </p>
                        {/* Note preview when collapsed */}
                        {!folder?.isOpen && Array.isArray(folder?.notes) && folder?.notes?.length > 0 && (
                            <p className="text-xs text-gray-400 mt-0.5 italic truncate max-w-45">
                                {folder?.notes?.slice(0, 2)?.map(n => n?.content_name)?.join(", ")}
                                {folder?.notes?.length > 2 && ` +${folder?.notes?.length - 2} more`}
                            </p>
                        )}
                    </div>
                </div>

                {/* RIGHT SIDE */}
                <Dropdown
                    menu={{ items: menuItems }}
                    trigger={['click']}
                    placement="bottomRight"
                    className="folder-actions-dropdown"
                >
                    <button
                        onClick={(e) => e.stopPropagation()}
                        className="cursor-pointer p-1 rounded-md hover:bg-gray-200 transition-colors"
                    >
                        <MoreHorizontal className="w-5 h-5 text-gray-500 shrink-0" />
                    </button>
                </Dropdown>
            </div>

            {/* Notes List */}
            {
                folder?.isOpen && (
                    <div className="ml-7 mt-2 space-y-2">
                        {
                            !Array.isArray(folder?.notes) || folder?.notes?.length === 0 ? (
                                <p className="text-sm text-[#666565] py-2 flex items-center gap-1.5">
                                    <span>
                                        <Info className="w-4.5 h-4.5 text-red-400 shrink-0" />
                                    </span>
                                    No notes in this folder yet
                                </p>
                            ) : (
                                folder?.notes?.map((note) => (
                                    <Link
                                        href={`/dashboard/library/${note?.content_id}`}
                                        key={note?.content_id}
                                        onClick={() => onClose?.()}
                                        className="flex gap-1 items-center p-2 rounded-lg hover:bg-gray-100 cursor-pointer"
                                    >
                                        <ClipboardList className="w-4 h-4 text-gray-500 shrink-0" />
                                        <div className="min-w-0">
                                            <p className="flex items-center gap-1 text-sm font-medium text-[#333]">
                                                {note?.content_name ?? note?.title ?? ""}
                                            </p>
                                        </div>
                                    </Link>
                                ))
                            )
                        }
                    </div>
                )
            }

            {/* Rename Modal */}
            <FolderCreateModal
                isModalOpen={isRenameModalOpen}
                setIsModalOpen={setIsRenameModalOpen}
                folderData={folder}
            />

            {/* Delete Modal */}
            <DeleteModal
                isModalOpen={isDeleteModalOpen}
                setIsModalOpen={setIsDeleteModalOpen}
                onDelete={confirmDelete}
                loading={isDeleting}
                title="Delete Folder"
                description={`Are you sure you want to delete the "${folder?.name}" folder? All notes within this folder will be permanently removed.`}
            />
        </>
    );
};
export default FolderList;