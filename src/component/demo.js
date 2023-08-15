import React, { useState, useEffect } from 'react';
import AWS from 'aws-sdk';

AWS.config.update({
  region: 'ap-south-1',
  accessKeyId: 'AKIAUQ74A6PR6FMMPQEP',
  secretAccessKey: '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',
});

const dynamodb = new AWS.DynamoDB.DocumentClient();

function App() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const params = {
      TableName: 'devices',
    };

    dynamodb.scan(params, (error, data) => {
      if (error) {
        console.error('Error fetching items:', error);
      } else {
        setItems(data.Items);
        console.log("--gf--",data.Items)
      }
    });
  }, []);

  return (
    <div>
      <h1>DynamoDB Items</h1>
      <ul>
        {items.map(item => (
          <><li key={item.id}>{item.name}</li>
          <li>{item.deviceId}</li>
          <li>{item.fanSpeed}</li></>
        ))}
      </ul>
    </div>
  );
}

export default App;
