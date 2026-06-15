export const SubmitFlashcardAnswerService = async (payload, axiosInstance) => {
  const response = await axiosInstance.post("/answer-submit/", payload);
  return response?.data;
};
