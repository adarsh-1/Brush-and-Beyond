import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:4000/event/showEvent');
        console.log(response.data);
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };
    fetchEvents();
  }, []);

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1531796311868-83672cd144f3?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="container mx-auto py-10 px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-white shadow-lg rounded-lg overflow-hidden transform transition-transform hover:scale-105 opacity-90 cursor-pointer"
            >
              <div className="p-6">
                <h2 className="text-xl font-bold mb-2 text-gray-800">{event.eventName}</h2>
                <p className="text-gray-600 mb-2">
                  {new Date(event.eventDateTime).toLocaleDateString()}
                </p>
                <p className="text-gray-700 mb-4">{event.eventDescription}</p>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-gray-700 mb-1">Venue:</p>
                    <p className="text-gray-800 font-semibold">{event.eventVenue}</p>
                  </div>
                  <div>
                    <p className="text-gray-700 mb-1">Organiser:</p>
                    <p className="text-gray-800 font-semibold">{event.eventOrganiser}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;