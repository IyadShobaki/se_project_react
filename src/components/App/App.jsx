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
import AddItemModal from "../AddItemModal/AddItemModal";
import Profile from "../Profile/Profile";
import ConfirmationModal from "../ConfirmationModal/ConfirmationModal";

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

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleDeleteItem = (itemId) => {
    setSelectedItemId(itemId);
    setActiveModal("confirm-deleting");
  };
  const handleConfirmDeleteItem = () => {
    if (selectedItemId === -1) return;
    deleteItem(itemsBaseUrl, selectedItemId)
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
      const data = await addItem(itemsBaseUrl, inputValues);
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
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      <div className="page">
        <div className="page__content">
          <Header handleAddClick={handleAddClick} weatherData={weatherData} />
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
                <Profile
                  clothingItems={clothingItems}
                  handleCardClick={handleCardClick}
                  handleAddClick={handleAddClick}
                />
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
      </div>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
