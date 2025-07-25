import axios from "./axios";

// Simple SPK API
const ENDPOINT = "/spk";

// Generic SPK API functions
export const fetchSPK = async (params = {}) => {
  try {
    const queryString = new URLSearchParams(params).toString();
    const url = queryString ? `${ENDPOINT}/?${queryString}` : ENDPOINT;

    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching SPK:", error);
    throw error;
  }
};

export const fetchSPKById = async (id) => {
  try {
    const response = await axios.get(`${ENDPOINT}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching SPK by ID:", error);
    throw error;
  }
};

export const addSPK = async (data) => {
  try {
    const response = await axios.post(`${ENDPOINT}/`, data);
    return response.data;
  } catch (error) {
    console.error("Error adding SPK:", error);
    throw error;
  }
};

export const updateSPK = async (id, data) => {
  try {
    const response = await axios.put(`${ENDPOINT}/${id}/`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating SPK:", error);
    throw error;
  }
};

export const deleteSPK = async (id) => {
  try {
    const response = await axios.delete(`${ENDPOINT}/${id}/`);
    return response.data;
  } catch (error) {
    console.error("Error deleting SPK:", error);
    throw error;
  }
};

const spkAPI = {
  fetchSPK,
  fetchSPKById,
  addSPK,
  updateSPK,
  deleteSPK,
};

export default spkAPI;
