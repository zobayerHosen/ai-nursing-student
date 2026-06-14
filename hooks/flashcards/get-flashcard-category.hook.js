import axiosPrivateClient from "@/lib/axios.private.client";
import { GetFlashcardsCategoryService } from "@/services/flashcards";
import { useQuery } from "@tanstack/react-query";

export const useGetFlashcardCategory = () => {
  const axiosInstance = axiosPrivateClient();

  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: ["flashcard-get"],
    queryFn: () => GetFlashcardsCategoryService(axiosInstance),
    staleTime: 2 * 60 * 1000,
    retry: false,
  });

  return {
    flashcardData: data?.data,
    isLoading,
    isError,
    isFetching,
  };
};
