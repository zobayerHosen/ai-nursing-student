export const flashcardsService = {
  getCategory: async (axiosInstance) => {
    const response = await axiosInstance.get("/category-content/");
    return response?.data;
  },
  getProgress: async (axiosInstance) => {
    const response = await axiosInstance.get("/falscard-progress/");
    return response?.data;
  },
  submitAnswer: async (axiosInstance, payload) => {
    const response = await axiosInstance.post("/answer-submit/", payload);
    return response?.data;
  },
};
