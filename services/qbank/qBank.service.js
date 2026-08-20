// Category list get
export const categoryListService = async (axiosInstance) => {
    const response = await axiosInstance.get(`/nclex/practice/`);
    return response?.data;
}

// Start/Create session service
export const createSessionService = async (axiosInstance, data) => {
    const response = await axiosInstance.post(`/nclex/practice/session/`, data);
    return response?.data;
}

// Question data get for exam by session id
export const getExamQuestionService = async (axiosInstance, sessionId) => {
    const response = await axiosInstance.get(`/nclex/practice/exam/${sessionId}/`);
    return response?.data;
}

// Submit answer service
export const submitAnswerService = async (axiosInstance, data) => {
    const response = await axiosInstance.post(`/nclex/practice/answer/`, data);
    return response?.data;
}

// Finish exam service
export const finishExamService = async (axiosInstance, sessionId) => {
    const response = await axiosInstance.post(`/nclex/practice/finish/${sessionId}/`);
    return response?.data;
}