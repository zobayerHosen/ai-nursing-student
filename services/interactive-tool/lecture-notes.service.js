export const saveNote = async (axiosInstance, data) => {
    const response = await axiosInstance.post("notes/", data);
    return response?.data;
};

export const formatNoteWithAI = async (axiosInstance, data) => {
    const response = await axiosInstance.post("ai-format/", data);
    return response?.data;
};

export const getNoteLists = async (axiosInstance) => {
    const response = await axiosInstance.get("notes/");
    return response?.data;
};

export const getNoteById = async (axiosInstance, id) => {
    const response = await axiosInstance.get(`notes/${id}/`);
    return response?.data;
};

export const deleteNote = async (axiosInstance, id) => {
    const response = await axiosInstance.delete(`notes/${id}/`);
    return response?.data;
};

export const updateNote = async (axiosInstance, id, data) => {
    const response = await axiosInstance.put(`notes/${id}/`, data);
    return response?.data;
};