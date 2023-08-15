import React, { useState, useEffect } from 'react';
import './dash.css';

import AWS from 'aws-sdk';

AWS.config.update({
    region: 'ap-south-1',
    accessKeyId: 'AKIAUQ74A6PR6FMMPQEP',
    secretAccessKey: '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',
});

//this data is fetching from the local storage
const UserEmail = JSON.parse(localStorage.getItem('data'));

const dynamodb = new AWS.DynamoDB.DocumentClient();


const Home = ({ activeTab, onClick, deviceData }) => {

    const [showSpecs, setShowSpecs] = useState(false);
    const [deviceState, setDeviceState] = useState(true);
    

    if (deviceData.location !== 'home') {
            

        // console.log("this is the console ++++++++++++++++++",item.email)
        return null;
    }

    return (
        <div className="component-container">
            <h2>{deviceData.name}</h2>
            <div className="dash-container">
                <div className="devices">
                    <button
                        className={`specs-button ${activeTab === 'home' ? 'active' : ''}`}
                        onClick={() => {
                            setShowSpecs(!showSpecs);
                            setDeviceState(!deviceState);
                            onClick('home');
                        }}
                    >
                        {deviceState ? `${deviceData.name} [On]` : `${deviceData.name} [Off]`}
                    </button>
                </div>
                <div className="specifications">
                    {showSpecs && (
                        <>
                            <p>Device Name: {deviceData.name}</p>
                            {deviceData.type === 'ac' && (
                                <>
                                    <p>Temperature: {deviceData.temperature}°C</p>
                                </>
                            )}
                            <p>Fan Speed: {deviceData.fanSpeed}</p>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

const Office = ({ activeTab, onClick, deviceData }) => {
    const [showSpecs, setShowSpecs] = useState(false);
    const [deviceState, setDeviceState] = useState(true);

    if (deviceData.location !== 'office') {
        // Return null if the device's location is not office
        return null;
    }


    return (
        <div className="component-container">
            <h2>{deviceData.name}</h2>
            <div className="dash-container">
                <div className="devices">
                    <button
                        className={`specs-button ${activeTab === 'office' ? 'active' : ''}`}
                        onClick={() => {
                            setShowSpecs(!showSpecs);
                            setDeviceState(!deviceState);
                        }}
                    >
                        {deviceState ? `${deviceData.name} [On]` : `${deviceData.name} [Off]`}
                    </button>
                </div>
                <div className="specifications">
                    {showSpecs && (
                        <>
                            <p>Device Name: {deviceData.name}</p>
                            {deviceData.type === 'AC' && (
                                <>
                                    <p>Temperature: {deviceData.temperature}°C</p>
                                    {/* Add more AC-specific properties if needed */}
                                </>
                            )}
                            <p>Fan Speed: {deviceData.fanSpeed}</p>
                            {/* Add more properties as needed */}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};


const App = () => {

    const [items, setItems] = useState([]);
    const [activeTab, setActiveTab] = useState('home');

    useEffect(() => {
        const params = {
            TableName: 'devices',
        };

        dynamodb.scan(params, (error, data) => {
            if (error) {
                console.error('Error fetching items:', error);
            } else {
                setItems(data.Items);
            }
        });
    }, []);

    return (
        <div className="container">
             <h4 className='email'>&#128231;{UserEmail.email}</h4>
            <h1>Smart Home Control</h1>
            <div className="tabs">
                <button
                    className={activeTab === 'home' ? 'active' : ''}
                    onClick={() => setActiveTab('home')}
                >
                    HOME
                </button>
                <button
                    className={activeTab === 'office' ? 'active' : ''}
                    onClick={() => setActiveTab('office')}
                >
                    OFFICE
                </button>
            </div>
            {items.map((item, index) => (
                <div className="item-container" key={index}>
                    {activeTab === 'home' ? (
                        <Home activeTab={activeTab} onClick={setActiveTab} deviceData={item} />
                    ) : (
                        <Office activeTab={activeTab} onClick={setActiveTab} deviceData={item} />
                    )}
                </div>
            ))}
        </div>
    );
};

export default App;
