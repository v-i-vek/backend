// import React, { useState, useEffect } from 'react';
// import './Dashboard.css';
// import acIcon from './images/ac.png';
// import fanIcon from './images/fan.jpeg';
// import homeIcon from './images/Home.jpeg';
// import officeIcon from './images/office.jpeg';
// // import { response } from 'express';
// // import dataPort from './Login.js'

// import AWS from 'aws-sdk';

// AWS.config.update({
//     region: 'ap-south-1',
//     accessKeyId: 'AKIAUQ74A6PR6FMMPQEP',
//     secretAccessKey: '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',
// });

// const dynamodb = new AWS.DynamoDB.DocumentClient();



// function App() {

//     const [items, setItems] = useState([]);

//     useEffect(() => {
//         const params = {
//             TableName: 'devices',
//         };

//         dynamodb.scan(params, (error, data) => {
//             if (error) {
//                 console.error('Error fetching items:', error);
//             } else {
//                 setItems(data.Items);
//             }
//         });
//     }, []);

//     console.log("items");


//     const item = JSON.parse(localStorage.getItem('message'));
//     console.log("===this si", items);
//     const [selectedLocation, setSelectedLocation] = useState('');
//     const [selectedDevice, setSelectedDevice] = useState('');
//     const [devices, setDevices] = useState({
//         AC: { status: 'off', specs: { temperature: 24, fanSpeed: 'High' } },
//         Fan: { status: 'off', specs: { fanSpeed: 'Medium' } }
//     });

//     const handleLocationSelect = (location) => {
//         setSelectedLocation(location);
//         setSelectedDevice(null);
//     };

//     const handleDeviceSelect = (device) => {
//         setSelectedDevice(device);
//     };

//     const handleDeviceStatusToggle = (device) => {
//         const updatedDevices = { ...devices };
//         updatedDevices[device].status = devices[device].status === 'on' ? 'off' : 'on';
//         setDevices(updatedDevices);
//     };






//     return (
//         <div className="App">
//             <h1 className='user'>Hi, User!!</h1>
//             <div className="location-buttons">
//                 <p>Select a location:</p>
//                 <button onClick={() => handleLocationSelect('home')}>
//                     <img src={homeIcon} alt="Home" />
//                 </button>
//                 <button onClick={() => handleLocationSelect('office')}>
//                     <img src={officeIcon} alt="Office" />
//                 </button>
//             </div>

//             {
//                 selectedLocation && (
//                     <div className="device-buttons">
//                         <p>Select a device:</p>
//                         <button onClick={() => handleDeviceSelect('AC')}>
//                             <img className='deviceimg' src={fanIcon} alt="AC" />
//                         </button>
//                         <button onClick={() => handleDeviceSelect('Fan')}>
//                             <img className='deviceimg' src={acIcon} alt="Fan" />
//                         </button>
//                     </div>
//                 )
//             }

//             {
//                 selectedDevice && (
//                     <div className="selected-device">
//                         <p>Selected Location: {selectedLocation}</p>
//                         <p>Selected Device: {selectedDevice}</p>
//                         <button onClick={() => handleDeviceStatusToggle(selectedDevice)}>
//                             {devices[selectedDevice].status === 'on' ? 'Turn Off' : 'Turn On'}
//                         </button>
//                     </div>
//                 )
//             }

//             {selectedDevice && devices[selectedDevice].status === 'on' && (
//                 <div className="device-specs">
//                     <p>Status: {devices[selectedDevice].status}</p>
//                     {devices[selectedDevice].specs && (
//                         <div>
//                             {selectedDevice === 'AC' && (
//                                 <div>
//                                     <p>Temperature: {devices[selectedDevice].specs.temperature}°C</p>
//                                 </div>
//                             )}
//                             <p>Fan Speed: {devices[selectedDevice].specs.fanSpeed}</p>
//                         </div>
//                     )}
//                 </div>
//             )}

//         </div>
//     );
// }

// export default App;
