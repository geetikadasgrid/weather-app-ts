import { useState } from "react";
import { FaWind, FaTint } from "react-icons/fa";

interface ForecastDay {
  date: string;
  day: {
    maxtemp_c: number;
    mintemp_c: number;
    maxwind_kph: number;
    avghumidity: number;
    condition: { icon: string };
  };
  hour: Array<{ condition: { icon: string } }>;
}

interface ForecastDataProps {
  nextForecastData: ForecastDay[];
}

const ForecastData: React.FC<ForecastDataProps> = ({ nextForecastData }) => {
  const [show, setShow] = useState(false);

  const data = nextForecastData.map((day) => ({
    date: new Date(day.date).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "2-digit",
    }),
    maxTemp: day.day.maxtemp_c,
    minTemp: day.day.mintemp_c,
    windSpeed: day.day.maxwind_kph,
    icon: `https:${day.day.condition.icon}`,
    nightIcon: `https:${day.hour[22].condition.icon}`,
    humidity: day.day.avghumidity,
  }));

  return (
    <div className="bg-transparent text-white p-4 w-full">
      <button className="forecast-button" onClick={() => setShow(!show)}>
        3 Days Forecast
      </button>

      {show && (
        <div className="forecast-table-container">
          <table className="forecast-table">
            <thead>
              <tr>
                <th className="forecast-table-head">Date</th>
                <th className="forecast-table-head">Max Temp (°C)</th>
                <th className="forecast-table-head">Min Temp (°C)</th>
                <th className="forecast-table-head"></th>
                <th className="forecast-table-head">Humidity</th>
                <th className="forecast-table-head">Wind Speed (km/h)</th>
              </tr>
            </thead>
            <tbody>
              {data.map((day, index) => (
                <tr key={index} className="forecast-table-row">
                  <td className="forecast-table-cell">{day.date}</td>
                  <td className="forecast-table-cell">{day.maxTemp}°C</td>
                  <td className="forecast-table-cell">{day.minTemp}°C</td>
                  <td className="forecast-icon-cell">
                    <img
                      src={day.icon}
                      alt="Day weather icon"
                      width={30}
                      height={30}
                    />
                    <img
                      src={day.nightIcon}
                      alt="Night weather icon"
                      width={30}
                      height={30}
                    />
                  </td>
                  <td className="forecast-table-cell">
                    {day.humidity} <FaTint className="humidity-icon" />
                  </td>
                  <td className="forecast-table-cell">
                    {day.windSpeed} <FaWind className="wind-icon" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ForecastData;
