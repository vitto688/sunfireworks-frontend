import axios from "./axios";

// STB (Surat Terima Barang) API
const ENDPOINT = "/stb";

// Generic STB API functions
export const fetchSTB = async (params = {}) => {
  try {
    const queryString = new URLSearchParams(params).toString();
    const url = queryString ? `${ENDPOINT}/?${queryString}` : ENDPOINT;

    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching STB:", error);
    throw error;
  }
};

export const fetchSTBById = async (id) => {
  try {
    const response = await axios.get(`${ENDPOINT}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching STB by ID:", error);
    throw error;
  }
};

export const addSTB = async (data) => {
  try {
    const response = await axios.post(`${ENDPOINT}/`, data);
    return response.data;
  } catch (error) {
    console.error("Error adding STB:", error);
    throw error;
  }
};

export const updateSTB = async (id, data) => {
  try {
    const response = await axios.put(`${ENDPOINT}/${id}/`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating STB:", error);
    throw error;
  }
};

export const deleteSTB = async (id) => {
  try {
    const response = await axios.delete(`${ENDPOINT}/${id}/`);
    return response.data;
  } catch (error) {
    console.error("Error deleting STB:", error);
    throw error;
  }
};

const stbAPI = {
  fetchSTB,
  fetchSTBById,
  addSTB,
  updateSTB,
  deleteSTB,
};

export default stbAPI;
