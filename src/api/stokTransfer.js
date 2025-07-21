import axios from "./axios";

// Simple StokTransfer API
const ENDPOINT = "/stock-transfers";

// Generic StokTransfer API functions
export const fetchStokTransfer = async (params = {}) => {
  try {
    const queryString = new URLSearchParams(params).toString();
    const url = queryString ? `/${ENDPOINT}?${queryString}` : ENDPOINT;

    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching stok transfer:", error);
    throw error;
  }
};

export const fetchStokTransferById = async (id) => {
  try {
    const response = await axios.get(`${ENDPOINT}/${id}/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching stok transfer by ID:", error);
    throw error;
  }
};

export const addStokTransfer = async (data) => {
  try {
    const response = await axios.post(`${ENDPOINT}/`, data);
    return response.data;
  } catch (error) {
    console.error("Error adding stok transfer:", error);
    throw error;
  }
};

export const updateStokTransfer = async (id, data) => {
  try {
    const response = await axios.put(`${ENDPOINT}/${id}/`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating stok transfer:", error);
    throw error;
  }
};

export const deleteStokTransfer = async (id) => {
  try {
    const response = await axios.delete(`${ENDPOINT}/${id}/`);
    return response.data;
  } catch (error) {
    console.error("Error deleting stok transfer:", error);
    throw error;
  }
};
