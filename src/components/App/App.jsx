/**
 * App.jsx - Main application component
 *
 * This is the root component that orchestrates the entire application.
 * It manages:
 * - User authentication state (login, logout, session)
 * - Modal state (which modal is open, selected item)
 * - Clothing items list
 * - Weather data and temperature unit preference
 * - Routes and page navigation
 * - Context providers for global state
 */

import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";

import ItemModal from "../ItemModal/ItemModal";
import { filterWeatherData, getWeather } from "../../utils/weatherApi";
import {
  apiKey,
  defaultCoordinates,
  itemsBaseUrl,
} from "../../utils/constants";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import AddItemModal from "../AddItemModal/AddItemModal";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import UpdateProfileModal from "../UpdateProfileModal/UpdateProfileModal";
import Profile from "../Profile/Profile";
import ConfirmationModal from "../ConfirmationModal/ConfirmationModal";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { useAuth } from "../../hooks/useAuth";
import { useModal } from "../../hooks/useModal";
import { itemService } from "../../services/itemService";

function App() {
  // State for clothing items list
  const [clothingItems, setClothingItems] = useState([]);

  // State for weather data (temperature, condition, day/night, etc.)
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
    condition: "",
    isDay: false,
  });

  // State for temperature unit preference (F or C)
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  // Custom hook for managing authentication (login, logout, user data, loading)
  const auth = useAuth(itemsBaseUrl);

  // Custom hook for managing modal state (open, close, selection)
  const modal = useModal();

  /**
   * Toggles between Fahrenheit and Celsius temperature units
   */
  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  /**
   * Opens the item preview modal with the selected card
   * @param {Object} card - The clothing item to display
   */
  const handleCardClick = (card) => {
    modal.openModal("preview", card);
  };

  /**
   * Opens the modal for adding a new clothing item
   */
  const handleAddClick = () => {
    modal.openModal("add-garment");
  };

  /**
   * Opens the login modal
   */
  const handleLoginClick = () => {
    modal.openModal("login");
  };

  /**
   * Opens the registration modal
   */
  const handleRegisterClick = () => {
    modal.openModal("register");
  };

  /**
   * Navigates from login modal to registration modal
   */
  const handleLoginNavigateRegister = () => {
    modal.openModal("register");
  };

  /**
   * Navigates from registration modal back to login modal
   */
  const handleRegisterNavigateLogin = () => {
    modal.openModal("login");
  };

  /**
   * Handles user login
   * Attempts to sign in with provided credentials, then closes the modal on success
   * @param {Object} credentials - Email and password
   */
  const handleLogin = async (credentials) => {
    try {
      await auth.signin(credentials.email, credentials.password);
      modal.closeModal();
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  /**
   * Handles user registration
   * Creates new account and automatically signs them in
   * @param {Object} credentials - User registration data (email, password, name, etc.)
   */
  const handleRegister = async (credentials) => {
    try {
      await auth.signup(credentials);
      modal.closeModal();
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  /**
   * Handles user profile update
   * Updates user information and closes the modal
   * @param {Object} updatedData - Updated user data
   */
  const handleUpdateProfile = async (updatedData) => {
    try {
      await auth.updateProfile(updatedData);
      return;
    } catch (err) {
      console.error("Failed to update profile:", err);
      throw err;
    }
  };

  /**
   * Initiates item deletion by opening a confirmation modal
   * @param {string} itemId - The ID of the item to delete
   */
  const handleDeleteItem = (itemId) => {
    modal.setItemToDelete(itemId);
    modal.openModal("confirm-deleting");
  };

  /**
   * Confirms and executes item deletion
   * Removes item from backend and updates local state
   */
  const handleConfirmDeleteItem = () => {
    if (modal.selectedItemId === -1) return;
    itemService
      .deleteItem(itemsBaseUrl, modal.selectedItemId)
      .then(() => {
        // Filter out the deleted item from the items list
        const newClothingItems = clothingItems.filter((item) => {
          return item._id !== modal.selectedItemId;
        });
        setClothingItems(newClothingItems);
        modal.closeModal();
      })
      .catch(console.error)
      .finally(() => modal.clearItemToDelete());
  };

  /**
   * Cancels item deletion and closes the confirmation modal
   */
  const handleCancelDeleteItem = () => {
    modal.clearItemToDelete();
    modal.closeModal();
  };

  /**
   * Handles adding a new clothing item
   * Sends item data to backend and updates the items list
   * @param {Object} inputValues - The new clothing item data
   */
  const handleAddItem = async (inputValues) => {
    try {
      const data = await itemService.addItem(itemsBaseUrl, inputValues);
      // Add new item to the beginning of the list
      setClothingItems([data, ...clothingItems]);
      modal.closeModal();
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  /**
   * Effect: Restore user session on app mount
   * Checks if there's a stored token and attempts to restore the previous session
   */
  useEffect(() => {
    auth.restoreSession();
  }, []);

  /**
   * Effect: Fetch weather data and clothing items on app mount
   * - Gets user's geolocation or uses default coordinates
   * - Fetches weather data based on coordinates
   * - Loads all available clothing items
   */
  useEffect(() => {
    /**
     * Fetches weather data for the given coordinates
     * @param {Object} coords - Latitude and longitude
     */
    const fetchWeather = async (coords) => {
      try {
        const data = await getWeather(coords, apiKey);
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      } catch (err) {
        console.error(err);
      }
    };

    /**
     * Gets user's geolocation or returns default coordinates
     * @returns {Promise<Object>} Latitude and longitude
     */
    const resolveGeolocation = () =>
      new Promise((resolve) => {
        if (!navigator.geolocation) {
          // Browser doesn't support geolocation, use default
          resolve(defaultCoordinates);
          return;
        }
        navigator.geolocation.getCurrentPosition(
          (pos) =>
            resolve({
              latitude: pos.coords.latitude,
              longitude: pos.coords.longitude,
            }),
          (err) => {
            console.warn("Geolocation failed, using default coords", err);
            resolve(defaultCoordinates);
          },
          { enableHighAccuracy: true, timeout: 30000, maximumAge: 600000 },
        );
      });

    // Get coordinates and fetch weather for those coordinates
    resolveGeolocation().then((coords) => {
      fetchWeather(coords);
    });

    // Fetch all clothing items from the backend
    itemService
      .getItems(itemsBaseUrl)
      .then(({ data }) => {
        // Reverse the order to show newest items first
        setClothingItems(data.reverse());
      })
      .catch(console.error);
  }, []);

  /**
   * Effect: Handle keyboard and overlay modal interaction
   * - Close modal when ESC key is pressed
   * - Close modal when clicking outside (on the overlay)
   * - Add shake animation to disabled submit button
   *
   * Only runs when the active modal changes to avoid stale event listeners
   */
  useEffect(() => {
    if (!modal.activeModal) return;

    /**
     * Handler for ESC key press - closes the current modal
     */
    const handleEscClose = (evt) => {
      if (evt.key === "Escape") {
        modal.closeModal();
      }
    };

    /**
     * Handler for clicks on modal overlay or disabled button
     * - Closes modal if clicking on the overlay background
     * - Adds shake animation to disabled buttons
     */
    const handleOverlay = (evt) => {
      if (!evt || !evt.target) return;

      try {
        // Close modal if clicking on the modal background
        if (evt.target.classList && evt.target.classList.contains("modal")) {
          modal.closeModal();
        }
        // Add shake animation if clicking a disabled button
        if (
          evt.target.classList &&
          evt.target.classList.contains("modal__submit-btn_disabled")
        ) {
          evt.target.classList.add("shake");
          // Store reference to the target element to avoid stale closure
          const targetElement = evt.target;
          setTimeout(() => {
            // Check if the element still exists in the DOM before accessing it
            if (
              targetElement &&
              targetElement.parentNode &&
              targetElement.classList
            ) {
              targetElement.classList.remove("shake");
            }
          }, 1000);
        }
      } catch (err) {
        console.error("Error handling overlay event:", err);
      }
    };

    // Attach keyboard event listener
    document.addEventListener("keydown", handleEscClose);
    // Attach mouse event listener
    document.addEventListener("mousedown", handleOverlay);

    // Cleanup: Remove event listeners when modal closes or component unmounts
    return () => {
      document.removeEventListener("keydown", handleEscClose);
      document.removeEventListener("mousedown", handleOverlay);
    };
  }, [modal.activeModal]);

  return (
    <CurrentUserContext.Provider value={{ currentUser: auth.currentUser }}>
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="page">
          <div className="page__content">
            <Header
              handleAddClick={handleAddClick}
              handleLoginClick={handleLoginClick}
              handleRegisterClick={handleRegisterClick}
              weatherData={weatherData}
              isLoggedIn={auth.isLoggedIn}
              currentUser={auth.currentUser}
              onLogout={() => {
                auth.logout();
              }}
            />
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    clothingItems={clothingItems}
                    handleCardClick={handleCardClick}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute isLoggedIn={auth.isLoggedIn}>
                    <Profile
                      clothingItems={clothingItems}
                      handleCardClick={handleCardClick}
                      handleAddClick={handleAddClick}
                      onLogout={() => {
                        auth.logout();
                      }}
                      onUpdateProfile={handleUpdateProfile}
                      onOpenUpdateModal={() =>
                        modal.openModal("update-profile")
                      }
                    />
                  </ProtectedRoute>
                }
              />
            </Routes>

            <Footer />
          </div>
          <AddItemModal
            isOpenModal={modal.activeModal === "add-garment"}
            onAddItem={handleAddItem}
            onCloseModal={modal.closeModal}
            isLoading={auth.isLoading}
          />
          <ItemModal
            isOpen={modal.activeModal === "preview"}
            card={modal.selectedCard}
            onClose={modal.closeModal}
            onDeleteItem={handleDeleteItem}
          />
          <ConfirmationModal
            isOpen={modal.activeModal === "confirm-deleting"}
            onClose={modal.closeModal}
            onDeleteItem={handleConfirmDeleteItem}
            onCancelDeletingItem={handleCancelDeleteItem}
          />
          <LoginModal
            isOpen={modal.activeModal === "login"}
            onLogin={handleLogin}
            onClose={modal.closeModal}
            onNavigateRegister={handleLoginNavigateRegister}
            isLoading={auth.isLoading}
          />
          <RegisterModal
            isOpen={modal.activeModal === "register"}
            onRegister={handleRegister}
            onClose={modal.closeModal}
            onNavigateLogin={handleRegisterNavigateLogin}
            isLoading={auth.isLoading}
          />
          <UpdateProfileModal
            isOpen={modal.activeModal === "update-profile"}
            onUpdate={handleUpdateProfile}
            onClose={modal.closeModal}
            isLoading={auth.isLoading}
          />
        </div>
      </CurrentTemperatureUnitContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
