"use client";
import LoadingIcon from '@/components/loading-icon';
import { useDeleteUser } from '@/hooks/user/delete-user.hook';
import { Modal } from 'antd';
import { AlertTriangle, ShieldAlert, Trash2 } from 'lucide-react';
import React, { useState } from 'react';

const DeleteAccount = () => {
    const { deleteUser, isPending } = useDeleteUser();

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const handleDeleteAccount = () => {
        setIsDeleteModalOpen(true);
    };

    const handleCancelDelete = () => {
        setIsDeleteModalOpen(false);
    };

    const confirmDelete = () => {
        // setIsDeleteModalOpen(false);
        deleteUser(undefined, {
            onSuccess: (data) => {
                toast.success(data?.message);
            },
            onError: (error) => {
                toast.error(error?.response?.data?.message);
            }
        });
    };
    return (
        <div className="bg-[#FFF0F2] border border-[#FFE2E6] rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1">
                <h4 className="text-base font-bold text-[#FF4D4D] flex items-center gap-1.5">
                    <ShieldAlert size={18} />
                    Delete Account
                </h4>
                <p className="text-xs text-[#FF4D4D]/75 leading-relaxed font-medium">Delete your Ace-Nuryr,g öccount and data permanently.</p>
            </div>
            <button
                type="button"
                onClick={handleDeleteAccount}
                className="bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-xl text-xs font-semibold shadow-sm flex items-center gap-2 active:scale-95 transition-all cursor-pointer"
            >
                <Trash2 size={14} />
                Delete Account
            </button>
            {/* Confirmation Modal */}
            <Modal
                open={isDeleteModalOpen}
                onCancel={handleCancelDelete}
                footer={null}
                closeIcon={null}
                centered
            >
                <div className="flex flex-col text-center items-center gap-3 mb-4">
                    <AlertTriangle className="shrink-0 text-red-500 bg-gray-100 p-2 rounded-full w-10 h-10" size={20} />
                    <h3 className="text-lg font-semibold text-gray-800">Confirm Delete</h3>
                    <p className="text-sm text-gray-600 mb-6">
                        Are you sure you want to delete your account? This action cannot be undone.
                    </p>
                </div>

                <div className="flex justify-end gap-3">
                    <button
                        onClick={handleCancelDelete}
                        className="px-4 py-2 rounded-md bg-gray-200 text-gray-800 hover:bg-gray-300"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={confirmDelete}
                        disabled={isPending}
                        className={`px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 ${isPending ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
                    >
                        {isPending ? <LoadingIcon /> : "Confirm"}
                    </button>
                </div>
            </Modal>
        </div>
    );
};

export default DeleteAccount;