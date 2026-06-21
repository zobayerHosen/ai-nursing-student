"use client";


import { Modal } from "antd";
import { useState, useEffect } from "react";

import img01 from "@/public/assets/library/default_folder.svg";
import img02 from "@/public/assets/library/clinic.svg";
import img03 from "@/public/assets/library/heart.svg";
import img04 from "@/public/assets/library/home.svg";
import img05 from "@/public/assets/library/capsoul.svg";
import Image from "next/image";
import { useCreateLibrary, useRenameLibrary } from "@/hooks";
import toast from "react-hot-toast";
import LoadingIcon from "@/components/loading-icon";
import { useQueryClient } from "@tanstack/react-query";

const icons = [
    { id: "default_folder", icon: img01 },
    { id: "clinic", icon: img02 },
    { id: "heart", icon: img03 },
    { id: "home", icon: img04 },
    { id: "capsoul", icon: img05 },
];

const colors = [
    "#3B82F6",
    "#F43F5E",
    "#16A34A",
    "#B45309",
    "#7C3AED",
    "#0891B2",
    "#DC2626",
    "#9CA3AF",
];

const FolderCreateModal = ({ isModalOpen, setIsModalOpen, folderData }) => {
    const queryClient = useQueryClient();
    const { createLibrary, isPending: isCreatePending } = useCreateLibrary();
    const { renameLibrary, isPending: isRenamePending } = useRenameLibrary();
    const isPending = isCreatePending || isRenamePending;
    const [folderName, setFolderName] = useState("");
    const [selectedIcon, setSelectedIcon] = useState("default_folder");
    const [selectedColor, setSelectedColor] = useState(colors[0]);

    // Note: populate form fields when editing an existing folder
    useEffect(() => {
        if (folderData) {
            setFolderName(folderData.name || "");
            setSelectedIcon(folderData.icon_id || "default_folder");
            setSelectedColor(folderData.color || colors[0]);
        } else {
            setFolderName("");
            setSelectedIcon("default_folder");
            setSelectedColor(colors[0]);
        }
    }, [folderData, isModalOpen]);

    // Note: create or rename folder via API
    const handleSave = () => {

        const payload = {
            name: folderName,
            icon: selectedIcon,
            color: selectedColor
        };

        if (folderData) {
            // Note: rename existing folder
            renameLibrary({ id: folderData.id, payload }, {

                onSuccess: (data) => {
                    toast.success(data?.message ?? "Folder renamed successfully!");
                    queryClient.invalidateQueries({ queryKey: ["library-get"] })
                    // Note: reset all data
                    setFolderName("");
                    setSelectedIcon("default_folder");
                    setSelectedColor(colors[0]);
                    setIsModalOpen(false);
                },

                onError: (error) => {
                    toast.error(error?.response?.data?.message ?? "Something went wrong");
                }
            });
        } else {
            // Note: create new folder
            createLibrary(payload, {

                onSuccess: (data) => {
                    toast.success(data?.message ?? "Folder created successfully!");
                    // Note: reset all data
                    setFolderName("");
                    setSelectedIcon("default_folder");
                    setSelectedColor(colors[0]);
                    setIsModalOpen(false);
                },

                onError: (error) => {
                    toast.error(error?.response?.data?.message ?? "Something went wrong");
                }
            });
        }
    };

    return (
        <Modal
            centered
            open={isModalOpen}
            onCancel={() => setIsModalOpen(false)}
            footer={null}
            styles={{
                content: {
                    borderRadius: "16px",
                    padding: "24px",
                },
            }}
            className="w-full! max-w-107.5! px-0!"
        >
            <div className="">
                {/* Title */}
                <h2 className="text-xl font-semibold text-[#12283B]">
                    {folderData ? "Rename Folder" : "Create Folder"}
                </h2>

                <hr className="my-4 text-gray-200" />

                {/* Folder Name */}
                <div className="mb-4">
                    <p className="mb-1 text-base text-gray-800! font-semibold">
                        Folder Name
                    </p>
                    <input
                        type="text"
                        value={folderName}
                        onChange={(e) => setFolderName(e.target.value)}
                        className="w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-primary text-base font-medium"
                        placeholder="e.g. Fundamentals, OB Notes…"
                    />
                </div>

                {/* Icon */}
                <div className="mb-4">
                    <p className="mb-2 text-sm text-[#424242] font-semibold!">Icon</p>
                    <div className="flex gap-2">
                        {icons.map((item) => {
                            const Icon = item.icon;
                            const isActive = selectedIcon === item.id;

                            return (
                                <button
                                    key={item.id}
                                    onClick={() => setSelectedIcon(item.id)}
                                    className={`cursor-pointer flex h-10 w-10 items-center justify-center rounded-md border 
                                        ${isActive
                                            ? "border-blue-500 bg-blue-50"
                                            : "border-gray-300"
                                        }`}
                                >
                                    <Image
                                        src={Icon}
                                        alt={item.id}
                                        width={24}
                                        height={24}
                                    />
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Color */}
                <div className="mb-6">
                    <p className="mb-2 text-sm text-[#424242] font-semibold!">Color</p>
                    <div className="flex gap-2">
                        {colors.map((color) => (
                            <div
                                key={color}
                                onClick={() => setSelectedColor(color)}
                                className={`h-6 w-6 cursor-pointer rounded-full border-2 ${selectedColor === color
                                    ? "border-gray-300"
                                    : "border-transparent"
                                    }`}
                                style={{ backgroundColor: color }}
                            />
                        ))}
                    </div>
                </div>

                {/* Footer */}
                <div className="flex justify-end gap-2">
                    <button
                        onClick={() => setIsModalOpen(false)}
                        className="border border-primary text-primary cursor-pointer rounded-md px-4 py-1.5 text-base font-semibold hover:bg-gray-50 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={isPending}
                        className="cursor-pointer font-semibold rounded-md bg-primary px-4 py-1.5 text-base text-white/95 hover:bg-primary/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                        {isPending && <LoadingIcon className="text-white" />}
                        {folderData ? "Update Folder" : "Create Folder"}
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default FolderCreateModal;
