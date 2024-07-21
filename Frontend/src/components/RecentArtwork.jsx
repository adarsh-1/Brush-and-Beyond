import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function RecentArtworks() {
  const [artworks, setArtworks] = useState([]);

  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        const response = await axios.get('http://localhost:4000/artwork/showArtworks');
        if (response.status === 200) {
          const data = response.data;
          // Sort artworks by the upload date to get the most recent ones first
          const sortedArtworks = data.sort((a, b) => new Date(b.uploadDate) - new Date(a.uploadDate));
          // Get the latest 6 artworks
          setArtworks(sortedArtworks.slice(0, 6));
        } else {
          throw new Error('Failed to fetch artworks');
        }
      } catch (error) {
        console.error('Error fetching artworks:', error);
      }
    };

    fetchArtworks();
  }, []);

  return (
    <div className="container mx-auto my-10 px-8">
      <h2 className="text-3xl font-semibold text-gray-800 mb-4 text-center">Recent Artworks</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 my-6">
        {artworks.map((artwork) => (
          <div key={artwork.id} className="bg-white rounded-lg shadow-lg transform transition duration-300 hover:scale-105">
            <img
              className="w-full h-64 object-cover rounded-t-lg mb-4"
              src={`http://localhost:4000/uploads/artworks/${artwork.image}`}
              alt={artwork.title}
            />
            <h2 className="text-lg font-semibold mb-2 mx-5">{artwork.title}</h2>
            <div className="flex justify-between items-center mx-5 mb-6">
              <p className="text-lg font-semibold">₹{artwork.price}</p>
              <Link
                to="/userlogin"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Buy Now
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecentArtworks;
