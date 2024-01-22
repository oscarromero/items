import { apiRequest } from "@/components/utils/httpUtils";

export const getItems = async () => apiRequest("/api/items", "GET");

export const searchItems = async (input) =>
  apiRequest("/api/items/" + input, "GET");

export const saveItem = async (item) => {
  const method = item.id > 0 ? "PUT" : "POST";
  apiRequest("/api/items", method, item);
};

export const deleteItem = async (itemId) =>
  apiRequest(`/api/items/${itemId}`, "DELETE");
