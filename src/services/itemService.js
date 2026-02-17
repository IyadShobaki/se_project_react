/**
 * itemService - Clothing items API service
 *
 * Handles all operations related to clothing items:
 * - Fetching all items
 * - Creating new items
 * - Deleting items
 *
 * This service abstracts the HTTP details and provides clean methods
 * for managing clothing items in the wardrobe.
 */

import ApiClient from "../utils/apiClient";
import { tokenManager } from "../utils/tokenManager";

export const itemService = {
  /**
   * Fetch all clothing items
   * No authentication required for viewing items
   * @param {string} baseUrl - Backend API base URL
   * @returns {Promise<Object>} Server response with items array
   */
  async getItems(baseUrl) {
    const apiClient = new ApiClient(baseUrl);
    return apiClient.get("/items");
  },

  /**
   * Create a new clothing item
   * Requires authentication
   * @param {string} baseUrl - Backend API base URL
   * @param {Object} inputValues - Item data (name, weather, imageUrl, etc.)
   * @returns {Promise<Object>} Created item data with ID
   * @throws {Error} If not authenticated
   */
  async addItem(baseUrl, inputValues) {
    // Check if user is authenticated
    const token = tokenManager.get();
    if (!token) throw new Error("No token found");

    const apiClient = new ApiClient(baseUrl);
    apiClient.setToken(token);
    // Send POST request to create new item
    return apiClient.post("/items", inputValues);
  },

  /**
   * Delete a clothing item
   * Requires authentication
   * User can only delete items they created
   * @param {string} baseUrl - Backend API base URL
   * @param {string} itemId - The ID of the item to delete
   * @returns {Promise<Object>} Server response
   * @throws {Error} If not authenticated
   */
  async deleteItem(baseUrl, itemId) {
    // Check if user is authenticated
    const token = tokenManager.get();
    if (!token) throw new Error("No token found");

    const apiClient = new ApiClient(baseUrl);
    apiClient.setToken(token);
    // Send DELETE request to remove the item
    return apiClient.delete(`/items/${itemId}`);
  },
};
