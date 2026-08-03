/**
 * Concept Map API Service
 *
 * Mirrors the three API calls from the HTML concept_map_visualizer:
 *   1. GET  /concept-map/         → load saved concept map
 *   2. POST /concept-map/generate → generate map from clinical prompt
 *   3. PUT  /concept-map/         → save current map state
 */

// ---------------------------------------------------------------------------
// API Call 1: GET /concept-map/  — Load saved concept map
// ---------------------------------------------------------------------------
export const getConceptMap = async (axiosInstance) => {
  const response = await axiosInstance.get("/concept-map/");
  return response?.data;
};

// ---------------------------------------------------------------------------
// API Call 2: POST /concept-map/generate/  — AI-generate from prompt
// ---------------------------------------------------------------------------
export const generateConceptMap = async (axiosInstance, data) => {
  const response = await axiosInstance.post("/concept-map/generate/", data);
  return response?.data;
};

// ---------------------------------------------------------------------------
// API Call 3: PUT /concept-map/  — Save current canvas state
// ---------------------------------------------------------------------------
export const saveConceptMap = async (axiosInstance, data) => {
  const response = await axiosInstance.put("/concept-map/", data);
  return response?.data;
};
