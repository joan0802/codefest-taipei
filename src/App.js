import './App.css';
import Navbar from './Navbar';
import ActivityCards from './ActivityCards';
import { useState } from 'react';
import MapComponent from "./components/MapComponent";
import ChatComponent from './ChatComponent';

export default function App() {
    const [activeTab, setActiveTab] = useState('map');

    return (
        <div className='h-screen overflow-hidden'>
            <div className="flex flex-col justify-between gap-0 min-h-[91vh]">
                <h1 className="text-3xl h-[4vh] text-center text-[#468D9B] my-2">
                    媽咪育嬰指南
                </h1>
                {/* 根據 activeTab 渲染不同內容 */}
                <div className="content-container">
                    {activeTab === 'map' && <div className="map-container">
                        <MapComponent />
                    </div>}
                    {activeTab === 'chatbot' && <div>
                        <ChatComponent />
                    </div>}
                    {activeTab === 'playground' && <div className="playground-container">
                        <ActivityCards />
                    </div>}
                </div>
            </div>
            <div className='flex flex-col h-[8vh] justidy-end'>
                <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
            </div>
        </div>
    );
}
