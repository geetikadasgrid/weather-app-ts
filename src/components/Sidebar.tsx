import { useState } from "react";
import { FiMenu, FiSearch, FiSettings } from "react-icons/fi";
import { LocationDetail } from "../types";
import { IoClose } from "react-icons/io5";

interface SidebarProps {
  setModalOpen: (open: boolean) => void;
  setShowSettings: (open: boolean) => void;
  addedLocations: LocationDetail[];
}

const Sidebar: React.FC<SidebarProps> = ({
  setModalOpen,
  setShowSettings,
  addedLocations,
}) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <aside
      className={`sidebar ${isSidebarOpen ? "w-64 bg-purple-800" : "w-16"}  `}
    >
      <div className="p-4 flex justify-between items-center">
        <button
          className="text-white text-2xl focus:outline-none"
          onClick={() => setSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? <IoClose /> : <FiMenu />}
        </button>

        {isSidebarOpen && (
          <div className="flex gap-4">
            <button
              className="text-white focus:outline-none"
              onClick={() => setModalOpen(true)}
            >
              <FiSearch />
            </button>
            <button
              className="text-white focus:outline-none"
              onClick={() => setShowSettings(true)}
            >
              <FiSettings />
            </button>
          </div>
        )}
      </div>

      {isSidebarOpen && (
        <div className="p-4">
          <h2 className="text-lg text-white font-bold mb-4">Locations</h2>
          <ul className="space-y-2">
            {addedLocations.length > 0 ? (
              addedLocations.map((location, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center bg-gray-700 rounded px-3 py-2 mb-2"
                >
                  <span>{location.locationName}</span>
                  <span>{location.temperature_C}°C</span>
                </li>
              ))
            ) : (
              <p className="text-gray-400">No locations added yet.</p>
            )}
          </ul>

          <button className="mt-6 bg-purple-700 text-white px-4 py-2 rounded hover:bg-purple-600">
            Manage Locations
          </button>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
