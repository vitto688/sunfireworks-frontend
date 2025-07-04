import axiosInstance from "./axios";

const mutasiMasukAPI = {
  getAllMutasiMasuk: async () => {
    try {
      const response = await axiosInstance.get("/mutasi-masuk/");
      return response.data;
    } catch (error) {
      console.error("Error fetching mutasi masuk:", error);
      throw error;
    }
  },

  getMutasiMasukById: async (id) => {
    try {
      const response = await axiosInstance.get(`/mutasi-masuk/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching mutasi masuk with id ${id}:`, error);
      throw error;
    }
  },

  createMutasiMasuk: async (mutasiMasukData) => {
    try {
      const response = await axiosInstance.post(
        "/mutasi-masuk/",
        mutasiMasukData
      );
      return response.data;
    } catch (error) {
      console.error("Error creating mutasi masuk:", error);
      throw error;
    }
  },

  updateMutasiMasuk: async (id, mutasiMasukData) => {
    try {
      const response = await axiosInstance.put(
        `/mutasi-masuk/${id}/`,
        mutasiMasukData
      );
      return response.data;
    } catch (error) {
      console.error(`Error updating mutasi masuk with id ${id}:`, error);
      throw error;
    }
  },

  deleteMutasiMasuk: async (id) => {
    try {
      const response = await axiosInstance.delete(`/mutasi-masuk/${id}`);
      return response;
    } catch (error) {
      console.error(`Error deleting mutasi masuk with id ${id}:`, error);
      throw error;
    }
  },

  getMutasiMasukByWarehouseId: async (warehouseId) => {
    try {
      const response = await axiosInstance.get(
        `/mutasi-masuk/by_warehouse/?warehouse_id=${warehouseId}`
      );
      return response.data;
    } catch (error) {
      console.error(
        `Error fetching mutasi masuk for warehouse with id ${warehouseId}:`,
        error
      );
      throw error;
    }
  },

  getMutasiMasukByProductId: async (productId) => {
    try {
      const response = await axiosInstance.get(
        `/mutasi-masuk/by_product/?product_id=${productId}`
      );
      return response.data;
    } catch (error) {
      console.error(
        `Error fetching mutasi masuk for product with id ${productId}:`,
        error
      );
      throw error;
    }
  },

  getMutasiMasukBySupplierId: async (supplierId) => {
    try {
      const response = await axiosInstance.get(
        `/mutasi-masuk/by_supplier/?supplier_id=${supplierId}`
      );
      return response.data;
    } catch (error) {
      console.error(
        `Error fetching mutasi masuk for supplier with id ${supplierId}:`,
        error
      );
      throw error;
    }
  },

  getMutasiMasukByDateRange: async (startDate, endDate) => {
    try {
      const response = await axiosInstance.get(
        `/mutasi-masuk/by_date_range/?start_date=${startDate}&end_date=${endDate}`
      );
      return response.data;
    } catch (error) {
      console.error(
        `Error fetching mutasi masuk for date range ${startDate} to ${endDate}:`,
        error
      );
      throw error;
    }
  },

  getMutasiMasukWithFilters: async (filters) => {
    try {
      const params = new URLSearchParams();

      if (filters.startDate) params.append("start_date", filters.startDate);
      if (filters.endDate) params.append("end_date", filters.endDate);
      if (filters.warehouseId && filters.warehouseId !== 0) {
        params.append("warehouse_id", filters.warehouseId);
      }
      if (filters.categoryId && filters.categoryId !== 0) {
        params.append("category_id", filters.categoryId);
      }
      if (filters.supplierId && filters.supplierId !== 0) {
        params.append("supplier_id", filters.supplierId);
      }
      if (filters.searchQuery) params.append("search", filters.searchQuery);

      const response = await axiosInstance.get(
        `/mutasi-masuk/filter/?${params.toString()}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching filtered mutasi masuk:", error);
      throw error;
    }
  },

  exportMutasiMasukData: async (filters, format = "excel") => {
    try {
      const params = new URLSearchParams();

      if (filters.startDate) params.append("start_date", filters.startDate);
      if (filters.endDate) params.append("end_date", filters.endDate);
      if (filters.warehouseId && filters.warehouseId !== 0) {
        params.append("warehouse_id", filters.warehouseId);
      }
      if (filters.categoryId && filters.categoryId !== 0) {
        params.append("category_id", filters.categoryId);
      }
      if (filters.supplierId && filters.supplierId !== 0) {
        params.append("supplier_id", filters.supplierId);
      }
      params.append("format", format);

      const response = await axiosInstance.get(
        `/mutasi-masuk/export/?${params.toString()}`,
        {
          responseType: "blob",
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error exporting mutasi masuk data:", error);
      throw error;
    }
  },
};

export default mutasiMasukAPI;
