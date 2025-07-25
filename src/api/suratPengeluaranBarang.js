import axios from "./axios";

// Surat Pengeluaran Barang API
const ENDPOINT = "/spb";

// Generic Surat Pengeluaran Barang API functions
export const fetchSuratPengeluaranBarang = async (params = {}) => {
  try {
    const queryString = new URLSearchParams(params).toString();
    const url = queryString ? `${ENDPOINT}/?${queryString}` : ENDPOINT;

    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching Surat Pengeluaran Barang:", error);
    throw error;
  }
};

export const fetchSuratPengeluaranBarangById = async (id) => {
  try {
    const response = await axios.get(`${ENDPOINT}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching Surat Pengeluaran Barang by ID:", error);
    throw error;
  }
};

export const addSuratPengeluaranBarang = async (data) => {
  try {
    const response = await axios.post(`${ENDPOINT}/`, data);
    return response.data;
  } catch (error) {
    console.error("Error adding Surat Pengeluaran Barang:", error);
    throw error;
  }
};

export const updateSuratPengeluaranBarang = async (id, data) => {
  try {
    const response = await axios.put(`${ENDPOINT}/${id}/`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating Surat Pengeluaran Barang:", error);
    throw error;
  }
};

export const deleteSuratPengeluaranBarang = async (id) => {
  try {
    const response = await axios.delete(`${ENDPOINT}/${id}/`);
    return response.data;
  } catch (error) {
    console.error("Error deleting Surat Pengeluaran Barang:", error);
    throw error;
  }
};
