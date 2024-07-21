import React, { useState, useEffect } from 'react';
import axios from 'axios';
import avatarr from '../../assets/avatar.png';

const UserProfile = () => {
    const [User, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      password: '',
      phoneno: '',
      city: '',
      state: '',
      address: '',
    });

    useEffect(() => {
        const fetchUserProfile = async () => {
            const token_data = localStorage.getItem('Token_key');
            const params = {
                id: token_data,
            };
            try {
                const response = await axios.get('http://localhost:4000/user/Userprofile', { params });
                setUser(response.data);
                setFormData(response.data);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false); // Set loading to false whether successful or not
            }
        };

        fetchUserProfile();
    }, []);

    const handleEditClick = () => {
        setIsEditing(!isEditing);
    };

    const handleChange = (e) => {
        const updatedFormData = { ...formData };
        updatedFormData[e.target.name] = e.target.value;
        setFormData(updatedFormData);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token_data = localStorage.getItem('Token_key');
            const response = await axios.post('http://localhost:4000/user/editProfile', { id: token_data, ...formData });
            setUser(response.data);
            setIsEditing(false);
        } catch (error) {
            console.error(error);
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-900"></div>
            </div>
        );
    }

    if (!User) {
        return <div>Error: Unable to fetch User profile</div>;
    }

    const { name, email, phoneno } = User;

    return (
        <div className="" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1679403855896-49b0bd34744a?q=80&w=1793&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}>
            <div className="flex flex-col items-center justify-center min-h-screen py-14">
                <div className="max-w-md w-full bg-white shadow-md rounded-lg overflow-hidden">
                    <div className="px-6 py-4">
                        <div className="flex items-center justify-center">
                            <img className="w-24 h-24 rounded-full" src={avatarr} alt="Avatar" />
                        </div>
                        <div className="text-center mt-4">
                            <h2 className="text-xl font-semibold text-gray-800">{name}</h2>
                            <p className="text-sm text-gray-600 mt-1">{email}</p>
                            <p className="text-sm text-gray-600 mt-1">{phoneno}</p>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="mt-6">
                                <label className="block text-sm font-medium text-gray-700">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                    disabled={!isEditing}
                                />
                            </div>
                            <div className="mt-6">
                                <label className="block text-sm font-medium text-gray-700">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                    disabled={!isEditing}
                                />
                            </div>
                            <div className="mt-6">
                                <label className="block text-sm font-medium text-gray-700">Phone no</label>
                                <input
                                    type="text"
                                    name="phoneno"
                                    value={formData.phoneno}
                                    onChange={handleChange}
                                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                    disabled={!isEditing}
                                />
                            </div>
                            <div className="mt-6">
                                <label className="block text-sm font-medium text-gray-700">Address</label>
                                <input
                                    type="text"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                    disabled={!isEditing}
                                />
                            </div>
                            <div className="mt-6">
                                <label className="block text-sm font-medium text-gray-700">City</label>
                                <input
                                    type="text"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                    disabled={!isEditing}
                                />
                            </div>
                            <div className="mt-6">
                                <label className="block text-sm font-medium text-gray-700">State</label>
                                <input
                                    type="text"
                                    name="state"
                                    value={formData.state}
                                    onChange={handleChange}
                                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                    disabled={!isEditing}
                                />
                            </div>
                            <div className="mt-6">
                                <button
                                    type="button"
                                    onClick={isEditing ? handleSubmit : handleEditClick}
                                    className={`bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 ml-4 inline-flex items-center border border-transparent text-sm font-medium rounded-md ${isEditing ? 'bg-blue-500 hover:bg-blue-700' : 'text-gray-700 bg-blue-500 hover:bg-blue-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}>
                                    {isEditing ? 'Save Changes' : 'Edit Profile'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
