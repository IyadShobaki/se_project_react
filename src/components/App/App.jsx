import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";

import ItemModal from "../ItemModal/ItemModal";
import { filterWeatherData, getWeather } from "../../utils/weatherApi";
import { getItems, addItem, deleteItem } from "../../utils/itemsApi";
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
import {
  signup,
  signin,
  getCurrentUser,
  updateUser,
} from "../../utils/usersApi";
import Profile from "../Profile/Profile";
import ConfirmationModal from "../ConfirmationModal/ConfirmationModal";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

function App() {
  const [clothingItems, setClothingItems] = useState([]);
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
    condition: "",
    isDay: false,
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [selectedItemId, setSelectedItemId] = useState(-1);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const handleLoginClick = () => {
    setActiveModal("login");
  };

  const handleRegisterClick = () => {
    setActiveModal("register");
  };

  const handleLoginNavigateRegister = () => {
    setActiveModal("register");
  };

  const handleRegisterNavigateLogin = () => {
    setActiveModal("login");
  };

  const performSignin = async (email, password) => {
    try {
      const res = await signin(itemsBaseUrl, { email, password });
      if (res && res.token) {
        localStorage.setItem("jwt", res.token);
        // fetch current user and store in state
        try {
          const user = await getCurrentUser(itemsBaseUrl, res.token);
          setCurrentUser(user);
        } catch (e) {
          console.error("Failed to fetch current user:", e);
        }
        setIsLoggedIn(true);
        return res;
      } else {
        throw new Error("No token in response");
      }
    } catch (err) {
      throw err;
    }
  };

  const handleLogin = async (credentials) => {
    try {
      setIsLoading(true);
      const res = await performSignin(credentials.email, credentials.password);
      console.log("Login successful", res);
      setActiveModal("");
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (credentials) => {
    try {
      setIsLoading(true);
      // register user
      const registerRes = await signup(itemsBaseUrl, credentials);
      console.log("Register response", registerRes);
      // immediately sign in the new user
      await performSignin(credentials.email, credentials.password);
      setActiveModal("");
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateProfile = async (updatedData) => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem("jwt");
      if (!token) throw new Error("No token");
      const res = await updateUser(itemsBaseUrl, token, updatedData);
      setCurrentUser(res);
      return res;
    } catch (err) {
      console.error("Failed to update profile:", err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // On mount, check for token and restore session
  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) return;
    setIsLoading(true);
    getCurrentUser(itemsBaseUrl, token)
      .then((user) => {
        setCurrentUser(user);
        setIsLoggedIn(true);
      })
      .catch((err) => {
        console.error("Failed to restore session:", err);
        localStorage.removeItem("jwt");
      })
      .finally(() => setIsLoading(false));
  }, []);

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleDeleteItem = (itemId) => {
    setSelectedItemId(itemId);
    setActiveModal("confirm-deleting");
  };
  const handleConfirmDeleteItem = () => {
    if (selectedItemId === -1) return;
    const token = localStorage.getItem("jwt");
    deleteItem(itemsBaseUrl, token, selectedItemId)
      .then(() => {
        const newClothingItems = clothingItems.filter((item) => {
          return item._id != selectedItemId;
        });
        setClothingItems(newClothingItems);
        closeActiveModal();
      })
      .catch(console.error)
      .finally(() => setSelectedItemId(-1));
  };

  const handleCancelDeleteItem = () => {
    setSelectedItemId(-1);
    closeActiveModal();
  };
  const handleAddItem = async (inputValues) => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem("jwt");
      const data = await addItem(itemsBaseUrl, token, inputValues);
      setClothingItems([data, ...clothingItems]);
      closeActiveModal();
      setIsLoading(false);
    } catch (error) {
      throw new Error(error);
    }
  };

  useEffect(() => {
    const fetchWeather = async (coords) => {
      try {
        const data = await getWeather(coords, apiKey);
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      } catch (err) {
        console.error(err);
      }
    };

    const resolveGeolocation = () =>
      new Promise((resolve) => {
        if (!navigator.geolocation) {
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

    resolveGeolocation().then((coords) => {
      fetchWeather(coords);
    });

    getItems(itemsBaseUrl)
      .then(({ data }) => {
        setClothingItems(data.reverse());
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (!activeModal) return;

    const handleEscClose = (evt) => {
      if (evt.key === "Escape") {
        closeActiveModal();
      }
    };

    const handleOverlay = (evt) => {
      if (evt.target.classList.contains("modal")) {
        closeActiveModal();
      }
      if (evt.target.classList.contains("modal__submit-btn_disabled")) {
        evt.target.classList.add("shake");
        setTimeout(() => {
          evt.target.classList.remove("shake");
        }, 1000);
      }
    };
    document.addEventListener("keydown", handleEscClose);
    document.addEventListener("mousedown", handleOverlay);

    return () => {
      document.removeEventListener("keydown", handleEscClose);
      document.removeEventListener("mousedown", handleOverlay);
    };
  }, [activeModal]);

  return (
    <CurrentUserContext.Provider value={{ currentUser }}>
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
              isLoggedIn={isLoggedIn}
              currentUser={currentUser}
              onLogout={() => {
                // clear session
                localStorage.removeItem("jwt");
                setIsLoggedIn(false);
                setCurrentUser(null);
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
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Profile
                      clothingItems={clothingItems}
                      handleCardClick={handleCardClick}
                      handleAddClick={handleAddClick}
                      onLogout={() => {
                        localStorage.removeItem("jwt");
                        setIsLoggedIn(false);
                        setCurrentUser(null);
                      }}
                      onUpdateProfile={handleUpdateProfile}
                      onOpenUpdateModal={() => setActiveModal("update-profile")}
                    />
                  </ProtectedRoute>
                }
              />
            </Routes>

            <Footer />
          </div>
          <AddItemModal
            isOpenModal={activeModal === "add-garment"}
            onAddItem={handleAddItem}
            onCloseModal={closeActiveModal}
            isLoading={isLoading}
          />
          <ItemModal
            isOpen={activeModal === "preview"}
            card={selectedCard}
            onClose={closeActiveModal}
            onDeleteItem={handleDeleteItem}
          />
          <ConfirmationModal
            isOpen={activeModal === "confirm-deleting"}
            onClose={closeActiveModal}
            onDeleteItem={handleConfirmDeleteItem}
            onCancelDeletingItem={handleCancelDeleteItem}
          />
          <LoginModal
            isOpen={activeModal === "login"}
            onLogin={handleLogin}
            onClose={closeActiveModal}
            onNavigateRegister={handleLoginNavigateRegister}
            isLoading={isLoading}
          />
          <RegisterModal
            isOpen={activeModal === "register"}
            onRegister={handleRegister}
            onClose={closeActiveModal}
            onNavigateLogin={handleRegisterNavigateLogin}
            isLoading={isLoading}
          />
          <UpdateProfileModal
            isOpen={activeModal === "update-profile"}
            onUpdate={handleUpdateProfile}
            onClose={closeActiveModal}
            isLoading={isLoading}
          />
        </div>
      </CurrentTemperatureUnitContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
