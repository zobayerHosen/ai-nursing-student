export const calendarPlannerService = {
    // ── Courses ──
    fetchCourses: async (axiosInstance) => {
        const response = await axiosInstance.get('/courses');
        return response.data;
    },

    // ── Calendar Events ──
    fetchEvents: async (axiosInstance, courseFilter) => {
        const params = courseFilter && courseFilter !== 'all' ? { course: courseFilter } : {};
        const response = await axiosInstance.get('/calendar/events', { params });
        return response.data;
    },

    createEvent: async (axiosInstance, payload) => {
        const response = await axiosInstance.post('/calendar/events', payload);
        return response.data;
    },

    toggleEventComplete: async (axiosInstance, eventId, completed) => {
        const response = await axiosInstance.patch(
            `/calendar/events/${eventId}/toggle-complete`,
            completed !== undefined ? { completed } : undefined
        );
        return response.data;
    },

    saveEventGrade: async (axiosInstance, eventId, payload) => {
        const response = await axiosInstance.patch(
            `/calendar/events/${eventId}/grade`,
            payload
        );
        return response.data;
    },

    deleteEvent: async (axiosInstance, eventId) => {
        const response = await axiosInstance.delete(`/calendar/events/${eventId}`);
        return response.data;
    },

    // ── Syllabi ──
    fetchSyllabi: async (axiosInstance) => {
        const response = await axiosInstance.get('/syllabus/syllabi');
        return response.data;
    },

    uploadSyllabus: async (axiosInstance, file) => {
        const formData = new FormData();
        formData.append('file', file);
        const response = await axiosInstance.post('/syllabus/upload', formData, {
            headers: { 'Content-Type': undefined },
        });
        return response.data;
    },

    deleteSyllabus: async (axiosInstance, syllabusId) => {
        const response = await axiosInstance.delete(`/syllabus/${syllabusId}`);
        return response.data;
    },

    // ── Grades Summary ──
    fetchGradesSummary: async (axiosInstance) => {
        const response = await axiosInstance.get('/grades/summary');
        return response.data;
    },

    // ── Data Management ──
    clearAllData: async (axiosInstance) => {
        const response = await axiosInstance.post('/data/clear');
        return response.data;
    },
};