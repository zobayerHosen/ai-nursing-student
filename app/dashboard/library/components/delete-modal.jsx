
"use client";

import { Modal } from "antd";
import { AlertTriangle, X } from "lucide-react";

const DeleteModal = ({ isModalOpen, setIsModalOpen, onDelete, title, description, loading }) => {
    return (
        <Modal
            centered
            open={isModalOpen}
            onCancel={() => setIsModalOpen(false)}
            footer={null}
            closeIcon={null}
            styles={{
                content: {
                    borderRadius: "16px",
                    padding: "24px",
                },
            }}
            className="max-w-[400px]"
        >
            <div className="flex flex-col items-center text-center">
                {/* Icon */}
                <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-4">
                    <AlertTriangle className="text-red-600 w-6 h-6" />
                </div>

                {/* Close Button */}
                <button 
                    onClick={() => setIsModalOpen(false)}
                    className="absolute top-4 right-4 p-1 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
                >
                    <X className="w-5 h-5 text-gray-400" />
                </button>

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {title || "Delete Folder"}
                </h3>
                <p className="text-gray-500 mb-8 leading-relaxed">
                    {description || "Are you sure you want to delete this folder? This action cannot be undone and all notes inside will be removed."}
                </p>

                {/* Actions */}
                <div className="flex w-full gap-3">
                    <button
                        onClick={() => setIsModalOpen(false)}
                        className="flex-1 py-2.5 px-4 rounded-xl border border-gray-200 text-gray-700 font-semibold hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onDelete}
                        disabled={loading}
                        className="flex-1 py-2.5 px-4 rounded-xl bg-red-600 text-white font-semibold hover:bg-red-700 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? "Deleting..." : "Delete"}
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default DeleteModal;
