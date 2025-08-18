import axiosInstance from "./axios";

const stockAdjustmentAPI = {
  getAllStockAdjustments: async (params = {}) => {
    try {
      const response = await axiosInstance.get("/stock-adjustments/", {
        params,
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching stock adjustments:", error);
      throw error;
    }
  },

  getStockAdjustmentById: async (id) => {
    try {
      const response = await axiosInstance.get(`/stock-adjustments/${id}/`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching stock adjustment with id ${id}:`, error);
      throw error;
    }
  },

  createStockAdjustment: async (stockAdjustmentData) => {
    try {
      const response = await axiosInstance.post(
        "/stock-adjustments/",
        stockAdjustmentData
      );
      return response.data;
    } catch (error) {
      console.error("Error creating stock adjustment:", error);
      throw error;
    }
  },

  updateStockAdjustment: async (id, stockAdjustmentData) => {
    try {
      const response = await axiosInstance.put(
        `/stock-adjustments/${id}/`,
        stockAdjustmentData
      );
      return response.data;
    } catch (error) {
      console.error(`Error updating stock adjustment with id ${id}:`, error);
      throw error;
    }
  },

  deleteStockAdjustment: async (id) => {
    try {
      const response = await axiosInstance.delete(`/stock-adjustments/${id}/`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting stock adjustment with id ${id}:`, error);
      throw error;
    }
  },
};

export default stockAdjustmentAPI;
