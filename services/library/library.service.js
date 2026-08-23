export const libraryService = {
  getLibrary: async (axiosInstance) => {
    const response = await axiosInstance.get("/library/");
    return response?.data;
  },
  createLibrary: async (axiosInstance, payload) => {
    const response = await axiosInstance.post("/library/", payload);
    return response?.data;
  },
  renameLibrary: async (axiosInstance, id, payload) => {
    const response = await axiosInstance.patch(`/library/${id}/`, payload);
    return response?.data;
  },
  deleteLibrary: async (axiosInstance, id) => {
    const response = await axiosInstance.delete(`/library/${id}/`);
    return response?.data;
  },
  getFolderIcon: async (axiosInstance) => {
    const response = await axiosInstance.get("/icons/");
    return response?.data;
  },
  getFolderColor: async (axiosInstance) => {
    const response = await axiosInstance.get("/color/");
    return response?.data;
  },
};
