import { useContext } from "react";
import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import Loading from "../Loading/Loading";

function Main({ weatherData, clothingItems, handleCardClick }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  let filteredItems = null;
  filteredItems = clothingItems.filter(
    (item) => item.weather === weatherData.type
  );

  console.log(clothingItems);
  return (
    <main className="main">
      <WeatherCard weatherData={weatherData} />
      <section className="cards">
        {weatherData.temp[currentTemperatureUnit] === 999 ? (
          <Loading name="loading-weather-main" />
        ) : (
          <p className="cards__text">
            Today is {weatherData.temp[currentTemperatureUnit]}
            &deg;{currentTemperatureUnit} / You may want to wear:
          </p>
        )}

        {!filteredItems ? (
          <Loading name="loading-items-main" />
        ) : filteredItems.length === 0 ? (
          <p className="cards__text">Items not found!</p>
        ) : (
          <ul className="cards__list">
            {filteredItems.map((item) => {
              return (
                <ItemCard
                  key={item._id}
                  item={item}
                  onCardClick={handleCardClick}
                />
              );
            })}
          </ul>
        )}
      </section>
    </main>
  );
}

export default Main;
