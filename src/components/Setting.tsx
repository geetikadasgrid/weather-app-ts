import { useState } from "react";
import { FiX } from "react-icons/fi";

interface SettingsProps {
  onClose: () => void;
}

const Settings: React.FC<SettingsProps> = ({ onClose }) => {
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [showWeatherOnAppsScreen, setShowWeatherOnAppsScreen] = useState(false);

  return (
    <div className="settings-container relative">
      <button
        className="absolute top-4 right-4 text-white text-2xl focus:outline-none"
        onClick={onClose}
      >
        <FiX />
      </button>

      <div className="settings-header">Weather settings</div>
      <div className="settings-section">
        <div className="settings-item">
          <span className="settings-item-title">Unit</span>
          <span className="settings-item-subtitle">°C</span>
        </div>
        <div className="settings-item">
          <span className="settings-item-title">Local Weather</span>
          <span className="settings-item-subtitle">Agree</span>
        </div>
        <div className="settings-item">
          <span className="settings-item-title">Auto refresh</span>
          <label className="settings-toggle">
            <input
              type="checkbox"
              checked={autoRefresh}
              onChange={() => setAutoRefresh(!autoRefresh)}
            />
            <span className="settings-toggle-label">
              <span className="settings-toggle-circle"></span>
            </span>
          </label>
        </div>
      </div>

      {/* Show Weather on Apps Screen */}
      <div className="settings-item">
        <span className="settings-item-title">Show Weather on Apps screen</span>
        <label className="settings-toggle">
          <input
            type="checkbox"
            checked={showWeatherOnAppsScreen}
            onChange={() =>
              setShowWeatherOnAppsScreen(!showWeatherOnAppsScreen)
            }
          />
          <span className="settings-toggle-label">
            <span className="settings-toggle-circle"></span>
          </span>
        </label>
      </div>

      <div className="settings-item">
        <span className="settings-item-title">Notifications</span>
      </div>
      <div className="settings-item">
        <span className="settings-item-title">Customisation Service</span>
        <span className="settings-item-subtitle">Not in use</span>
      </div>

      <div className="settings-item">
        <span className="settings-item-title">Privacy Policy</span>
      </div>
      <div className="settings-item">
        <span className="settings-item-title">Permissions</span>
      </div>
      <div className="settings-item">
        <span className="settings-item-title">About Weather</span>
      </div>
    </div>
  );
};

export default Settings;
