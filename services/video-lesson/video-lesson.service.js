export const videoLessonService = {
  getModules: async (axiosInstance) => {
    const response = await axiosInstance.get("/module/");
    return response?.data;
  },
  getModuleById: async (axiosInstance, id) => {
    const response = await axiosInstance.get(`/module/${id}/`);
    return response?.data;
  },
  getVideoDetails: async (axiosInstance, id) => {
    const response = await axiosInstance.get(`/video/${id}/`);
    return response?.data;
  },
  updateVideoProgress: async (axiosInstance, id, payload) => {
    const response = await axiosInstance.post(`/video/progress/${id}/`, payload);
    return response?.data;
  },
  getVideoLessonsProgress: async (axiosInstance) => {
    const response = await axiosInstance.get("/dashboard-vedio-progress/");
    return response?.data;
  },
};
