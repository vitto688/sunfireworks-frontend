import axiosInstance from "./axios";

const customerAPI = {
  // Fetch all customers
  fetchCustomers: async () => {
    try {
      const response = await axiosInstance.get("/customers/");
      return response.data;
    } catch (error) {
      console.error("Error fetching customers:", error);
      throw error;
    }
  },

  // Fetch a single customer by ID
  fetchCustomerById: async (customerId) => {
    try {
      const response = await axiosInstance.get(`/customers/${customerId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching customer with ID ${customerId}:`, error);
      throw error;
    }
  },

  // Create a new customer
  createCustomer: async (customerData) => {
    try {
      const response = await axiosInstance.post("/customers/", customerData);
      return response.data;
    } catch (error) {
      console.error("Error creating customer:", error);
      throw error;
    }
  },

  // Update an existing customer
  updateCustomer: async (customerId, customerData) => {
    try {
      const response = await axiosInstance.put(
        `/customers/${customerId}/`,
        customerData
      );
      return response.data;
    } catch (error) {
      console.error(`Error updating customer with ID ${customerId}:`, error);
      throw error;
    }
  },

  // Delete a customer
  deleteCustomer: async (customerId) => {
    try {
      const response = await axiosInstance.delete(`/customers/${customerId}/`);
      return response;
    } catch (error) {
      console.error(`Error deleting customer with ID ${customerId}:`, error);
      throw error;
    }
  },
};

export default customerAPI;
