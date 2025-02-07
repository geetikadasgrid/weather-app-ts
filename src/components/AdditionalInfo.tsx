import { CurrentWeather } from "../types";
import { TbSunset2, TbUvIndex } from "react-icons/tb";
import { FaWind } from "react-icons/fa";
import { WiHumidity } from "react-icons/wi";
import { MdDewPoint } from "react-icons/md";
import { TiWeatherWindyCloudy } from "react-icons/ti";
import { MdOutlineVisibility } from "react-icons/md";
import { WiSunrise } from "react-icons/wi";

interface CurrentWeatherProps {
  currentWeather: CurrentWeather;
}

// const getAQIDescription = (
//   aqi: number
// ): { description: string; color: string } => {
//   if (!aqi) return { description: "N/A", color: "text-gray-400" };
//   if (aqi === 1) return { description: "Excellent", color: "text-green-500" };
//   if (aqi === 2) return { description: "Good", color: "text-blue-500" };
//   if (aqi === 3) return { description: "Fair", color: "text-yellow-500" };
//   if (aqi === 4) return { description: "Moderate", color: "text-orange-500" };
//   if (aqi === 5) return { description: "Poor", color: "text-orange-500" };
//   if (aqi === 6) return { description: "Very Poor", color: "text-purple-500" };
//   if (aqi >= 7) return { description: "Extremely Poor", color: "text-red-500" };
//   return { description: "N/A", color: "text-gray-400" };
// };
enum AQIDescription {
  NA = "N/A",
  Excellent = "Excellent",
  Good = "Good",
  Fair = "Fair",
  Moderate = "Moderate",
  Poor = "Poor",
  VeryPoor = "Very Poor",
  ExtremelyPoor = "Extremely Poor",
}

enum AQIColor {
  Gray = "text-gray-500",
  Green = "text-green-500",
  Blue = "text-blue-500",
  Yellow = "text-yellow-500",
  Orange = "text-orange-500",
  Purple = "text-purple-500",
  Red = "text-red-500",
}

const getAQIDescription = (
  aqi: number
): { description: string; color: string } => {
  if (!aqi) return { description: AQIDescription.NA, color: AQIColor.Gray };
  if (aqi === 1)
    return { description: AQIDescription.Excellent, color: AQIColor.Green };
  if (aqi === 2)
    return { description: AQIDescription.Good, color: AQIColor.Blue };
  if (aqi === 3)
    return { description: AQIDescription.Fair, color: AQIColor.Yellow };
  if (aqi === 4)
    return { description: AQIDescription.Moderate, color: AQIColor.Orange };
  if (aqi === 5)
    return { description: AQIDescription.Poor, color: AQIColor.Orange };
  if (aqi === 6)
    return { description: AQIDescription.VeryPoor, color: AQIColor.Purple };
  if (aqi >= 7)
    return { description: AQIDescription.ExtremelyPoor, color: AQIColor.Red };
  return { description: AQIDescription.NA, color: AQIColor.Gray };
};

const AdditionalInfo: React.FC<CurrentWeatherProps> = ({ currentWeather }) => {
  const aqiData = getAQIDescription(currentWeather.aqi || 0);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 mt-8">
      {currentWeather.isDay ? (
        <div className="info-card">
          <TbSunset2 className="info-icon text-yellow-500" />
          <p className="info-title">Sunset</p>
          <p className="info-value">{currentWeather.sunset}</p>
        </div>
      ) : (
        <div className="info-card">
          <WiSunrise className="info-icon text-orange-500" />
          <p className="info-title">Sunrise</p>
          <p className="info-value">{currentWeather.sunrise}</p>
        </div>
      )}

      <div className="info-card">
        <TiWeatherWindyCloudy className="info-icon text-green-500" />
        <p className="info-title">Air Quality Index (AQI)</p>
        <p className={`info-value ${aqiData.color}`}>
          {currentWeather.airQuality
            ? `${Math.floor(currentWeather.airQuality)} - ${
                aqiData.description
              }`
            : "N/A"}
        </p>
      </div>

      <div className="info-card">
        <WiHumidity className="info-icon text-blue-500" />
        <p className="info-title">Humidity</p>
        <p className="info-value">{currentWeather.humidity}%</p>
      </div>

      <div className="info-card">
        <FaWind className="info-icon text-indigo-400" />
        <p className="info-title">Wind</p>
        <p className="info-value">{currentWeather.windSpeed} Km/h</p>
      </div>

      <div className="info-card">
        <MdDewPoint className="info-icon text-teal-500" />
        <p className="info-title">Dew Point</p>
        <p className="info-value">{currentWeather.dewPoint}°C</p>
      </div>

      <div className="info-card">
        <TbUvIndex className="info-icon text-purple-500" />
        <p className="info-title">UV Index</p>
        <p className="info-value">{currentWeather.uv}</p>
      </div>

      <div className="info-card">
        <TiWeatherWindyCloudy className="info-icon text-gray-500" />
        <p className="info-title">Pressure</p>
        <p className="info-value">{currentWeather.pressure} mm</p>
      </div>
      <div className="info-card">
        <FaWind className="info-icon text-cyan-500" />
        <p className="info-title">Precipitations</p>
        <p className="info-value">{currentWeather.precipitations} mm</p>
      </div>
      <div className="info-card">
        <MdOutlineVisibility className="info-icon text-cyan-500" />
        <p className="info-title">Visibility (Km)</p>
        <p className="info-value">{currentWeather.visibility} mm</p>
      </div>
    </div>
  );
};

export default AdditionalInfo;
