import { useEffect } from 'react';
import api, { endpoints } from './api';

function App() {
  useEffect(() => {
    const testFetch = async () => {
      try {
        const response = await api.get(endpoints.trending);
        console.log("API Connection Successful:", response.data.results);
      } catch (error) {
        console.error("API Connection Failed:", error);
      }
    };
    
    testFetch();
  }, []);

  return (
    <div className="min-h-screen bg-cinema-black text-white flex items-center justify-center">
      <h1 className="text-4xl font-bold text-cinema-red tracking-tighter">
        Check your Console (F12)
      </h1>
    </div>
  )
}
export default App