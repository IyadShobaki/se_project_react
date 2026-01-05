import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";

import ItemModal from "../ItemModal/ItemModal";
import { filterWeatherData, getWeather } from "../../utils/weatherApi";
import { getItems, addItem, deleteItem } from "../../utils/itemsApi";
import { apiKey, coordinates, itemsBaseUrl } from "../../utils/constants";
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
      const data = await addItem(itemsBaseUrl, inputValues);
      setClothingItems([data, ...clothingItems]);
      closeActiveModal();
    } catch (error) {
      throw new Error(error);
    }
    // addItem(itemsBaseUrl, inputValues)
    //   .then((data) => {
    //     setClothingItems([data, ...clothingItems]);
    //     closeActiveModal();
    //   })
    //   .catch(console.error);
  };

  useEffect(() => {
    getWeather(coordinates, apiKey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);

    getItems(itemsBaseUrl)
      .then((data) => {
        setClothingItems(data.reverse());
      })
      .catch(console.error);
  }, []);

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
