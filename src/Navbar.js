import ToolButton from "./ToolButton";

export default function Navbar({ activeTab, setActiveTab }) {
    return (
        <div className="bg-[#DBF1F5] text-white flex justify-around">
            {/* Map Tab */}
            <button className="w-full" onClick={() => setActiveTab('map')}>
                <ToolButton 
                    icon="/map_location.png" 
                    text="托嬰地圖" 
                    active={activeTab === 'map'} 
                />
            </button>

            {/* Chatbot Tab */}
            <button className="w-full" onClick={() => setActiveTab('chatbot')}>
                <ToolButton 
                    icon="/chatIcon.png" 
                    text="育嬰問答" 
                    active={activeTab === 'chatbot'} 
                />
            </button>

            {/* Playground Tab */}
            <button className="w-full" onClick={() => setActiveTab('playground')}>
                <ToolButton 
                    icon="/family_icon.png" 
                    text="親子放電區" 
                    active={activeTab === 'playground'} 
                />
            </button>
        </div>
    );
}
