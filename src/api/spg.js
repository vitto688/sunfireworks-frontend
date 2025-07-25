import axiosInstance from "./axios";

// SPG Import API
const spgImportAPI = {
  getAllSPGImport: async (params = {}) => {
    try {
      const response = await axiosInstance.get("/spg/import/", { params });
      return response.data;
    } catch (error) {
      console.error("Error fetching SPG import:", error);
      throw error;
    }
  },

  getSPGImportById: async (id) => {
    try {
      const response = await axiosInstance.get(`/spg/import/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching SPG import with id ${id}:`, error);
      throw error;
    }
  },

  createSPGImport: async (data) => {
    try {
      const response = await axiosInstance.post("/spg/import/", data);
      return response.data;
    } catch (error) {
      console.error("Error creating SPG import:", error);
      throw error;
    }
  },

  updateSPGImport: async (id, data) => {
    try {
      const response = await axiosInstance.put(`/spg/import/${id}/`, data);
      return response.data;
    } catch (error) {
      console.error(`Error updating SPG import with id ${id}:`, error);
      throw error;
    }
  },

  deleteSPGImport: async (id) => {
    try {
      const response = await axiosInstance.delete(`/spg/import/${id}/`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting SPG import with id ${id}:`, error);
      throw error;
    }
  },
};

// SPG Bawang API
const spgBawangAPI = {
  getAllSPGBawang: async (params = {}) => {
    try {
      const response = await axiosInstance.get("/spg/bawang/", { params });
      return response.data;
    } catch (error) {
      console.error("Error fetching SPG bawang:", error);
      throw error;
    }
  },

  getSPGBawangById: async (id) => {
    try {
      const response = await axiosInstance.get(`/spg/bawang/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching SPG bawang with id ${id}:`, error);
      throw error;
    }
  },

  createSPGBawang: async (data) => {
    try {
      const response = await axiosInstance.post("/spg/bawang/", data);
      return response.data;
    } catch (error) {
      console.error("Error creating SPG bawang:", error);
      throw error;
    }
  },

  updateSPGBawang: async (id, data) => {
    try {
      const response = await axiosInstance.put(`/spg/bawang/${id}/`, data);
      return response.data;
    } catch (error) {
      console.error(`Error updating SPG bawang with id ${id}:`, error);
      throw error;
    }
  },

  deleteSPGBawang: async (id) => {
    try {
      const response = await axiosInstance.delete(`/spg/bawang/${id}/`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting SPG bawang with id ${id}:`, error);
      throw error;
    }
  },
};

// SPG Kawat API
const spgKawatAPI = {
  getAllSPGKawat: async (params = {}) => {
    try {
      const response = await axiosInstance.get("/spg/kawat/", { params });
      return response.data;
    } catch (error) {
      console.error("Error fetching SPG kawat:", error);
      throw error;
    }
  },

  getSPGKawatById: async (id) => {
    try {
      const response = await axiosInstance.get(`/spg/kawat/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching SPG kawat with id ${id}:`, error);
      throw error;
    }
  },

  createSPGKawat: async (data) => {
    try {
      const response = await axiosInstance.post("/spg/kawat/", data);
      return response.data;
    } catch (error) {
      console.error("Error creating SPG kawat:", error);
      throw error;
    }
  },

  updateSPGKawat: async (id, data) => {
    try {
      const response = await axiosInstance.put(`/spg/kawat/${id}/`, data);
      return response.data;
    } catch (error) {
      console.error(`Error updating SPG kawat with id ${id}:`, error);
      throw error;
    }
  },

  deleteSPGKawat: async (id) => {
    try {
      const response = await axiosInstance.delete(`/spg/kawat/${id}/`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting SPG kawat with id ${id}:`, error);
      throw error;
    }
  },
};

// SPG Lain API
const spgLainAPI = {
  getAllSPGLain: async (params = {}) => {
    try {
      const response = await axiosInstance.get("/spg/lain-lain/", { params });
      return response.data;
    } catch (error) {
      console.error("Error fetching SPG lain:", error);
      throw error;
    }
  },

  getSPGLainById: async (id) => {
    try {
      const response = await axiosInstance.get(`/spg/lain-lain/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching SPG lain with id ${id}:`, error);
      throw error;
    }
  },

  createSPGLain: async (data) => {
    try {
      const response = await axiosInstance.post("/spg/lain-lain/", data);
      return response.data;
    } catch (error) {
      console.error("Error creating SPG lain:", error);
      throw error;
    }
  },

  updateSPGLain: async (id, data) => {
    try {
      const response = await axiosInstance.put(`/spg/lain-lain/${id}/`, data);
      return response.data;
    } catch (error) {
      console.error(`Error updating SPG lain with id ${id}:`, error);
      throw error;
    }
  },

  deleteSPGLain: async (id) => {
    try {
      const response = await axiosInstance.delete(`/spg/lain-lain/${id}/`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting SPG lain with id ${id}:`, error);
      throw error;
    }
  },
};

// Export individual APIs
export { spgImportAPI, spgBawangAPI, spgKawatAPI, spgLainAPI };

// Export default untuk backward compatibility
const spgAPI = {
  import: spgImportAPI,
  bawang: spgBawangAPI,
  kawat: spgKawatAPI,
  lain: spgLainAPI,
};

export default spgAPI;
