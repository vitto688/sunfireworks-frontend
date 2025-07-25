import axiosInstance from "./axios";
// import { warehousesData } from "../dummy_data/warehouse";

const warehouseAPI = {
  getWarehouses: async () => {
    try {
      const response = await axiosInstance.get("/warehouses/");
      return response.data;
    } catch (error) {
      console.error("Error fetching warehouses:", error);
      throw error;
    }
  },
  getWarehouseById: async (id) => {
    try {
      const response = await axiosInstance.get(`/warehouses/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching warehouse with id ${id}:`, error);
      throw error;
    }
  },
  createWarehouse: async (data) => {
    try {
      const response = await axiosInstance.post("/warehouses/", data);
      return response.data;
    } catch (error) {
      console.error("Error creating warehouse:", error);
      throw error;
    }
  },
  updateWarehouse: async (id, data) => {
    try {
      const response = await axiosInstance.put(`/warehouses/${id}/`, data);
      return response.data;
    } catch (error) {
      console.error(`Error updating warehouse with id ${id}:`, error);
      throw error;
    }
  },
  deleteWarehouse: async (id) => {
    try {
      const response = await axiosInstance.delete(`/warehouses/${id}/`);
      return response;
    } catch (error) {
      console.error(`Error deleting warehouse with id ${id}:`, error);
      throw error;
    }
  },
};

export default warehouseAPI;
