"use client";
import { FolderPlus } from "lucide-react";
import { useState } from "react";
import FolderCreateModal from "./components/folder-create-modal";

const MyLibraryPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
    setLoading(true);

    // Simple loading mock.
    setTimeout(() => {
      setLoading(false);
    }, 1000);

  };

  return (
    <div className="w-full h-[80vh] flex items-center justify-center px-4">
      {/* default create folder */}
      <div className="text-center max-w-md">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-2xl bg-linear-to-br from-indigo-100 via-blue-100 to-purple-100 flex items-center justify-center shadow-sm animate-bounce">
            <FolderPlus size={40} className="text-[#18344E]" />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-3xl font-semibold text-[#1B4B66] mb-2">
          No bookmarks yet
        </h2>

        {/* Description */}
        <p className="text-gray-500 text-base mb-6 leading-relaxed">
          You haven’t saved any notes or bookmarks yet. Start organizing your
          content by creating your first folder.
        </p>

        {/* Button */}
        <button
          onClick={openModal}
          className="cursor-pointer inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary/90 transition"
        >
          <FolderPlus size={18} />
          Create Folder
        </button>
      </div>

      <FolderCreateModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        loading={loading}
      />
    </div>
  );
};

export default MyLibraryPage;