import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function ArtworkList() {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/artwork/showArtworks`);
        setArtworks(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching artworks:', error);
      }
    };

    fetchArtworks();
  }, []);

  if (loading) {
    return (
      <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-900"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-8 py-14 bg-gray-100">
      <h1 className="text-3xl font-semibold text-center mb-8">All Artworks</h1>
      {artworks.length === 0 ? (
        <div className="flex justify-center items-center h-full">
          <p className="text-gray-500  flex justify-center items-center h-96 text-9xl my-6 text-center">This artist has no artworks...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {artworks.map((artwork) => (
            <div key={artwork.id} className="bg-white rounded-lg shadow-lg transform transition duration-300 hover:scale-105">
              <img className="w-full h-64 object-cover rounded-t-lg mb-4" src={`http://localhost:4000/uploads/artworks/${artwork.image}`} alt={artwork.title} />
              <h2 className="text-lg font-semibold mb-2 mx-5">{artwork.title}</h2>
              <div className="flex justify-between items-center mx-5 mb-6">
                <p className="text-lg font-semibold">₹{artwork.price}</p>
                <Link to={`/user/checkout/${artwork._id}`} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Buy Now</Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ArtworkList;
