import { FileQuestion } from "lucide-react";

const NoteNotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center h-[70vh] text-center px-4">

            {/* Icon */}
            <div className="w-20 h-20 rounded-2xl bg-linear-to-br from-indigo-100 via-blue-100 to-purple-100 flex items-center justify-center mb-6 shadow-md animate-bounce">
                <FileQuestion size={40} className="text-indigo-600" />
            </div>

            {/* Oops label */}
            <p className="text-sm font-bold text-indigo-600 mb-2">
                Oops!
            </p>

            {/* Title */}
            <h2 className="text-3xl font-semibold text-[#1B4B66] mb-2">
                Note content not available
            </h2>

            {/* Description */}
            <p className="text-gray-500 text-base max-w-md mb-6 leading-relaxed">
                This note exists, but its content couldn’t be loaded right now. 
                It may be empty, still being created, or temporarily unavailable.
            </p>
        </div>
    );
};

export default NoteNotFound;