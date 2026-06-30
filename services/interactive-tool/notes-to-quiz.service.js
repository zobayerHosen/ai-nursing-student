export const getQuizById = async (axiosInstance, id) => {
  const response = await axiosInstance.get(`/nclex/${id}/`);
  return response.data;
};

export const getAllQuizzes = async (axiosInstance) => {
  const response = await axiosInstance.get("/nclex/");
  return response.data;
};

export const generateQuiz = async (axiosInstance, data) => {
  const response = await axiosInstance.post("/nclex/generate/", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};
