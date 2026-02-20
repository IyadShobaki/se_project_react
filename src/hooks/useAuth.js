/**
 * useAuth - Custom hook for managing user authentication
 *
 * Handles all authentication-related operations including:
 * - User login (signin)
 * - User registration (signup)
 * - Session restoration
 * - Profile updates
 * - Logout
 *
 * Stores authentication state including:
 * - isLoggedIn: whether user is currently authenticated
 * - currentUser: the logged-in user's data
 * - isLoading: whether an auth operation is in progress
 * - error: any error messages from auth operations
 */

import { useState, useCallback } from "react";
import { authService } from "../services/authService";

/**
 * useAuth hook factory
 * @param {string} baseUrl - The backend API base URL
 * @returns {Object} Auth state and methods
 */
export const useAuth = (baseUrl) => {
  // Track if user is logged in
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Store current logged-in user's data (id, name, email, etc.)
  const [currentUser, setCurrentUser] = useState(null);

  // Track loading state during async operations
  const [isLoading, setIsLoading] = useState(false);

  // Store any error messages that occur during auth operations
  const [error, setError] = useState(null);

  /**
   * Registers a new user
   * Creates a new account and automatically signs them in
   * @param {Object} credentials - Registration data (email, password, name, etc.)
   */
  const signup = useCallback(
    async (credentials) => {
      try {
        setIsLoading(true);
        setError(null);
        // Call the signup service
        await authService.signup(baseUrl, credentials);
        // Immediately sign in the new user
        await signin(credentials.email, credentials.password);
      } catch (err) {
        const errorMsg = err.message || "Signup failed";
        setError(errorMsg);
        console.error("Signup error:", err);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [baseUrl],
  );

  /**
   * Signs in a user with email and password
   * @param {string} email - User's email
   * @param {string} password - User's password
   * @returns {Promise<Object>} The logged-in user data
   */
  const signin = useCallback(
    async (email, password) => {
      try {
        setIsLoading(true);
        setError(null);
        // Call the signin service
        await authService.signin(baseUrl, { email, password });
        // Fetch and store the current user's data
        const { data: user } = await authService.getCurrentUser(baseUrl);
        if (user) {
          setCurrentUser(user);
          setIsLoggedIn(true);
        }
        return user;
      } catch (err) {
        const errorMsg = err.message || "Sign in failed";
        setError(errorMsg);
        console.error("Sign in error:", err);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [baseUrl],
  );

  /**
   * Restores user session from stored token (on app load)
   * Checks localStorage for JWT token and attempts to re-authenticate
   */
  const restoreSession = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      // Try to get current user using stored token
      const data = await authService.restoreSession(baseUrl);
      if (!data) {
        return;
      }
      const { data: user } = data;
      if (user) {
        setCurrentUser(user);
        setIsLoggedIn(true);
      }
    } catch (err) {
      console.error("Session restore error:", err);
      setError(err.message || "Failed to restore session");
    } finally {
      setIsLoading(false);
    }
  }, [baseUrl]);

  /**
   * Updates the logged-in user's profile information
   * @param {Object} updatedData - Updated user profile data
   * @returns {Promise<Object>} The updated user data
   */
  const updateProfile = useCallback(
    async (updatedData) => {
      try {
        setIsLoading(true);
        setError(null);
        // Call the update user service and store updated data
        const { data: updatedUser } = await authService.updateUser(
          baseUrl,
          updatedData,
        );
        setCurrentUser(updatedUser);
        return updatedUser;
      } catch (err) {
        const errorMsg = err.message || "Failed to update profile";
        setError(errorMsg);
        console.error("Update profile error:", err);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [baseUrl],
  );

  /**
   * Logs out the current user
   * Clears user data and token from localStorage
   */
  const logout = useCallback(() => {
    // Call logout service (clears token from localStorage)
    authService.logout();
    // Reset all state
    setIsLoggedIn(false);
    setCurrentUser(null);
    setError(null);
  }, []);

  // Return all auth state and methods
  return {
    isLoggedIn,
    currentUser,
    isLoading,
    error,
    signin,
    signup,
    logout,
    restoreSession,
    updateProfile,
  };
};
