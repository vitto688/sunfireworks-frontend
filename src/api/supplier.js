import axiosInstance from "./axios";

const supplierAPI = {
  getSuppliers: async () => {
    try {
      const response = await axiosInstance.get("/suppliers");
      return response.data;
    } catch (error) {
      console.error("Error fetching suppliers:", error);
      throw error;
    }
  },

  createSupplier: async (supplierData) => {
    try {
      const response = await axiosInstance.post("/suppliers/", supplierData);
      return response.data;
    } catch (error) {
      console.error("Error creating supplier:", error);
      throw error;
    }
  },

  updateSupplier: async (id, supplierData) => {
    try {
      const response = await axiosInstance.put(
        `/suppliers/${id}/`,
        supplierData
      );
      return response.data;
    } catch (error) {
      console.error("Error updating supplier:", error);
      throw error;
    }
  },

  deleteSupplier: async (id) => {
    try {
      const response = await axiosInstance.delete(`/suppliers/${id}/`);
      return response;
    } catch (error) {
      console.error("Error deleting supplier:", error);
      throw error;
    }
  },
};

export default supplierAPI;
