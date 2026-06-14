import axiosPrivateClient from "@/lib/axios.private.client";
import { GetFlashcardProgressService } from "@/services/flashcards";
import { useQuery } from "@tanstack/react-query";

export const useGetFlashcardProgress = () => {
  const axiosInstance = axiosPrivateClient();

  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: ["flashcard-progress"],
    queryFn: () => GetFlashcardProgressService(axiosInstance),
    staleTime: 2 * 60 * 1000,
    retry: false,
  });

  return {
    categories: data?.data?.data?.categories ?? [],
    overall: data?.data?.data?.overall ?? null,
    isLoading,
    isError,
    isFetching,
  };
};
