import ToolButton from "./ToolButton";

export default function Navbar({ activeTab, setActiveTab }) {
    return (
        <div className="bg-[#DBF1F5] text-white py-4 flex justify-around">
            {/* Map Tab */}
            <button onClick={() => setActiveTab('map')}>
                <ToolButton 
                    icon="/mapIcon.svg" 
                    text="托嬰地圖" 
                    active={activeTab === 'map'} 
                />
            </button>

            {/* Chatbot Tab */}
            <button onClick={() => setActiveTab('chatbot')}>
                <ToolButton 
                    icon="/chatIcon.svg" 
                    text="育嬰問答" 
                    active={activeTab === 'chatbot'} 
                />
            </button>

            {/* Playground Tab */}
            <button onClick={() => setActiveTab('playground')}>
                <ToolButton 
                    icon="📅" 
                    text="親子放電區" 
                    active={activeTab === 'playground'} 
                />
            </button>
        </div>
    );
}
