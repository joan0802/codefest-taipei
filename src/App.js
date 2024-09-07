import './App.css';
import Navbar from './Navbar';
import { useState } from 'react';
import MapComponent from "./components/MapComponent";
import { GoogleMap, LoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import ChatComponent from './ChatComponent';

export default function App() {
    const [activeTab, setActiveTab] = useState('map');

    return (
        <div className="flex flex-col justify-between gap-0 h-screen">
            {/* 根據 activeTab 渲染不同內容 */}
            {activeTab === 'map' && <div className="map-container">
                <MapComponent />
            </div>}
            {activeTab === 'playground' && <div className="playground-container">兒童遊樂場顯示在這裡</div>}
            {activeTab === 'chatbot' && <div>
                <ChatComponent />
            </div>}
            {activeTab === 'playground' && <div className="playground-container">
                <div>

                </div>
            </div>}
            <Navbar className='min-h-[8vh]' activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
    );
}
