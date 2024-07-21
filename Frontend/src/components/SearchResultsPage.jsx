import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

function SearchResultsPage() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const searchKeyword = searchParams.get('keyword');
    const [artists, setArtists] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // State for loading indicator

    useEffect(() => {
        if (searchKeyword) {
            axios.get(`http://localhost:4000/artist/getAllArtists`)
                .then(response => {
                    const filteredArtists = response.data.filter(artist =>
                        artist.city.toLowerCase().includes(searchKeyword.toLowerCase())
                    );
                    setArtists(filteredArtists);
                    setIsLoading(false); // Set loading state to false after data is fetched
                })
                .catch(error => {
                    console.error('Error fetching search results:', error);
                    setIsLoading(false); // Set loading state to false on error
                });
        }
    }, [searchKeyword]);

    if (!searchKeyword) {
        return (
            <div className="text-center h-screen py-14 bg-gray-100">
                <h1 className="text-2xl font-semibold">Search keyword is missing.</h1>
                <p className="text-sm text-gray-500">Please provide a valid search keyword.</p>
            </div>
        );
    }

    return (
        <div className="container h-screen mx-auto px-8 py-14 bg-gray-100">
            <h1 className="text-3xl font-semibold text-center mb-8">Search Results for "{searchKeyword}"</h1>
            {isLoading ? ( // Render loader spinner if isLoading is true
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-900"></div>
                </div>
            ) : artists.length === 0 ? ( // Display message when no artists found
                <div className="text-center">
                    <h2 className="text-lg font-semibold">No artists found.</h2>
                    <p className="text-sm text-gray-500">Please try a different search keyword.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                    {artists.map((artist) => (
                        <div key={artist.id} className="bg-white rounded-lg shadow-lg p-6 transform transition duration-300 hover:scale-105">
                            <div className="flex justify-center">
                                <img
                                    className="h-32 w-32 rounded-full object-cover"
                                    src={`http://localhost:4000/uploads/avatars/${artist.avatar}`}
                                    alt={artist.name}
                                />
                            </div>
                            <div className="text-center mt-4">
                                <h2 className="text-lg font-semibold">{artist.name}</h2>
                                <p className="text-sm text-gray-500">{artist.email}</p>
                                <p className="text-sm text-gray-500">{artist.skills}</p>
                                <p className="text-sm text-gray-500">{artist.experience} Year experience</p>
                                <p className="text-sm text-gray-500">{artist.city}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default SearchResultsPage;
