"use client";

import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { Dropdown } from "antd";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { useDeleteLibrary } from "@/hooks";
import DeleteModal from "./delete-modal";
import FolderCreateModal from "./folder-create-modal";

const FolderList = ({
  folder,
  isSelected = false,
  onSelect,
  onClose,
}) => {
  const queryClient = useQueryClient();
  const { deleteLibrary, isPending: isDeleting } = useDeleteLibrary();
  const [isRenameModalOpen, setIsRenameModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Rename folder handler
  const handleRenameFolder = (e) => {
    e?.stopPropagation?.();
    setIsDropdownOpen(false);
    setIsRenameModalOpen(true);
  };

  // Delete folder handler
  const handleDeleteFolder = (e) => {
    e?.stopPropagation?.();
    setIsDropdownOpen(false);
    setIsDeleteModalOpen(true);
  };

  // Confirm delete handler
  const confirmDelete = () => {
    deleteLibrary(folder?.id, {
      onSuccess: (data) => {
        toast.success(data?.message ?? "Folder deleted successfully!");
        queryClient.invalidateQueries({ queryKey: ["library-get"] });
        queryClient.invalidateQueries({
          queryKey: ["core-learning-content-details"],
        });
        setIsDeleteModalOpen(false);
      },
      onError: (error) => {
        toast.error(error?.response?.data?.message ?? "Something went wrong");
      },
    });
  };

  // Dropdown menu items
  const menuItems = [
    {
      key: "rename",
      label: (
        <div
          onClick={handleRenameFolder}
          className="flex items-center gap-2 px-2 py-1.5 text-xs font-medium text-gray-700 hover:text-gray-900"
        >
          <Pencil size={14} className="text-gray-400" />
          <span>Rename folder name</span>
        </div>
      ),
    },
    {
      key: "delete",
      label: (
        <div
          onClick={handleDeleteFolder}
          className="flex items-center gap-2 px-2 py-1.5 text-xs font-medium text-red-600 hover:text-red-700"
        >
          <Trash2 size={14} className="text-red-500" />
          <span>Delete</span>
        </div>
      ),
    },
  ];

  const folderColor = folder?.color || "#9ca3af";
  const notesCount =
    folder?.total_notes ??
    (Array.isArray(folder?.notes) ? folder.notes.length : 0);

  return (
    <>
      <div
        onClick={() => {
          onSelect?.(folder?.id);
          onClose?.();
        }}
        className={`group flex items-center justify-between px-3 py-2.5 rounded-xl cursor-pointer transition-all duration-150 ${
          isSelected
            ? "bg-[#E8F1F5] text-[#1B4B66] font-semibold shadow-xs"
            : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
        }`}
      >
        {/* Left: Colored Folder Icon + Name */}
        <div className="flex items-center gap-2.5 min-w-0 pr-2">
          <svg
            width="18"
            height="18"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="shrink-0 transition-transform group-hover:scale-105"
            style={{ color: folderColor }}
          >
            <path
              d="M2 4C2 3.44772 2.44772 3 3 3H7.58579C7.851 3 8.10536 3.10536 8.29289 3.29289L10 5H17C17.5523 5 18 5.44772 18 6V16C18 16.5523 17.5523 17 17 17H3C2.44772 17 2 16.5523 2 16V4Z"
              fill="currentColor"
            />
          </svg>
          <span
            className={`text-xs sm:text-sm truncate ${
              isSelected ? "font-semibold text-[#1B4B66]" : "font-medium text-gray-700"
            }`}
          >
            {folder?.name}
          </span>
        </div>

        {/* Right: Count Badge & 3-dots Dropdown */}
        <div className="flex items-center gap-1.5 shrink-0">
          <span
            className={`text-xs font-semibold px-1.5 py-0.5 rounded-md ${
              isSelected
                ? "text-[#1B4B66] font-bold"
                : "text-gray-500 group-hover:text-gray-700"
            }`}
          >
            {notesCount}
          </span>

          <Dropdown
            menu={{ items: menuItems }}
            trigger={["click"]}
            open={isDropdownOpen}
            onOpenChange={setIsDropdownOpen}
            placement="bottomRight"
            className="folder-actions-dropdown"
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
              }}
              className="p-1 rounded-md text-gray-400 hover:text-gray-700 hover:bg-black/5 transition-colors cursor-pointer"
              title="Folder options"
            >
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </Dropdown>
        </div>
      </div>

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