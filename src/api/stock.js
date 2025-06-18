import axiosInstance from "./axios";

const stockAPI = {
  getAllStocks: async () => {
    try {
      const response = await axiosInstance.get("/stocks/");
      return response.data;
    } catch (error) {
      console.error("Error fetching stocks:", error);
      throw error;
    }
  },

  getStockById: async (id) => {
    try {
      const response = await axiosInstance.get(`/stocks/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching stock with id ${id}:`, error);
      throw error;
    }
  },

  getStockByWarehouseId: async (warehouseId) => {
    try {
      const response = await axiosInstance.get(
        `/stocks/by_warehouse/?warehouse_id=${warehouseId}`
      );
      return response.data;
    } catch (error) {
      console.error(
        `Error fetching stocks for warehouse with id ${warehouseId}:`,
        error
      );
      throw error;
    }
  },
  getStockByProductId: async (productId) => {
    try {
      const response = await axiosInstance.get(
        `/stocks/by_product/?product_id=${productId}`
      );
      return response.data;
    } catch (error) {
      console.error(
        `Error fetching stocks for product with id ${productId}:`,
        error
      );
      throw error;
    }
  },

  updateStock: async (id, stockData) => {
    try {
      const response = await axiosInstance.put(`/stocks/${id}/`, stockData);
      return response.data;
    } catch (error) {
      console.error(`Error updating stock with id ${id}:`, error);
      throw error;
    }
  },
};

export default stockAPI;
