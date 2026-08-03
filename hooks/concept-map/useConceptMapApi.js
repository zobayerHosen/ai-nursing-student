import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosPrivateClient from "@/lib/axios.private.client";
import {
  getConceptMap,
  generateConceptMap,
  saveConceptMap,
} from "@/services/concept-map";

/**
 * Normalizes the raw API response into { title, nodes, edges }.
 * Mirrors the `normalizeMapObject()` logic from the HTML visualizer.
 */
function normalizeMapObject(raw) {
  if (!raw) return { title: "Clinical Concept Map", nodes: [], edges: [] };

  const data = raw?.data ?? raw;

  if (data.map && Array.isArray(data.map.nodes)) {
    return {
      title: data.map.title || "Clinical Concept Map",
      nodes: data.map.nodes || [],
      edges: data.map.edges || [],
    };
  }

  if (Array.isArray(data.nodes)) {
    return {
      title: data.title || "Clinical Concept Map",
      nodes: data.nodes || [],
      edges: data.edges || [],
    };
  }

  return { title: "Clinical Concept Map", nodes: [], edges: [] };
}

// ---------------------------------------------------------------------------
// GET  /concept-map/  — Fetch the saved concept map from the backend
// ---------------------------------------------------------------------------
export const useGetConceptMap = () => {
  const axiosInstance = axiosPrivateClient();

  const { data, isLoading, isError, isFetching, error, refetch } = useQuery({
    queryKey: ["concept-map"],
    queryFn: () => getConceptMap(axiosInstance),
    staleTime: 2 * 60 * 1000,
    retry: false,
  });

  return {
    mapData: data ? normalizeMapObject(data) : null,
    data,
    isLoading,
    isError,
    isFetching,
    error,
    refetch,
  };
};

// ---------------------------------------------------------------------------
// POST /concept-map/generate/  — AI-generate a concept map from a prompt
// ---------------------------------------------------------------------------
export const useGenerateConceptMap = () => {
  const axiosInstance = axiosPrivateClient();
  const queryClient = useQueryClient();

  const {
    mutateAsync: generate,
    isPending,
    data,
    isError,
    error,
  } = useMutation({
    mutationKey: ["concept-map-generate"],
    mutationFn: (payload) => generateConceptMap(axiosInstance, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["concept-map"] });
    },
  });

  return {
    generate,
    isPending,
    generatedMap: data ? normalizeMapObject(data) : null,
    data,
    isError,
    error,
  };
};

// ---------------------------------------------------------------------------
// PUT  /concept-map/  — Save (persist) the current concept map state
// ---------------------------------------------------------------------------
export const useSaveConceptMap = () => {
  const axiosInstance = axiosPrivateClient();
  const queryClient = useQueryClient();

  const {
    mutateAsync: save,
    isPending,
    data,
    isError,
    error,
  } = useMutation({
    mutationKey: ["concept-map-save"],
    mutationFn: (payload) => saveConceptMap(axiosInstance, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["concept-map"] });
    },
  });

  return {
    save,
    isPending,
    data,
    isError,
    error,
  };
};
