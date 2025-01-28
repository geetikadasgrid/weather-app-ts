import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { BiCurrentLocation } from "react-icons/bi";

interface SearchSectionProps {
  isOpen: boolean;
  onClose: () => void;
  getWeatherApi: (url: string) => void;
}

const SearchSection: React.FC<SearchSectionProps> = ({
  isOpen,
  onClose,
  getWeatherApi,
}) => {
  const [searchInput, setSearchInput] = useState<string>("");
  const apiKey = import.meta.env.VITE_API_KEY;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchInput.trim()) return;

    const params = new URLSearchParams(window.location.search);
    params.set("q", searchInput);
    window.history.pushState(
      {},
      "",
      `${window.location.pathname}?${params.toString()}`
    );

    const API_URL = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${searchInput}&days=5&aqi=yes`;
    getWeatherApi(API_URL);

    setSearchInput("");
    onClose();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const handleInputLocation = () => {
    console.log("hi");
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const params = new URLSearchParams(window.location.search);
        params.set("q", `${latitude},${longitude}`);
        window.history.pushState(
          {},
          "",
          `${window.location.pathname}?${params.toString()}`
        );

        const API_URL = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${latitude},${longitude}&days=5&aqi=yes`;
        getWeatherApi(API_URL);
        onClose();
      },
      () => {
        alert("Please enable permission to access your current location.");
      }
    );
  };

  useEffect(() => {
    handleInputLocation();
  }, []);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        {/* Close Button */}
        <button className="modal-close-btn" onClick={onClose}>
          ✕
        </button>

        {/* Header */}
        <h2 className="modal-header">Search for a City</h2>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex items-center gap-2 mb-4">
          <div className="search-bar">
            <span className="search-icon">
              <CiSearch />
            </span>
            <input
              className="search-input"
              type="search"
              placeholder="Enter city name"
              value={searchInput}
              onChange={handleInputChange}
            />
          </div>
          <button type="submit" className="search-submit-btn">
            Search
          </button>
        </form>

        <button className="location-btn" onClick={handleInputLocation}>
          <BiCurrentLocation /> Use Current Location
        </button>
      </div>
    </div>
  );
};

export default SearchSection;
