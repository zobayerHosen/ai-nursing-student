export const GetVideoLessonsProgressService = async (axiosInstance) => {
    const response = await axiosInstance.get('/dashboard-vedio-progress/',);
    return response.data;
};