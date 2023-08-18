import React, { useState, useEffect } from 'react';
import './dash.css';
// import logo from './images/logo.jpg';
import AWS from 'aws-sdk';

AWS.config.update({
    region: 'ap-south-1',
    accessKeyId: 'AKIAUQ74A6PR6FMMPQEP',
    secretAccessKey: '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',
});


const dynamodb = new AWS.DynamoDB.DocumentClient();
const Home = ({ activeTab, onClick, deviceData }) => {
  
    const [showSpecs, setShowSpecs] = useState(false);
    const [deviceState, setDeviceState] = useState(true);

    if (deviceData.location !== 'home') {
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
                        {deviceState ? `On` : `Off`}
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
                        {deviceState ? `On` : `Off`}
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
                            <p>Fan Speed:{deviceData.fanSpeed}</p>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};


// const App = () => {

//     const [items, setItems] = useState([]);
//     const [activeTab, setActiveTab] = useState('home');

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

//     return (
//         <><div className='header'>
//             <h1 className='email'>&#128231;{UserEmail.email}</h1>
//             <h1 className='app'> ThingSync</h1>
//         </div><></><div className="container">

//                 <div className='abc'>
//                 </div>
//                 <div className="tabs">
//                     <button
//                         className={activeTab === 'home' ? 'active' : ''}
//                         onClick={() => setActiveTab('home')}
//                     >
//                     &#127968;HOME
//                     </button>
//                     <button
//                         className={activeTab === 'office' ? 'active' : ''}
//                         onClick={() => setActiveTab('office')}
//                     >
//                     &#127970;OFFICE
//                     </button>
//                 </div>
//                 {items.map((item, index) => (
//                     <div className="item-container" key={index}>
//                         {activeTab === 'home' ? (
//                             <Home activeTab={activeTab} onClick={setActiveTab} deviceData={item} />
//                         ) : (
//                             <Office activeTab={activeTab} onClick={setActiveTab} deviceData={item} />
//                         )}
//                     </div>
//                 ))}
//             </div></>
//     );
// };

// export default App;

// import React, { useState, useEffect } from 'react';
// import './dash.css';
// import AWS from 'aws-sdk';

// AWS.config.update({
//     region: 'ap-south-1',
//     accessKeyId: 'YOUR_ACCESS_KEY_ID',
//     secretAccessKey: 'YOUR_SECRET_ACCESS_KEY',
// });

// const dynamodb = new AWS.DynamoDB.DocumentClient();

const App = () => {
    const [items, setItems] = useState([]);
    const [activeTab, setActiveTab] = useState('home');
    
    //this data is fetching from the local storage
    const UserEmail = JSON.parse(localStorage.getItem('data'));

    useEffect(() => {
        const params = {
            TableName: 'devices',
        };

        dynamodb.scan(params, (error, data) => {
            if (error) {
                console.error('Error fetching items:', error);
            } else {
                // Filter items based on user's email
                const filteredItems = data.Items.filter(item => item.email === UserEmail.email);
                setItems(filteredItems);
            }
        });
    }, [UserEmail]);

    return (
        <div>
            <div className='header'>
                <h1 className='email'>&#128231;{UserEmail.email}</h1>
                <h1 className='app'> ThingSync</h1>
            </div>
            <div className="container">
                <div className='abc'></div>
                <div className="tabs">
                    <button
                        className={activeTab === 'home' ? 'active' : ''}
                        onClick={() => setActiveTab('home')}
                    >
                        &#127968;HOME
                    </button>
                    <button
                        className={activeTab === 'office' ? 'active' : ''}
                        onClick={() => setActiveTab('office')}
                    >
                        &#127970;OFFICE
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
        </div>
    );
};

export default App;

