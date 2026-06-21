"use client";
import { FolderPlus, BookOpen } from "lucide-react";
import { useState } from "react";
import FolderCreateModal from "./components/folder-create-modal";
import { useGetLibrary } from "@/hooks";

const MyLibraryPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { libraryData, isLoading } = useGetLibrary();

  const hasFolders = Array.isArray(libraryData) && libraryData.length > 0;

  return (
    <div className="w-full h-[80vh] flex items-center justify-center px-4">
      {isLoading ? (
        /* Loading state */
        <div className="text-center">
          <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
        </div>
      ) : hasFolders ? (
        <div className="text-center max-w-md">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-2xl bg-linear-to-br from-sky-100 via-blue-100 to-indigo-100 flex items-center justify-center shadow-sm">
              <BookOpen size={40} className="text-[#18344E]" />
            </div>
          </div>
          <h2 className="text-3xl font-semibold text-[#1B4B66] mb-2">
            Select a Topic
          </h2>
          <p className="text-gray-500 text-base leading-relaxed">
            Please select a saved topic from the sidebar to view its details.
          </p>
        </div>
      ) : (
        <div className="text-center max-w-md">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-2xl bg-linear-to-br from-indigo-100 via-blue-100 to-purple-100 flex items-center justify-center shadow-sm animate-bounce">
              <FolderPlus size={40} className="text-[#18344E]" />
            </div>
          </div>
          <h2 className="text-3xl font-semibold text-[#1B4B66] mb-2">
            No bookmarks yet
          </h2>
          <p className="text-gray-500 text-base mb-6 leading-relaxed">
            You haven&apos;t saved any notes or bookmarks yet. Start organizing your
            content by creating your first folder.
          </p>

          {/* Button */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="cursor-pointer inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary/90 transition"
          >
            <FolderPlus size={18} />
            Create Folder
          </button>
        </div>
      )}

      <FolderCreateModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </div>
  );
};

export default MyLibraryPage;
