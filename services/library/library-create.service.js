export const CreateLibraryService = async (payload, axiosInstance) => {
  const response = await axiosInstance.post("/library/", payload, 
    {
      headers:{
        "Content-Type": "multipart/form-data"
      }
    }
  );
  return response?.data;
};
