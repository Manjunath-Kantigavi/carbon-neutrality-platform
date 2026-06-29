import api from "./axiosConfig";

// ─── Auth ───────────────────────────────────────────
export const registerUser = (data) => api.post("/auth/register", data);
export const loginUser    = (data) => api.post("/auth/login", data);

// ─── Mining Operations ──────────────────────────────
export const createMiningOperation = (data) => api.post("/operations/create", data);
export const getLatestOperation = () => api.get("/operations/latest");

// ─── Carbon Sinks ───────────────────────────────────
export const submitCarbonSinks = (data) => api.post("/sinks/submit", data);
export const getLatestCarbonSink = () => api.get("/sinks/latest");

// ─── Suggestions ────────────────────────────────────
export const getSuggestions = () => api.get("/suggestions/generate");

// ─── Visualization ──────────────────────────────────
export const getVisualizationData = () => api.get("/visualize/summary");

// ─── Emissions ──────────────────────────────────────
export const getLatestEmission = () => api.get("/emissions/latest");
export const getEmissionByOperation = (operationId) => api.get(`/emissions/by-operation/${operationId}`);
