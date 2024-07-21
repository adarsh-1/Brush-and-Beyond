import React, { useState } from 'react';
import axios from 'axios';

const UploadEvents = () => {
  const [eventData, setEventData] = useState({
    eventName: '',
    eventVenue: '',
    eventDescription: '',
    eventOrganiser: '',
    eventDateTime: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData({ ...eventData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/event/addEvent', eventData);
      console.log(response.data);
      setEventData({
        eventName: '',
        eventVenue: '',
        eventDescription: '',
        eventOrganiser: '',
        eventDateTime: '',
      });
    } catch (error) {
      console.error('Error posting event details:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{backgroundImage: "url('https://images.unsplash.com/photo-1680792563719-288027b2a090?q=80&w=1793&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')"}}>
      <div className="max-w-md w-full bg-white shadow-md rounded-lg overflow-hidden">
        <div className="px-6 py-4">
          <h2 className="text-2xl font-semibold text-center text-gray-800 mb-2">Add Event</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="eventName" className="block text-sm font-medium text-gray-700">Event Name</label>
              <input type="text" name="eventName" id="eventName" value={eventData.eventName} onChange={handleChange} className="w-full p-0.5 border border-gray-300 rounded-md placeholder-font-light placeholder-text-gray-500" />
            </div>
            <div>
              <label htmlFor="eventVenue" className="block text-sm font-medium text-gray-700">Event Venue</label>
              <input type="text" name="eventVenue" id="eventVenue" value={eventData.eventVenue} onChange={handleChange} className="w-full p-0.5 border border-gray-300 rounded-md placeholder-font-light placeholder-text-gray-500" />
            </div>
            <div>
              <label htmlFor="eventDescription" className="block text-sm font-medium text-gray-700">Event Description</label>
              <textarea name="eventDescription" id="eventDescription" rows="3" value={eventData.eventDescription} onChange={handleChange} className="w-full p-0.5 border border-gray-300 rounded-md placeholder-font-light placeholder-text-gray-500"></textarea>
            </div>
            <div>
              <label htmlFor="eventOrganiser" className="block text-sm font-medium text-gray-700">Event Organiser</label>
              <input type="text" name="eventOrganiser" id="eventOrganiser" value={eventData.eventOrganiser} onChange={handleChange} className="w-full p-0.5 border border-gray-300 rounded-md placeholder-font-light placeholder-text-gray-500" />
            </div>
            <div>
              <label htmlFor="eventDateTime" className="block text-sm font-medium text-gray-700">Event Date</label>
              <input type="date" name="eventDateTime" id="eventDateTime" value={eventData.eventDateTime} onChange={handleChange} className="w-full p-0.5 border border-gray-300 rounded-md placeholder-font-light placeholder-text-gray-500" />
            </div>
            <div className="flex justify-end">
              <button type="submit" className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UploadEvents;
