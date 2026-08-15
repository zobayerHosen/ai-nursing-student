export const getFlashCardById = async (axiosInstance, id) => {
  const response = await axiosInstance.get(`/flashcards/${id}/`);
  return response.data;
};

export const getFlashCardHistoryList = async (axiosInstance) => {
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

// History details api get session score
export const sessionScore = async (axiosInstance, id) => {
  const response = await axiosInstance.get(`/flashcards/${id}/score/`);
  return response.data;
}

// All generated flashcard get api
export const allGeneratedFlashCard = async (axiosInstance, id) => {
  const response = await axiosInstance.get(`/flashcards/${id}/`);
  return response.data;
}


// flashcard mark as a i know it or still learning api
export const markAsKnowItOrStillLearning = async (axiosInstance, id, payload) => {
  const response = await axiosInstance.post(`/flashcards/${id}/mark/`, payload);
  return response.data;
}


// delete single history list api
export const deleteSingleHistoryList = async (axiosInstance, id) => {
  const response = await axiosInstance.delete(`/flashcards/${id}/delete/`);
  return response.data;
}

// delete all history list at a time api
export const deleteAllHistoryList = async (axiosInstance) => {
  const response = await axiosInstance.delete(`/flashcards/clear/`);
  return response.data;
}
