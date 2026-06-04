export async function DeleteUserImageService(axiosInstance) {
    if (!axiosInstance) return null;
    try {
        const response = await axiosInstance.patch("/account/", {
            remove_profile_photo: true,
        });
        return response?.data || {};
    } catch (err) {
        throw err;
    };
}
