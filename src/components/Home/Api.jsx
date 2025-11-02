import { useEffect } from 'react';

export default function Api() {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://navbharat-backend.onrender.com/');
        const data = await response.json();
        console.log('API Response:', data);
      } catch (error) {
        console.error('API Error:', error);
      }
    };

    // Initial fetch
    fetchData();

    // Set up interval for fetching every 8 seconds
    const interval = setInterval(() => {
      fetchData();
    }, 8000);

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, []);

  return null;
}