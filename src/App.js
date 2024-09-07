import './App.css';
import Navbar from './Navbar';
import ActivityCards from './ActivityCards';
import FormDialog from './FormDialog';
import { useState } from 'react';
import MapComponent from "./components/MapComponent";
import { GoogleMap, LoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import ChatComponent from './ChatComponent';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

export default function App({ children }) {
    const [activeTab, setActiveTab] = useState('map');
    // const [dialogOpen, setDialogOpen] = useState(false);

    // const handleDialogOpen = () => {
    //     setDialogOpen(true);
    // };

    // const handleDialogClose = () => {
    //     setDialogOpen(false);
    // };

    return (
        <div className="flex flex-col justify-between gap-0 h-screen">
            {/* 根據 activeTab 渲染不同內容 */}
            {activeTab === 'map' && <div className="map-container">
                <MapComponent />
            </div>}
            {/* {activeTab === 'playground' && <div className="playground-container"></div>} */}
            {activeTab === 'chatbot' && <div>
                <ChatComponent />
            </div>}
            {activeTab === 'playground' && <div className="playground-container">
                <div>
                    <ActivityCards />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        {children}
                        <FormDialog />
                    </LocalizationProvider>
                    
                    {/* <Fab 
                        size = "large"
                        style = {{ 
                            position: 'fixed', 
                            bottom: '100px', 
                            right: '20px',
                            backgroundColor: "#71C5D5" 
                        }} 
                        onclick = {handleDialogOpen}
                    >
                        <AddIcon style={{ color: "#EDF8FA" }} />
                    </Fab>
                    <FormDialog open={dialogOpen} onClose={handleDialogClose} /> */}
                </div>
            </div>}
            <Navbar className='min-h-[8vh]' activeTab={activeTab} setActiveTab={setActiveTab} />
            
        </div>
    );
}