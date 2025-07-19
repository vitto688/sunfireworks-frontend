import axios from "./axios";

// Retur Pembelian API
const ENDPOINT = "/retur-pembelian";

// Generic Retur Pembelian API functions
export const fetchReturPembelian = async (params = {}) => {
  try {
    const queryString = new URLSearchParams(params).toString();
    const url = queryString ? `/${ENDPOINT}?${queryString}` : ENDPOINT;

    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching Retur Pembelian:", error);
    throw error;
  }
};

export const fetchReturPembelianById = async (id) => {
  try {
    const response = await axios.get(`${ENDPOINT}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching Retur Pembelian by ID:", error);
    throw error;
  }
};

export const addReturPembelian = async (data) => {
  try {
    const response = await axios.post(`${ENDPOINT}/`, data);
    return response.data;
  } catch (error) {
    console.error("Error adding Retur Pembelian:", error);
    throw error;
  }
};

export const updateReturPembelian = async (id, data) => {
  try {
    const response = await axios.put(`${ENDPOINT}/${id}/`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating Retur Pembelian:", error);
    throw error;
  }
};

export const deleteReturPembelian = async (id) => {
  try {
    const response = await axios.delete(`${ENDPOINT}/${id}/`);
    return response.data;
  } catch (error) {
    console.error("Error deleting Retur Pembelian:", error);
    throw error;
  }
};
