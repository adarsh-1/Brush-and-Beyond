import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ArtistGrid() {
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const response = await axios.get('http://localhost:4000/artist/getAllArtists');
        if (response.status === 200) {
          // Limit the number of artists to 6
          const limitedArtists = response.data.slice(0, 6);
          setArtists(limitedArtists);
        } else {
          throw new Error('Failed to fetch artists');
        }
      } catch (error) {
        console.error('Error fetching artists:', error);
      }
    };

    fetchArtists();
  }, []);

  return (
    <div className="container mx-auto py-10 px-10">
      <h2 className="text-3xl font-semibold text-gray-800 mb-4 text-center">Featured Artists</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 my-6">
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
              
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ArtistGrid;
