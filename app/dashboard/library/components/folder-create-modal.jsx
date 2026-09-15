"use client";

import { Modal } from "antd";
import { useState, useEffect, useMemo } from "react";
import { useCreateLibrary, useRenameLibrary, useGetFolderColor } from "@/hooks";
import toast from "react-hot-toast";
import LoadingIcon from "@/components/loading-icon";
import { useQueryClient } from "@tanstack/react-query";

const FolderCreateModal = ({ isModalOpen, setIsModalOpen, folderData }) => {
    const queryClient = useQueryClient();
    
    const { createLibrary, isPending: isCreatePending } = useCreateLibrary();
    const { renameLibrary, isPending: isRenamePending } = useRenameLibrary();
    const { folderColorData, isLoading: isColorLoading } = useGetFolderColor();

    const isPending = isCreatePending || isRenamePending;   
    const [folderName, setFolderName] = useState("");
    const [selectedColor, setSelectedColor] = useState(null);

    // Note: populate form fields when editing an existing folder or creating a new one
    useEffect(() => {
        if (folderData) {
            setFolderName(folderData.name || "");
            const existingColorId =
                folderData?.color?.id ??
                (typeof folderData?.color === "number" ? folderData.color : null) ??
                folderData?.color_id ??
                folderData?.icon?.id ??
                null;
            setSelectedColor(existingColorId);
        } else {
            setFolderName("");
            if (folderColorData?.length > 0) {
                setSelectedColor(folderColorData[0]?.id);
            } else {
                setSelectedColor(null);
            }
        }
    }, [folderData, isModalOpen, folderColorData]);

    // Compute hex color for preview
    const selectedColorHex = useMemo(() => {
        const found = folderColorData?.find((item) => item?.id === selectedColor);
        if (found?.color) return found.color;
        if (folderData?.color) {
            return typeof folderData.color === "object" ? folderData.color?.color : folderData.color;
        }
        return "#9ca3af";
    }, [folderColorData, selectedColor, folderData]);

    // Note: create or rename folder via API
    const handleSave = () => {
        if (!folderName.trim()) {
            toast.error("Please enter a folder name");
            return;
        }

        if (selectedColor === null || selectedColor === undefined) {
            toast.error("Please select a color");
            return;
        }

        const payload = {
            name: folderName.trim(),
            color: selectedColor,
        };

        if (folderData) {
            // Note: rename existing folder
            renameLibrary({ id: folderData.id, payload }, {
                onSuccess: (data) => {
                    toast.success(data?.message ?? "Folder renamed successfully!");
                    queryClient.invalidateQueries({ queryKey: ["library-get"] });
                    setFolderName("");
                    setSelectedColor(folderColorData?.[0]?.id || null);
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
                    queryClient.invalidateQueries({ queryKey: ["library-get"] });
                    setFolderName("");
                    setSelectedColor(folderColorData?.[0]?.id || null);
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
            <div>
                {/* Title */}
                <h2 className="text-xl font-semibold text-[#12283B]">
                    {folderData ? "Rename Folder" : "Create Folder"}
                </h2>

                <hr className="my-4 text-gray-200" />

                {/* Folder Name with Dynamic Color Icon Preview */}
                <div className="mb-4">
                    <p className="mb-1 text-base text-gray-800! font-semibold">
                        Folder Name
                    </p>
                    <div className="relative flex items-center">
                        <span className="absolute left-3 flex items-center pointer-events-none">
                            <svg
                                width="18"
                                height="18"
                                viewBox="0 0 20 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                style={{ color: selectedColorHex }}
                            >
                                <path
                                    d="M2 4C2 3.44772 2.44772 3 3 3H7.58579C7.851 3 8.10536 3.10536 8.29289 3.29289L10 5H17C17.5523 5 18 5.44772 18 6V16C18 16.5523 17.5523 17 17 17H3C2.44772 17 2 16.5523 2 16V4Z"
                                    fill="currentColor"
                                />
                            </svg>
                        </span>
                        <input
                            type="text"
                            value={folderName}
                            onChange={(e) => setFolderName(e.target.value)}
                            className="w-full rounded-md border border-gray-300 pl-10 pr-3 py-2 outline-none focus:border-primary text-base font-medium transition-colors"
                            placeholder="e.g. Fundamentals, OB Notes…"
                        />
                    </div>
                </div>

                {/* Color */}
                <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                        <p className="text-sm text-[#424242] font-semibold!">Folder Color</p>
                        <div className="flex items-center gap-1.5 text-xs text-gray-500 font-medium">
                            <span>Preview:</span>
                            <svg
                                width="18"
                                height="18"
                                viewBox="0 0 20 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                style={{ color: selectedColorHex }}
                            >
                                <path
                                    d="M2 4C2 3.44772 2.44772 3 3 3H7.58579C7.851 3 8.10536 3.10536 8.29289 3.29289L10 5H17C17.5523 5 18 5.44772 18 6V16C18 16.5523 17.5523 17 17 17H3C2.44772 17 2 16.5523 2 16V4Z"
                                    fill="currentColor"
                                />
                            </svg>
                        </div>
                    </div>
                    <div className="flex gap-2.5 flex-wrap items-center">
                        {isColorLoading ? (
                            <LoadingIcon className="text-primary w-5 h-5" />
                        ) : folderColorData?.filter(item => item?.color).map((item) => {
                            const isSelected = selectedColor === item?.id;
                            return (
                                <button
                                    type="button"
                                    key={item?.id}
                                    onClick={() => setSelectedColor(item?.id)}
                                    className={`h-7 w-7 cursor-pointer rounded-full transition-all relative flex items-center justify-center ${
                                        isSelected
                                            ? "ring-2 ring-offset-2 ring-primary scale-110 shadow-xs"
                                            : "hover:scale-105 opacity-80 hover:opacity-100"
                                    }`}
                                    style={{ backgroundColor: item?.color }}
                                    title={`Color ${item?.id}`}
                                >
                                    {isSelected && (
                                        <svg
                                            className="w-3.5 h-3.5 text-white drop-shadow-xs"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth={3}
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                    )}
                                </button>
                            );
                        })}
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
                        disabled={isPending || !folderName.trim() || selectedColor === null || selectedColor === undefined}
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
