import './App.css';
import Navbar from './Navbar';

export default function App() {
  return (
    <div className="flex flex-col justify-between h-screen">
      <div className="flex-grow">
        <h1 className="text-3xl font-bold text-center text-[#468D9B] mt-4">
          媽咪育嬰指南
        </h1>
        {/* Map section */}
        <div className="map-container">
          {/* This could be your map component */}
        </div>
      </div>

      {/* Navbar at the bottom */}
      <Navbar />
    </div>
  );
}
