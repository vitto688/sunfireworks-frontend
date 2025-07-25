import axios from "./axios";

// Surat Jalan API
const ENDPOINT = "/sj";

// Generic Surat Jalan API functions
export const fetchSuratJalan = async (params = {}) => {
  try {
    const queryString = new URLSearchParams(params).toString();
    const url = queryString ? `${ENDPOINT}/?${queryString}` : ENDPOINT;

    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching Surat Jalan:", error);
    throw error;
  }
};

export const fetchSuratJalanById = async (id) => {
  try {
    const response = await axios.get(`${ENDPOINT}/${id}/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching Surat Jalan by ID:", error);
    throw error;
  }
};

export const addSuratJalan = async (data) => {
  try {
    const response = await axios.post(`${ENDPOINT}/`, data);
    return response.data;
  } catch (error) {
    console.error("Error adding Surat Jalan:", error);
    throw error;
  }
};

export const updateSuratJalan = async (id, data) => {
  try {
    const response = await axios.put(`${ENDPOINT}/${id}/`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating Surat Jalan:", error);
    throw error;
  }
};

export const deleteSuratJalan = async (id) => {
  try {
    const response = await axios.delete(`${ENDPOINT}/${id}/`);
    return response.data;
  } catch (error) {
    console.error("Error deleting Surat Jalan:", error);
    throw error;
  }
};
