import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosPrivateClient from "@/lib/axios.private.client";
import {
  getConceptMap,
  generateConceptMap,
  saveConceptMap,
  getConceptMaps,
  selectConceptMap,
  createConceptMap,
  deleteConceptMap,
  clearAllConceptMaps,
  importConceptMap,
} from "@/services/concept-map";

/**
 * Normalizes the raw API response into { id, title, nodes, edges }.
 * Mirrors the `normalizeMapObject()` logic from the HTML visualizer.
 */
function normalizeMapObject(raw) {
  if (!raw) return { id: null, title: "Clinical Concept Map", nodes: [], edges: [] };

  const data = raw?.data ?? raw;

  if (data.map && Array.isArray(data.map.nodes)) {
    return {
      id: data.map.id || null,
      title: data.map.title || "Clinical Concept Map",
      nodes: data.map.nodes || [],
      edges: data.map.edges || [],
    };
  }

  if (Array.isArray(data.nodes)) {
    return {
      id: data.id || null,
      title: data.title || "Clinical Concept Map",
      nodes: data.nodes || [],
      edges: data.edges || [],
    };
  }

  return { id: null, title: "Clinical Concept Map", nodes: [], edges: [] };
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
// PUT  /concept-map/  — Save (persist) the current concept map state / rename
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
      queryClient.invalidateQueries({ queryKey: ["concept-maps"] });
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

// ═══════════════════════════════════════════════════════════════════════════
// My Maps / History hooks (concept-maps — plural)
// ═══════════════════════════════════════════════════════════════════════════

// ---------------------------------------------------------------------------
// GET /concept-maps/  — List all user's concept maps
// ---------------------------------------------------------------------------
export const useGetConceptMaps = () => {
  const axiosInstance = axiosPrivateClient();

  const { data, isLoading, isError, isFetching, error, refetch } = useQuery({
    queryKey: ["concept-maps"],
    queryFn: () => getConceptMaps(axiosInstance),
    staleTime: 60 * 1000,
    retry: false,
  });

  // Normalize response: { maps: [], total_maps, total_nodes }
  const payload = data?.data ?? data;

  return {
    maps: payload?.maps || [],
    totalMaps: payload?.total_maps || 0,
    totalNodes: payload?.total_nodes || 0,
    isLoading,
    isError,
    isFetching,
    error,
    refetch,
  };
};

// ---------------------------------------------------------------------------
// POST /concept-maps/{id}/select/  — Select & load a map from history
// ---------------------------------------------------------------------------
export const useSelectConceptMap = () => {
  const axiosInstance = axiosPrivateClient();
  const queryClient = useQueryClient();

  const {
    mutateAsync: selectMap,
    isPending,
    data,
    isError,
    error,
  } = useMutation({
    mutationKey: ["concept-map-select"],
    mutationFn: (mapId) => selectConceptMap(axiosInstance, mapId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["concept-map"] });
      queryClient.invalidateQueries({ queryKey: ["concept-maps"] });
    },
  });

  return {
    selectMap,
    isPending,
    selectedMap: data ? normalizeMapObject(data) : null,
    data,
    isError,
    error,
  };
};

// ---------------------------------------------------------------------------
// POST /concept-maps/  — Create a new empty concept map
// ---------------------------------------------------------------------------
export const useCreateConceptMap = () => {
  const axiosInstance = axiosPrivateClient();
  const queryClient = useQueryClient();

  const {
    mutateAsync: createMap,
    isPending,
    data,
    isError,
    error,
  } = useMutation({
    mutationKey: ["concept-map-create"],
    mutationFn: (payload) => createConceptMap(axiosInstance, payload || { title: "Untitled Concept Map" }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["concept-map"] });
      queryClient.invalidateQueries({ queryKey: ["concept-maps"] });
    },
  });

  return {
    createMap,
    isPending,
    createdMap: data ? normalizeMapObject(data) : null,
    data,
    isError,
    error,
  };
};

// ---------------------------------------------------------------------------
// DELETE /concept-maps/{id}/  — Delete a specific map
// ---------------------------------------------------------------------------
export const useDeleteConceptMap = () => {
  const axiosInstance = axiosPrivateClient();
  const queryClient = useQueryClient();

  const {
    mutateAsync: deleteMap,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationKey: ["concept-map-delete"],
    mutationFn: (mapId) => deleteConceptMap(axiosInstance, mapId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["concept-map"] });
      queryClient.invalidateQueries({ queryKey: ["concept-maps"] });
    },
  });

  return {
    deleteMap,
    isPending,
    isError,
    error,
  };
};

// ---------------------------------------------------------------------------
// DELETE /concept-maps/clear/  — Delete all maps
// ---------------------------------------------------------------------------
export const useClearAllConceptMaps = () => {
  const axiosInstance = axiosPrivateClient();
  const queryClient = useQueryClient();

  const {
    mutateAsync: clearAll,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationKey: ["concept-maps-clear"],
    mutationFn: () => clearAllConceptMaps(axiosInstance),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["concept-map"] });
      queryClient.invalidateQueries({ queryKey: ["concept-maps"] });
    },
  });

  return {
    clearAll,
    isPending,
    isError,
    error,
  };
};

// ---------------------------------------------------------------------------
// POST /concept-maps/import/  — Import a concept map from JSON file
// ---------------------------------------------------------------------------
export const useImportConceptMap = () => {
  const axiosInstance = axiosPrivateClient();
  const queryClient = useQueryClient();

  const {
    mutateAsync: importMap,
    isPending,
    data,
    isError,
    error,
  } = useMutation({
    mutationKey: ["concept-map-import"],
    mutationFn: (payload) => importConceptMap(axiosInstance, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["concept-map"] });
      queryClient.invalidateQueries({ queryKey: ["concept-maps"] });
    },
  });

  return {
    importMap,
    isPending,
    importedMap: data ? normalizeMapObject(data) : null,
    data,
    isError,
    error,
  };
};

