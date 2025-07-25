import axios from "./axios";

// Retur Penjualan API
const ENDPOINT = "/retur-penjualan";

// Generic Retur Penjualan API functions
export const fetchReturPenjualan = async (params = {}) => {
  try {
    const queryString = new URLSearchParams(params).toString();
    const url = queryString ? `${ENDPOINT}/?${queryString}` : ENDPOINT;

    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching Retur Penjualan:", error);
    throw error;
  }
};

export const fetchReturPenjualanById = async (id) => {
  try {
    const response = await axios.get(`${ENDPOINT}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching Retur Penjualan by ID:", error);
    throw error;
  }
};

export const addReturPenjualan = async (data) => {
  try {
    const response = await axios.post(`${ENDPOINT}/`, data);
    return response.data;
  } catch (error) {
    console.error("Error adding Retur Penjualan:", error);
    throw error;
  }
};

export const updateReturPenjualan = async (id, data) => {
  try {
    const response = await axios.put(`${ENDPOINT}/${id}/`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating Retur Penjualan:", error);
    throw error;
  }
};

export const deleteReturPenjualan = async (id) => {
  try {
    const response = await axios.delete(`${ENDPOINT}/${id}/`);
    return response.data;
  } catch (error) {
    console.error("Error deleting Retur Penjualan:", error);
    throw error;
  }
};
