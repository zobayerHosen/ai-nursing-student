// Category list get
export const categoryListService = async (axiosInstance) => {
    const response = await axiosInstance.get(`/nclex/topic/`);
    return response?.data;
}


// start exam service
export const startExamService = async (axiosInstance, data) => {
    const response = await axiosInstance.post(`/start-exam/`, data);
    return response?.data;
}

// Question data get for exam by exam id
export const getExamQuestionService = async (axiosInstance, examId) => {
    const response = await axiosInstance.get(`/nclex/subtopic/${examId}/`);
    return response?.data;
}