export const GetFlashcardsCategoryService = async (axisoInstance) => {
  const response = await axisoInstance.get("/category-content/");
  return response?.data;
};
