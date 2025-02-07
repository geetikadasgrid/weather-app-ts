import { useState, useEffect } from "react";
import {
  ForecastDay,
  CurrentWeather,
  HourlyForecastData,
  TodayForecast,
  LocationDetail,
} from "./types";
import DisplayWeather from "../src/components/DisplayWether";
import SearchSection from "./components/SearchSection";
import HourlyForecast from "../src/components/HourlyForecast";
import ForecastData from "../src/components/ForecastData";
import AdditionalInfo from "../src/components/AdditionalInfo";
import Sidebar from "../src/components/Sidebar";
import { ToastContainer, toast } from "react-toastify";
import Settings from "../src/components/Setting";
import SkeletonLoader from "../src/components/SkeletonLoader";

function App() {
  const [currentWeather, setCurrentWeather] = useState<CurrentWeather>({});
  const [hourlyForecasts, setHourlyForecasts] = useState<HourlyForecastData[]>(
    []
  );
  const [todayForecast, setTodayForecast] = useState<TodayForecast>({
    maxTemp: 0,
    minTemp: 0,
  });
  const [nextForecastData, setNextForecastData] = useState<ForecastDay[]>([]);
  const [isModelOpen, setModalOpen] = useState<boolean>(false);
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [isDaycheck, setIsDay] = useState<boolean>(true);
  const [locationDetail, setLocationDetail] = useState<LocationDetail>({
    locationName: "",
    icons: "",
    temperature_C: 0,
  });
  const [addedLocations, setAddedLocations] = useState<LocationDetail[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const filterHourlyForecast = (
    hourlyData: HourlyForecastData[],
    apiLocalTime: string
  ) => {
    const currentHour = new Date(apiLocalTime).setMinutes(0, 0, 0);
    const next24Hours = currentHour + 24 * 60 * 60 * 1000;

    const next24HoursData = hourlyData.filter(({ time }) => {
      const forecastTime = new Date(time).getTime();
      return forecastTime >= currentHour && forecastTime <= next24Hours;
    });

    setHourlyForecasts(next24HoursData);
  };

  const getWeatherApi = async (API_URL: string) => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error?.message || "Failed to fetch weather data"
        );
      }

      const data = await response.json();
      console.log(data);

      const {
        location: { name: locationName, localtime },
        current: {
          temp_c,
          temp_f,
          condition: { icon, text: description },
          air_quality: { pm10: airQuality },
          wind_kph: windSpeed,
          humidity,
          feelslike_c,
          is_day: isDay,
          uv,
          pressure_in: pressure,
          dewpoint_c: dewPoint,
          precip_mm: precipitations,
          vis_km: visibility,
        },
        forecast: {
          forecastday: [
            {
              astro: { sunset, sunrise },
              day: { maxtemp_c, mintemp_c },
            },
          ],
        },
      } = data;
      const aqi = data.current.air_quality["gb-defra-index"];

      const combinedData = [
        ...data.forecast.forecastday[0].hour,
        ...data.forecast.forecastday[1].hour,
      ];

      setCurrentWeather({
        temperature_C: Math.floor(temp_c),
        temperature_F: Math.floor(temp_f),
        description,
        sunset,
        icons: icon,
        humidity,
        locationName,
        airQuality,
        windSpeed,
        feelslike_c,
        uv,
        pressure,
        dewPoint,
        precipitations,
        visibility,
        sunrise,
        isDay,
        aqi,
      });

      setIsDay(isDay === 1);
      setLocationDetail({
        locationName,
        icons: icon,
        temperature_C: Math.floor(temp_c),
      });

      setTodayForecast({
        maxTemp: maxtemp_c,
        minTemp: mintemp_c,
      });

      setNextForecastData(data.forecast.forecastday);

      // Filter hourly data using the API-provided local time
      filterHourlyForecast(combinedData, localtime);
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unexpected error occurred.");
      }
    }
  };

  const handleAdd = () => {
    if (!locationDetail.locationName || locationDetail.temperature_C === 0) {
      alert("No location data to add.");
      return;
    }

    const storedLocations = JSON.parse(
      localStorage.getItem("locations") || "[]"
    );

    if (
      !storedLocations.some(
        (loc: LocationDetail) =>
          loc.locationName === locationDetail.locationName
      )
    ) {
      const updatedLocations = [...storedLocations, locationDetail];
      localStorage.setItem("locations", JSON.stringify(updatedLocations));
      setAddedLocations(updatedLocations);
    } else {
      toast.info("Location already added.");
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);

    const storedLocations = JSON.parse(
      localStorage.getItem("locations") || "[]"
    );
    setAddedLocations(storedLocations);
    // document.title = `Weather in ${currentWeather.locationName}`;
    return () => clearTimeout(timer);
  }, []);
  useEffect(() => {
    if (locationDetail.locationName) {
      document.title = `Weather in ${locationDetail.locationName}`;
      const favicon = document.getElementById(
        "favicon"
      ) as HTMLLinkElement | null;
      if (favicon) {
        favicon.href = locationDetail.icons ?? "../public/sun.png";
      }
    }
  }, [locationDetail.locationName, locationDetail.icons]);

  return (
    <>
      {!loading ? (
        <div className="app-bg">
          <video
            key={isDaycheck ? "day" : "night"}
            autoPlay
            loop
            muted
            className="fixed opacity-0.5 opacity-85 top-0 left-0 w-full h-full object-cover z-0"
          >
            <source
              src={
                isDaycheck ? "../src/assets/day.mp4" : "../src/assets/night.mp4"
              }
              type="video/mp4"
            />
          </video>

          <div className="flex w-full">
            <Sidebar
              setModalOpen={setModalOpen}
              setShowSettings={setShowSettings}
              addedLocations={addedLocations}
            />
            <main className="flex-1 p-6 z-10">
              {showSettings ? (
                <Settings onClose={() => setShowSettings(false)} />
              ) : (
                <>
                  <SearchSection
                    getWeatherApi={getWeatherApi}
                    isOpen={isModelOpen}
                    onClose={() => setModalOpen(false)}
                  />
                  <DisplayWeather
                    currentWeather={currentWeather}
                    todayForecast={todayForecast}
                  />
                  <HourlyForecast hourlyWeather={hourlyForecasts} />
                  <AdditionalInfo currentWeather={currentWeather} />
                  <ForecastData nextForecastData={nextForecastData} />
                  <button className="btn" onClick={handleAdd}>
                    Add Location
                  </button>
                </>
              )}
            </main>
          </div>
          <ToastContainer />
        </div>
      ) : (
        <SkeletonLoader imageHeight={150} imageWidth={150} textLines={5} />
      )}
    </>
  );
}

export default App;
