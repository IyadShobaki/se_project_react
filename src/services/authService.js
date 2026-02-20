/**
 * authService - Authentication API service
 *
 * Handles all authentication-related API calls:
 * - User registration (signup)
 * - User login (signin)
 * - Session restoration
 * - Current user fetching
 * - User profile updates
 * - Logout
 *
 * This service abstracts away the HTTP details and provides clean methods
 * for the rest of the app to use.
 */

import ApiClient from "../utils/apiClient";
import { tokenManager } from "../utils/tokenManager";

export const authService = {
  /**
   * Register a new user
   * Creates a new account on the backend
   * @param {string} baseUrl - Backend API base URL
   * @param {Object} userData - Registration data (email, password, name, etc.)
   * @returns {Promise<Object>} Server response
   */
  async signup(baseUrl, userData) {
    const apiClient = new ApiClient(baseUrl);
    return apiClient.post("/signup", userData);
  },

  /**
   * Sign in a user
   * Authenticates user with email and password
   * Stores JWT token on success
   * @param {string} baseUrl - Backend API base URL
   * @param {Object} credentials - Email and password
   * @returns {Promise<Object>} Server response containing token
   */
  async signin(baseUrl, credentials) {
    const apiClient = new ApiClient(baseUrl);
    const res = await apiClient.post("/signin", credentials);
    // Store token for future requests if signin was successful
    if (res && res.token) {
      tokenManager.set(res.token);
      apiClient.setToken(res.token);
    }
    return res;
  },

  /**
   * Get the currently logged-in user's data
   * Requires a valid JWT token to be stored
   * @param {string} baseUrl - Backend API base URL
   * @returns {Promise<Object|null>} User data if authenticated, null otherwise
   */
  async getCurrentUser(baseUrl) {
    // Check if we have a token
    const token = tokenManager.get();
    if (!token) return null;

    const apiClient = new ApiClient(baseUrl);
    apiClient.setToken(token);
    try {
      // Fetch user data from the protected endpoint
      return await apiClient.get("/users/me");
    } catch (err) {
      console.error("Failed to fetch current user:", err);
      // Clear invalid token
      tokenManager.remove();
      return null;
    }
  },

  /**
   * Update the current user's profile information
   * Requires authentication
   * @param {string} baseUrl - Backend API base URL
   * @param {Object} userData - Updated user data
   * @returns {Promise<Object>} Updated user data
   * @throws {Error} If not authenticated
   */
  async updateUser(baseUrl, userData) {
    const token = tokenManager.get();
    if (!token) throw new Error("No token found");

    const apiClient = new ApiClient(baseUrl);
    apiClient.setToken(token);
    // Send PATCH to update user data
    return apiClient.patch("/users/me", userData);
  },

  /**
   * Restore user session from stored token
   * Called on app load to check if user is still logged in
   * @param {string} baseUrl - Backend API base URL
   * @returns {Promise<Object|null>} User data if session is valid, null otherwise
   */
  async restoreSession(baseUrl) {
    // Check if we have a stored token
    const token = tokenManager.get();
    if (!token) return null;

    const apiClient = new ApiClient(baseUrl);
    apiClient.setToken(token);
    try {
      // Verify token is still valid by fetching user
      const user = await apiClient.get("/users/me");
      return user;
    } catch (err) {
      console.error("Failed to restore session:", err);
      // Token is invalid, remove it
      tokenManager.remove();
      return null;
    }
  },

  /**
   * Logout the current user
   * Clears the stored JWT token
   */
  logout() {
    tokenManager.remove();
  },
};
