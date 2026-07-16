export const StudyNotesProgressService = async (axiosInstance) => {
    const response = await axiosInstance.get(`/study-notes-dashboard/`);
    return response?.data?.data;
}