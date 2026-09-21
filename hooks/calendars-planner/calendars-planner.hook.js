import axiosPrivateClient from "@/lib/axios.private.client";
import { calendarPlannerService } from "@/services/calendars-planner";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// ─── Query Keys ───
const KEYS = {
    courses: ["calendar-courses"],
    events: (filter) => ["calendar-events", filter || "all"],
    syllabi: ["calendar-syllabi"],
    gradesSummary: ["calendar-grades-summary"],
};

/** Invalidate all calendar-related queries after a mutation */
function useInvalidateCalendar() {
    const queryClient = useQueryClient();
    return () => {
        queryClient.invalidateQueries({ queryKey: KEYS.courses });
        queryClient.invalidateQueries({ queryKey: ["calendar-events"] });
        queryClient.invalidateQueries({ queryKey: KEYS.syllabi });
        queryClient.invalidateQueries({ queryKey: KEYS.gradesSummary });
    };
}

// ─── Courses ───
export const useCalendarCourses = () => {
    const axiosInstance = axiosPrivateClient();
    const { data, isLoading, isError, error, refetch } = useQuery({
        queryKey: KEYS.courses,
        queryFn: () => calendarPlannerService.fetchCourses(axiosInstance),
    });
    return {
        coursesData: data?.data?.courses ?? data?.courses ?? [],
        isCoursesLoading: isLoading,
        isCoursesError: isError,
        coursesError: error,
        refetchCourses: refetch,
    };
};

// ─── Events ───
export const useCalendarEvents = (courseFilter) => {
    const axiosInstance = axiosPrivateClient();
    const { data, isLoading, isError, error, refetch } = useQuery({
        queryKey: KEYS.events(courseFilter),
        queryFn: () => calendarPlannerService.fetchEvents(axiosInstance, courseFilter),
    });
    return {
        eventsData: data?.data?.events ?? data?.events ?? [],
        isEventsLoading: isLoading,
        isEventsError: isError,
        eventsError: error,
        refetchEvents: refetch,
    };
};

// ─── Create Event ───
export const useCreateEvent = () => {
    const axiosInstance = axiosPrivateClient();
    const invalidateAll = useInvalidateCalendar();
    const { mutateAsync: createEvent, isPending: isCreating, isError, error } = useMutation({
        mutationKey: ["create-calendar-event"],
        mutationFn: (payload) => calendarPlannerService.createEvent(axiosInstance, payload),
        onSuccess: invalidateAll,
    });
    return { createEvent, isCreating, isCreateError: isError, createError: error };
};

// ─── Toggle Complete ───
export const useToggleEventComplete = () => {
    const axiosInstance = axiosPrivateClient();
    const invalidateAll = useInvalidateCalendar();
    const { mutateAsync: toggleComplete, isPending: isToggling } = useMutation({
        mutationFn: ({ eventId, completed }) =>
            calendarPlannerService.toggleEventComplete(axiosInstance, eventId, completed),
        onSuccess: invalidateAll,
    });
    return { toggleComplete, isToggling };
};

// ─── Save Grade ───
export const useSaveEventGrade = () => {
    const axiosInstance = axiosPrivateClient();
    const invalidateAll = useInvalidateCalendar();
    const { mutateAsync: saveGrade, isPending: isSavingGrade } = useMutation({
        mutationFn: ({ eventId, grade_earned, mark_completed }) =>
            calendarPlannerService.saveEventGrade(axiosInstance, eventId, { grade_earned, mark_completed }),
        onSuccess: invalidateAll,
    });
    return { saveGrade, isSavingGrade };
};

// ─── Delete Event ───
export const useDeleteEvent = () => {
    const axiosInstance = axiosPrivateClient();
    const invalidateAll = useInvalidateCalendar();
    const { mutateAsync: deleteEvent, isPending: isDeleting } = useMutation({
        mutationFn: (eventId) => calendarPlannerService.deleteEvent(axiosInstance, eventId),
        onSuccess: invalidateAll,
    });
    return { deleteEvent, isDeleting };
};

// ─── Syllabi ───
export const useCalendarSyllabi = () => {
    const axiosInstance = axiosPrivateClient();
    const { data, isLoading, isError, error, refetch } = useQuery({
        queryKey: KEYS.syllabi,
        queryFn: () => calendarPlannerService.fetchSyllabi(axiosInstance),
    });
    return {
        syllabiData: data?.data?.syllabi ?? data?.syllabi ?? [],
        isSyllabiLoading: isLoading,
        isSyllabiError: isError,
        syllabiError: error,
        refetchSyllabi: refetch,
    };
};

// ─── Upload Syllabus ───
export const useUploadSyllabus = () => {
    const axiosInstance = axiosPrivateClient();
    const invalidateAll = useInvalidateCalendar();
    const { mutateAsync: uploadSyllabus, isPending: isUploading, isError, error } = useMutation({
        mutationKey: ["upload-syllabus"],
        mutationFn: (file) => calendarPlannerService.uploadSyllabus(axiosInstance, file),
        onSuccess: invalidateAll,
    });
    return { uploadSyllabus, isUploading, isUploadError: isError, uploadError: error };
};

// ─── Delete Syllabus ───
export const useDeleteSyllabus = () => {
    const axiosInstance = axiosPrivateClient();
    const invalidateAll = useInvalidateCalendar();
    const { mutateAsync: deleteSyllabus, isPending: isDeletingSyllabus } = useMutation({
        mutationFn: (syllabusId) => calendarPlannerService.deleteSyllabus(axiosInstance, syllabusId),
        onSuccess: invalidateAll,
    });
    return { deleteSyllabus, isDeletingSyllabus };
};

// ─── Grades Summary ───
export const useGradesSummary = () => {
    const axiosInstance = axiosPrivateClient();
    const { data, isLoading, isError, error, refetch } = useQuery({
        queryKey: KEYS.gradesSummary,
        queryFn: () => calendarPlannerService.fetchGradesSummary(axiosInstance),
    });
    return {
        gradesSummary: data?.data?.summary ?? data?.summary ?? null,
        isGradesLoading: isLoading,
        isGradesError: isError,
        gradesError: error,
        refetchGrades: refetch,
    };
};

// ─── Clear All Data ───
export const useClearAllData = () => {
    const axiosInstance = axiosPrivateClient();
    const invalidateAll = useInvalidateCalendar();
    const { mutateAsync: clearAllData, isPending: isClearing } = useMutation({
        mutationFn: () => calendarPlannerService.clearAllData(axiosInstance),
        onSuccess: invalidateAll,
    });
    return { clearAllData, isClearing };
};
