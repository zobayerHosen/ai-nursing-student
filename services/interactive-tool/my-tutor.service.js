export const GetVoiceSessionService = async (axiosInstance) => {
  const response = await axiosInstance.post("/tutor/voice/session/");
  return response?.data;
};


