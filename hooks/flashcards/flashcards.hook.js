import { useMemo } from "react";
import axiosPrivateClient from "@/lib/axios.private.client";
import { flashcardsService } from "@/services/flashcards";
import {
  useQuery,
  useMutation,
  useQueryClient,
  useInfiniteQuery,
} from "@tanstack/react-query";

export const useGetFlashcardCategory = () => {
  const axiosInstance = axiosPrivateClient();

  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: ["flashcard-get"],
    queryFn: () => flashcardsService.getCategory(axiosInstance),
    staleTime: 2 * 60 * 1000,
    retry: false,
  });

  const flashcardData = Array.isArray(data?.data)
    ? data.data
    : Array.isArray(data?.data?.data)
      ? data.data.data
      : Array.isArray(data)
        ? data
        : [];

  return {
    flashcardData,
    isLoading,
    isError,
    isFetching,
  };
};

// get all decks with infinite scroll pagination (default 10 per page)
export const useGetAllDecks = (deckId, options = {}) => {
  const axiosInstance = axiosPrivateClient();
  const { pageSize = 10, enabled = true } =
    typeof options === "number" ? { pageSize: options } : options;

  const query = useInfiniteQuery({
    queryKey: ["all-decks", deckId, pageSize],
    queryFn: ({ pageParam = 1 }) =>
      flashcardsService.getAllDecks(axiosInstance, deckId, {
        page: pageParam,
        page_size: pageSize,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const payload = lastPage?.data?.data || lastPage?.data || lastPage;
      if (!payload) return undefined;

      const currentPage = Number(payload.current_page);
      const totalPages = Number(payload.total_pages);

      if (currentPage && totalPages) {
        return currentPage < totalPages ? currentPage + 1 : undefined;
      }
      return payload.next ? (currentPage || 1) + 1 : undefined;
    },
    enabled: Boolean(deckId && enabled),
    staleTime: 2 * 60 * 1000,
    retry: false,
  });

  const allDecks = useMemo(() => {
    const pages = query.data?.pages;
    if (!pages?.length) return [];

    const seen = new Set();
    return pages
      .flatMap((page) => {
        const payload = page?.data?.data || page?.data || page;
        return Array.isArray(payload?.results)
          ? payload.results
          : Array.isArray(payload)
            ? payload
            : [];
      })
      .filter((deck) => deck?.id != null && !seen.has(deck.id) && seen.add(deck.id));
  }, [query.data?.pages]);

  const firstPagePayload =
    query.data?.pages?.[0]?.data?.data ||
    query.data?.pages?.[0]?.data ||
    query.data?.pages?.[0];
  const totalCount = firstPagePayload?.count ?? allDecks.length;

  return {
    ...query,
    allDecks,
    totalCount,
    isLoading: query.isLoading,
    isError: query.isError,
    isFetching: query.isFetching,
    fetchNextPage: query.fetchNextPage,
    hasNextPage: query.hasNextPage,
    isFetchingNextPage: query.isFetchingNextPage,
    refetch: query.refetch,
  };
};

export const useGetDeckDetails = (deckId) => {
  const axiosInstance = axiosPrivateClient();

  const { data, isLoading, isError, isFetching, refetch } = useQuery({
    queryKey: ["deck-details", deckId],
    queryFn: () => flashcardsService.getDeckDetails(axiosInstance, deckId),
    enabled: !!deckId,
    staleTime: 2 * 60 * 1000,
    retry: false,
  });

  const deckData = data?.data ?? data ?? null;

  return {
    deckData,
    flashcard: deckData,
    data,
    isLoading,
    isError,
    isFetching,
    refetch,
  };
};

// sub category details
export const useGetDectSubCategroyDetails = (decCatSubId) => {
  const axiosInstance = axiosPrivateClient();
  const {
    data,
    isLoading,
    isError
  } = useQuery({
    queryKey: ["deck-sub-category-details", decCatSubId],
    queryFn: async () => flashcardsService.getDeckSubCategoriesDetails(axiosInstance, decCatSubId),
    enabled: !!decCatSubId,
    staleTime: 2 * 60 * 1000,
    retry: false,
  });

  return {
    subcategoryDetails: data?.data,
    isLoading,
    isError
  }
};


export const useGetFavoriteDecks = () => {
  const axiosInstance = axiosPrivateClient();

  const { data, isLoading, isError, isFetching, refetch } = useQuery({
    queryKey: ["favorite-decks"],
    queryFn: () => flashcardsService.getFavoriteDecks(axiosInstance),
    staleTime: 2 * 60 * 1000,
    retry: false,
  });

  const favoriteDecks = useMemo(() => {
    if (!data) return [];
    if (Array.isArray(data)) return data;
    if (Array.isArray(data?.results)) return data.results;
    if (Array.isArray(data?.data)) return data.data;
    if (Array.isArray(data?.data?.results)) return data.data.results;
    if (Array.isArray(data?.data?.data)) return data.data.data;
    return [];
  }, [data]);

  return {
    favoriteDecks,
    isLoading,
    isError,
    isFetching,
    refetch,
  };
};

export const useToggleFavoriteDeck = () => {
  const axiosInstance = axiosPrivateClient();
  const queryClient = useQueryClient();

  const {
    mutateAsync: toggleFavorite,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: (deckId) =>
      flashcardsService.toggleFavoriteDeck(axiosInstance, deckId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favorite-decks"] });
      queryClient.invalidateQueries({ queryKey: ["flashcard-get"] });
      queryClient.invalidateQueries({ queryKey: ["deck-details"] });
      queryClient.invalidateQueries({ queryKey: ["all-decks"] });
    },
  });

  return {
    toggleFavorite,
    isPending,
    isError,
    error,
  };
};

export const useGetFlashcardProgress = () => {
  const axiosInstance = axiosPrivateClient();

  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: ["flashcard-progress"],
    queryFn: () => flashcardsService.getProgress(axiosInstance),
    staleTime: 2 * 60 * 1000,
    retry: false,
  });

  const progressData = data?.data?.data ?? data?.data ?? data ?? {};
  const categories = progressData?.categories ?? [];
  const overall = progressData?.overall ?? null;

  return {
    categories,
    overall,
    isLoading,
    isError,
    isFetching,
  };
};

export const useSubmitFlashcardAnswer = () => {
  const axiosInstance = axiosPrivateClient();

  const {
    mutateAsync: submitAnswer,
    isPending,
    data,
    isError,
    error,
  } = useMutation({
    mutationFn: (payload) =>
      flashcardsService.submitAnswer(axiosInstance, payload),
  });

  return {
    submitAnswer,
    isPending,
    data,
    isError,
    error,
  };
};
