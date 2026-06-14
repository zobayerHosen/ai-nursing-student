export const GetFlashcardProgressService = async (axisoInstance) => {
  const response = await axisoInstance.get("/falscard-progress/");
  return response?.data;
};
