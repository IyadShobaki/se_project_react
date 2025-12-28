import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";

function Main({ weatherData, clothingItems, handleCardClick }) {
  const filteredItems = clothingItems.filter(
    (item) => item.weather === weatherData.type
  );
  return (
    <main>
      <WeatherCard weatherData={weatherData} />
      <section className="cards">
        <p className="cards__text">
          Today is {weatherData.temp.F}&deg; F / You may want to wear:
        </p>
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
      </section>
    </main>
  );
}

export default Main;
