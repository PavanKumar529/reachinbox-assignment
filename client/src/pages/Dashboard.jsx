import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [threads, setThreads] = useState([]);

  useEffect(() => {
    const fetchThreads = async () => {
      try {
        const response = await axios.get('/onebox/list');
        setThreads(response.data);
      } catch (error) {
        console.error('Error fetching threads:', error);
      }
    };
    fetchThreads();
  }, []);

  const handleDelete = async (threadId) => {
    try {
      await axios.delete(`/onebox/${threadId}`);
      setThreads(threads.filter(thread => thread.id !== threadId));
    } catch (error) {
      console.error('Error deleting thread:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-4">Onebox Dashboard</h1>
      <div className="space-y-4">
        {threads.map((thread) => (
          <div key={thread.id} className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-semibold">{thread.subject}</h2>
            <p className="text-gray-600">{thread.body}</p>
            <div className="mt-2">
              <button
                onClick={() => handleDelete(thread.id)}
                className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-700"
              >
                Delete (D)
              </button>
              <button
                className="ml-2 bg-green-500 text-white py-1 px-3 rounded hover:bg-green-700"
              >
                Reply (R)
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
