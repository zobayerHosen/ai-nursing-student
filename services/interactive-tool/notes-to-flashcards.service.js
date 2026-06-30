export const getFlashCardById = async (axiosInstance, id) => {
  const response = await axiosInstance.get(`/flashcards/${id}/`);
  return response.data;
};

export const getFlashCards = async (axiosInstance) => {
  const response = await axiosInstance.get("/flashcards_list/");
  return response.data;
};

export const generateFlashCard = async (axiosInstance, data) => {
  const response = await axiosInstance.post("/flashcards/generate/", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};
