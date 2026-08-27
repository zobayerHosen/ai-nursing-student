import LoadingIcon from "@/components/loading-icon";
import { useDeleteUserImage } from "@/hooks";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const DeleteProfile = ({ handlePictureChange, fileInputRef }) => {
    const queryClient = useQueryClient();
    const { deleteUserImage, isPending } = useDeleteUserImage();

    const handleDeletePicture = () => {
        deleteUserImage(undefined, {
            onSuccess: (data) => {
                queryClient.invalidateQueries({ queryKey: ["user"] });
                toast.success(data?.message ?? "Profile picture deleted successfully");
            },
            onError: (error) => {
                toast.error(error?.response?.data?.message);
            },
        });
    };

    return (
        <div>
            <button
                type="button"
                onClick={handleDeletePicture}
                disabled={isPending}
                className={`bg-[#FFF0F2] hover:bg-[#FFE2E6] text-[#FF4D4D] px-4 py-2 rounded-lg text-xs font-semibold active:scale-95 transition-all cursor-pointer ${isPending ? "opacity-50 cursor-not-allowed" : ""}`}
            >
                {isPending ? <LoadingIcon /> : "Delete Picture"}
            </button>
            <input
                type="file"
                ref={fileInputRef}
                onChange={handlePictureChange}
                className="hidden"
                accept="image/*"
            />
        </div>
    );
};
export default DeleteProfile;