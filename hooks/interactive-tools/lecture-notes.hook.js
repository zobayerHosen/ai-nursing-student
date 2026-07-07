import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosPrivateClient from "@/lib/axios.private.client";
import {
  saveNote,
  formatNoteWithAI,
  getNoteLists,
  getNoteById,
  deleteNote,
  updateNote,
} from "@/services/interactive-tool";

/**
 * Hook to fetch all lecture notes with caching.
 */
export const useGetNoteLists = () => {
  const axiosInstance = axiosPrivateClient();

  const { data, isLoading, isError, isFetching, error, refetch } = useQuery({
    queryKey: ["lecture-notes"],
    queryFn: () => getNoteLists(axiosInstance),
    staleTime: 2 * 60 * 1000,
    retry: false,
  });

  return {
    notesList: data?.data?.data ?? [],
    data,
    isLoading,
    isError,
    isFetching,
    error,
    refetch,
  };
};

/**
 * Hook to fetch a single lecture note by ID.
 */
export const useGetNoteById = (id) => {
  const axiosInstance = axiosPrivateClient();

  const { data, isLoading, isError, isFetching, error, refetch } = useQuery({
    queryKey: ["lecture-note", id],
    queryFn: () => getNoteById(axiosInstance, id),
    enabled: Boolean(id),
    staleTime: 2 * 60 * 1000,
    retry: false,
  });

  return {
    note: data?.data?.data,
    data,
    isLoading,
    isError,
    isFetching,
    error,
    refetch,
  };
};

/**
 * Hook to create a new lecture note.
 */
export const useCreateNote = () => {
  const axiosInstance = axiosPrivateClient();
  const queryClient = useQueryClient();

  const {
    mutateAsync: createLectureNote,
    isPending,
    data,
    isError,
    error,
  } = useMutation({
    mutationKey: ["lecture-note-create"],
    mutationFn: (payload) => saveNote(axiosInstance, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lecture-notes"] });
    },
  });

  return {
    createLectureNote,
    isPending,
    createdNote: data?.data?.data,
    data,
    isError,
    error,
  };
};

/**
 * Hook to update an existing lecture note.
 */
export const useUpdateNote = () => {
  const axiosInstance = axiosPrivateClient();
  const queryClient = useQueryClient();

  const {
    mutateAsync: updateLectureNote,
    isPending,
    data,
    isError,
    error,
  } = useMutation({
    mutationKey: ["lecture-note-update"],
    mutationFn: ({ id, ...payload }) => updateNote(axiosInstance, id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lecture-notes"] });
    },
  });

  return {
    updateLectureNote,
    isPending,
    updatedNote: data?.data?.data,
    data,
    isError,
    error,
  };
};

/**
 * Hook to delete a lecture note.
 */
export const useDeleteLectureNote = () => {
  const axiosInstance = axiosPrivateClient();
  const queryClient = useQueryClient();

  const {
    mutateAsync: deleteLectureNote,
    isPending,
    data,
    isError,
    error,
  } = useMutation({
    mutationKey: ["lecture-note-delete"],
    mutationFn: (id) => deleteNote(axiosInstance, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lecture-notes"] });
    },
  });

  return {
    deleteLectureNote,
    isPending,
    data,
    isError,
    error,
  };
};

/**
 * Hook to format note content with AI.
 */
export const useFormatNoteWithAI = () => {
  const axiosInstance = axiosPrivateClient();

  const {
    mutateAsync: formatWithAI,
    isPending,
    data,
    isError,
    error,
  } = useMutation({
    mutationKey: ["lecture-note-ai-format"],
    mutationFn: (payload) => formatNoteWithAI(axiosInstance, payload),
  });

  return {
    formatWithAI,
    isPending,
    formattedData: data?.data?.data,
    data,
    isError,
    error,
  };
};
