export const videoLessonService = {


  getExploreModules: async (axiosInstance) => {
    const response = await axiosInstance.get("/explore/");
    return response?.data;
  },


  getBrowseVideoCategories: async (axiosInstance) => {
    const response = await axiosInstance.get("/browse-categories/");
    return response?.data;
  },


  getSingleBrowseCategoriesVideos: async (axiosInstance, id) => {
    const response = await axiosInstance.get(`/module/${id}/videos/`);
    return response?.data;
  },


  getVideoDetails: async (axiosInstance, id) => {
    const response = await axiosInstance.get(`/video/${id}/`);
    return response?.data;
  },


  addVideosTofavriate: async (axiosInstance, id) => {
    const response = await axiosInstance.post(`/video/${id}/favorite/`);
    return response?.data;
  },

  getVideoFavorites: async (axiosInstance, params) => {
    const response = await axiosInstance.get("/video-favorites/", { params });
    return response?.data;
  },

  getVideoCategories: async (axiosInstance) => {
    const response = await axiosInstance.get("/video-categories/");
    return response?.data;
  },

  getVideoLessonsProgress: async (axiosInstance) => {
    const response = await axiosInstance.get("/dashboard-vedio-progress/");
    return response?.data;
  },



  updateVideoProgress: async (axiosInstance, id, payload) => {
    const response = await axiosInstance.post(`/video/progress/${id}/`, payload);
    return response?.data;
  },


};
