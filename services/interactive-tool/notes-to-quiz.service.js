// 1. generate quiz
export const generateQuiz = async (axiosInstance, data) => {
  const response = await axiosInstance.post("/nclex/generate/", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

// 2. list quiz history
export const getAllQuizzes = async (axiosInstance) => {
  const response = await axiosInstance.get("/nclex/");
  return response.data;
};

// 3. get single quiz
export const getQuizById = async (axiosInstance, id) => {
  const response = await axiosInstance.get(`/nclex/${id}/`);
  return response.data;
};

// 4. submit answer
export const submitQuestionAnswer = async (axiosInstance, id, data) => {
  const response = await axiosInstance.post(`/nclex/${id}/submit/`, data);
  return response.data;
};

// 5. get score
export const getQuizScore = async (axiosInstance, id) => {
  const response = await axiosInstance.get(`/nclex/${id}/score/`);
  return response.data;
};

// 6. restart exam
export const restartQuiz = async (axiosInstance, id) => {
  const response = await axiosInstance.post(`/nclex/${id}/restart/`);
  return response.data;
};

// 7. delete single quiz
export const deleteSingleQuiz = async (axiosInstance, id) => {
  const response = await axiosInstance.delete(`/nclex/${id}/delete/`);
  return response.data;
};

// 8. delete all quizzes
export const deleteAllQuizzes = async (axiosInstance) => {
  const response = await axiosInstance.delete(`/nclex/clear/`);
  return response.data;
};
