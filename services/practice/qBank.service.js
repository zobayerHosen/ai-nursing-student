// Category list get
export const categoryListService = async (axiosInstance) => {
    const response = await axiosInstance.get(`/nclex/topic/`);
    return response?.data;
}



// Category list get