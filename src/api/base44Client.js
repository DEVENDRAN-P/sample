import axios from "axios";

const API_BASE_URL = "https://api.lowpricetracker.base44.app";

const client = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const base44 = {
  auth: {
    me: async () => {
      try {
        const response = await client.get("/auth/me");
        return response.data;
      } catch (error) {
        console.error("Failed to fetch user:", error);
        return null;
      }
    },
  },
  search: {
    products: async (query, location) => {
      try {
        const response = await client.get("/search/products", {
          params: { query, ...location },
        });
        return response.data;
      } catch (error) {
        console.error("Failed to search products:", error);
        return [];
      }
    },
  },
};
