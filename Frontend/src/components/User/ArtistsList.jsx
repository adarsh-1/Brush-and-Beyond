import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ArtistsList() {
  const [artists, setArtists] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Add a state for loading

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        setIsLoading(true); // Set loading state to true before fetching data
        const response = await axios.get('http://localhost:4000/artist/getAllArtists');
        setArtists(response.data);
      } catch (error) {
        console.error('Error fetching artists:', error);
      } finally {
        setIsLoading(false); // Set loading state to false after fetching data
      }
    };
    fetchArtists();
  }, []);

  return (
    <div className="container mx-auto px-8 py-14 bg-gray-100">
      <h1 className="text-3xl font-semibold text-center mb-8">Artist Lists</h1>
      {isLoading ? ( // Render loader spinner if isLoading is true
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-900"></div>
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
                <Link
                  to={`/user/ArtistsArtwork/${artist.id}`}
                  className="mt-4 block bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
                >
                  View Artwork
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
    
  );
}

export default ArtistsList;
