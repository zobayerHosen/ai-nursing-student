/**
 * Concept Map API Service
 *
 * Single-map endpoints (concept-map — singular):
 *   1. GET  /concept-map/           → load the active/saved concept map
 *   2. POST /concept-map/generate/  → AI-generate map from clinical prompt
 *   3. PUT  /concept-map/           → save current map state / rename
 *
 * Multi-map / history endpoints (concept-maps — plural):
 *   4. GET    /concept-maps/            → list all user maps (My Maps)
 *   5. POST   /concept-maps/{id}/select → select & load a map from history
 *   6. POST   /concept-maps/            → create a new empty map
 *   7. DELETE /concept-maps/{id}/       → delete a specific map
 *   8. DELETE /concept-maps/clear/      → delete all maps
 *   9. POST   /concept-maps/import/     → import a map from JSON
 */

// ---------------------------------------------------------------------------
// 1. GET /concept-map/  — Load the active/saved concept map
// ---------------------------------------------------------------------------
export const getConceptMap = async (axiosInstance) => {
  const response = await axiosInstance.get("/concept-map/");
  return response?.data;
};

// ---------------------------------------------------------------------------
// 2. POST /concept-map/generate/  — AI-generate from prompt (supports file attachments)
// ---------------------------------------------------------------------------
export const generateConceptMap = async (axiosInstance, data) => {
  // When data is FormData (file attached), let axios set the multipart boundary
  const config = data instanceof FormData
    ? { headers: { "Content-Type": "multipart/form-data" } }
    : {};
  const response = await axiosInstance.post("/concept-map/generate/", data, config);
  return response?.data;
};

// ---------------------------------------------------------------------------
// 3. PUT /concept-map/  — Save current canvas state (also used for rename)
// ---------------------------------------------------------------------------
export const saveConceptMap = async (axiosInstance, data) => {
  const response = await axiosInstance.put("/concept-map/", data);
  return response?.data;
};

// ---------------------------------------------------------------------------
// 4. GET /concept-maps/  — List all user's concept maps (My Maps / History)
// ---------------------------------------------------------------------------
export const getConceptMaps = async (axiosInstance) => {
  const response = await axiosInstance.get("/concept-maps/");
  return response?.data;
};

// ---------------------------------------------------------------------------
// 5. POST /concept-maps/{id}/select/  — Select & load a map from history
// ---------------------------------------------------------------------------
export const selectConceptMap = async (axiosInstance, mapId) => {
  const response = await axiosInstance.post(`/concept-maps/${mapId}/select/`);
  return response?.data;
};

// ---------------------------------------------------------------------------
// 6. POST /concept-maps/  — Create a new empty concept map
// ---------------------------------------------------------------------------
export const createConceptMap = async (axiosInstance, data) => {
  const response = await axiosInstance.post("/concept-maps/", data);
  return response?.data;
};

// ---------------------------------------------------------------------------
// 7. DELETE /concept-maps/{id}/  — Delete a specific map
// ---------------------------------------------------------------------------
export const deleteConceptMap = async (axiosInstance, mapId) => {
  const response = await axiosInstance.delete(`/concept-maps/${mapId}/`);
  return response?.data;
};

// ---------------------------------------------------------------------------
// 8. DELETE /concept-maps/clear/  — Delete all user maps
// ---------------------------------------------------------------------------
export const clearAllConceptMaps = async (axiosInstance) => {
  const response = await axiosInstance.delete("/concept-maps/clear/");
  return response?.data;
};

// ---------------------------------------------------------------------------
// 9. POST /concept-maps/import/  — Import a concept map from JSON
// ---------------------------------------------------------------------------
export const importConceptMap = async (axiosInstance, data) => {
  const response = await axiosInstance.post("/concept-maps/import/", data);
  return response?.data;
};
