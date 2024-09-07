import './App.css';
import Navbar from './Navbar';
import { useState } from 'react';
import MapComponent from "./components/MapComponent";

export default function App() {
  const [activeTab, setActiveTab] = useState('map');

  return (
    <div className="flex flex-col justify-between h-screen">
      <div className="">
        <h1 className="text-3xl text-center text-[#468D9B] mt-4">
          媽咪育嬰指南
        </h1>
        {/* 根據 activeTab 渲染不同內容 */}
        <div className="content-container">
          {activeTab === 'map' && <div className="map-container">
            <MapComponent />
          </div>}
          {activeTab === 'chatbot' && <div className="chatbot-container">聊天機器人顯示在這裡</div>}
          {activeTab === 'playground' && <div className="playground-container">兒童遊樂場顯示在這裡</div>}
        </div>
      </div>

      {/* 將 activeTab 和 setActiveTab 傳遞給 Navbar */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab}/>
    </div>
  );
}
