import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
    const [userCount, setUserCount] = useState(0); // Initialize user count state to 0
    const [feedbackCount, setFeedbackCount] = useState(0);
    const [eventCount, setEventCount] = useState(0);
    const [recentActivities, setRecentActivities] = useState([]);

    useEffect(() => {
        // Fetch upcoming events count
        axios.get('http://localhost:4000/event/countUpcomingEvents')
            .then(response => {
                setEventCount(response.data.count); 
            })
            .catch(error => {
                console.error('Error fetching upcoming events count:', error);
            });

        // Fetch total feedback count from the backend API
        axios.get('http://localhost:4000/feedback/getTotalFeedbackCount')
            .then(response => {
                setFeedbackCount(response.data.count); 
            })
            .catch(error => {
                console.error('Error fetching total feedback count:', error);
            });

        // Fetch user count from the backend API
        axios.get('http://localhost:4000/user/getUserCount')
            .then(response => {
                setUserCount(response.data.count); 
            })
            .catch(error => {
                console.error('Error fetching user count:', error);
            });

        // Simulated recent activities
        setRecentActivities([
            { id: 1, action: 'Added new event: Art Exhibition' },
            { id: 2, action: 'Received feedback from John Doe' },
            { id: 3, action: 'Updated user profile for Jane Smith' }
        ]); 
    }, []); 

    return (
        <div className="p-10">
            <h1 className="text-3xl font-semibold mb-6">Admin Dashboard</h1>

            {/* Overview Section */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h2 className="text-xl font-semibold mb-4">Overview</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-blue-200 p-4 rounded-lg">
                        <h3 className="text-lg font-semibold mb-2">Total Users</h3>
                        <p className="text-2xl font-bold">{userCount}</p>
                    </div>
                    <div className="bg-green-200 p-4 rounded-lg">
                        <h3 className="text-lg font-semibold mb-2">Total Feedbacks</h3>
                        <p className="text-2xl font-bold">{feedbackCount}</p>
                    </div>
                    <div className="bg-yellow-200 p-4 rounded-lg">
                        <h3 className="text-lg font-semibold mb-2">Upcoming Events</h3>
                        <p className="text-2xl font-bold">{eventCount}</p>
                    </div>
                </div>
            </div>

            {/* Recent Activities Section */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h2 className="text-xl font-semibold mb-4">Recent Activities</h2>
                <ul className="divide-y divide-gray-200">
                    {recentActivities.map((activity) => (
                        <li key={activity.id} className="py-2">
                            {activity.action}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Quick Actions Section */}
            <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                        Add New Event
                    </button>
                    <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
                        View Contact Details
                    </button>
                    <button className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600">
                        View Feedback Details
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
