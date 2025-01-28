import { useState } from "react";
import { CurrentWeather, TodayForecast } from "../types";

interface DisplayWeatherProps {
  currentWeather: CurrentWeather;
  todayForecast: TodayForecast;
}

const DisplayWeather: React.FC<DisplayWeatherProps> = ({
  currentWeather,
  todayForecast,
}) => {
  const [showFahrenheit, setShowFahrenheit] = useState(false);

  return (
    <div className="text-center p-6">
      {currentWeather?.locationName ? (
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-left">
            <h2 className="weather-title">{currentWeather.locationName}</h2>

            <p className="weather-temp">
              {showFahrenheit
                ? `${currentWeather.temperature_F}°F`
                : `${currentWeather.temperature_C}°C`}
            </p>

            <button
              className="weather-btn"
              onClick={() => setShowFahrenheit(!showFahrenheit)}
            >
              {showFahrenheit ? "Change to Celsius" : "Change to Fahrenheit"}
            </button>

            <p className="weather-description">{currentWeather.description}</p>

            <p className="weather-stats">
              High:{" "}
              <span className="weather-stats-high">
                {Math.floor(todayForecast.maxTemp)}°C
              </span>{" "}
              / Low:{" "}
              <span className="weather-stats-low">
                {Math.floor(todayForecast.minTemp)}°C
              </span>
            </p>

            <p className="weather-stats">
              Feels like{" "}
              <span className="font-semibold text-white">
                {currentWeather.feelslike_c}°C
              </span>
            </p>
          </div>

          <div className="flex flex-col justify-center items-center">
            <img
              src={currentWeather.icons}
              alt="Weather Icon"
              className="weather-icon"
            />
            <img
              src="../src/assets/girl.png"
              alt="Weather Girl"
              className="weather-image"
            />
          </div>
        </div>
      ) : (
        "loading"
      )}
    </div>
  );
};

export default DisplayWeather;
