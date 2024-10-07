// service1/src/App.js
import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [service1Data, setService1Data] = useState({});
  const [service2Data, setService2Data] = useState({});

  useEffect(() => {
    // Fetch system info for Service1 (itself)
    const fetchService1Info = async () => {
      try {
        const ip_address = (await (await fetch('/api/ip')).json()).ip;
        const processes = (await (await fetch('/api/processes')).json()).processes;
        const disk_space = (await (await fetch('/api/disk')).json()).disk_space;
        const uptime = (await (await fetch('/api/uptime')).json()).uptime;
  
        setService1Data({
          ip_address,
          processes,
          disk_space,
          uptime,
        });
      } catch (error) {
        console.error('Error fetching Service1 info:', error);
      }
    };
  
    fetchService1Info();
  
    // Fetch system info for Service2
    const fetchService2Info = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/system-info');
        const data = await response.json();
        setService2Data(data);
      } catch (error) {
        console.error('Error fetching Service2 info:', error);
      }
    };
  
    fetchService2Info();
  }, []);
  

  return (
    <div className="App">
      <h1>Service1: System Information</h1>
      <h2>Own Info (Service1)</h2>
      <pre>{JSON.stringify(service1Data, null, 2)}</pre>
      <h2>Service2 Info</h2>
      <pre>{JSON.stringify(service2Data, null, 2)}</pre>
    </div>
  );
}

export default App;
