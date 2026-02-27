export const weatherOptions = [
  {
    day: true,
    condition: "clear",
    url: new URL("../assets/images/day/clear.png", import.meta.url).href,
  },
  {
    day: true,
    condition: "clouds",
    url: new URL("../assets/images/day/clouds.png", import.meta.url).href,
  },
  {
    day: true,
    condition: "fog",
    url: new URL("../assets/images/day/fog.png", import.meta.url).href,
  },
  {
    day: true,
    condition: "rain",
    url: new URL("../assets/images/day/rain.png", import.meta.url).href,
  },
  {
    day: true,
    condition: "snow",
    url: new URL("../assets/images/day/snow.png", import.meta.url).href,
  },
  {
    day: true,
    condition: "storm",
    url: new URL("../assets/images/day/storm.png", import.meta.url).href,
  },

  {
    day: false,
    condition: "clear",
    url: new URL("../assets/images/night/clear.png", import.meta.url).href,
  },
  {
    day: false,
    condition: "clouds",
    url: new URL("../assets/images/night/clouds.png", import.meta.url).href,
  },
  {
    day: false,
    condition: "fog",
    url: new URL("../assets/images/night/fog.png", import.meta.url).href,
  },
  {
    day: false,
    condition: "rain",
    url: new URL("../assets/images/night/rain.png", import.meta.url).href,
  },
  {
    day: false,
    condition: "snow",
    url: new URL("../assets/images/night/snow.png", import.meta.url).href,
  },
  {
    day: false,
    condition: "storm",
    url: new URL("../assets/images/night/storm.png", import.meta.url).href,
  },
];

export const defaultWeatherOptions = {
  day: {
    url: new URL("../assets/images/day/default.png", import.meta.url).href,
  },
  night: {
    url: new URL("../assets/images/night/default.png", import.meta.url).href,
  },
};

export const defaultCoordinates = {
  latitude: 41.4826595,
  longitude: -81.7819958,
};

export const apiKey = "c8ff33cb0abbf207982ca50c9ca1841a";

// Backend API base URL
export const wtwrApiBaseUrl =
  process.env.NODE_ENV === "production"
    ? "https://api.wearright.jumpingcrab.com"
    : "http://localhost:3001";
