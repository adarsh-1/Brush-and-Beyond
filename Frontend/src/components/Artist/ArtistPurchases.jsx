import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ArtistPurchases() {
  const [checkouts, setCheckouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const tokenKey = localStorage.getItem('Token_key'); 

  useEffect(() => {
    const fetchCheckouts = async () => {
      try {
        const response = await axios.get('http://localhost:4000/checkout/getAllCheckouts');
        setCheckouts(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching checkouts:', error);
        setLoading(false);
      }
    };

    fetchCheckouts();
  }, []);

  useEffect(() => {
    const fetchArtistIds = async () => {
      const updatedCheckouts = await Promise.all(
        checkouts.map(async (checkout) => {
          const updatedProducts = await Promise.all(
            checkout.productId.map(async (product) => {
              try {
                const response = await axios.get(`http://localhost:4000/artwork/${product.productId}`);
                const id = response.data.id; 
                const title = response.data.title; 
                return { ...product, id, title };
              } catch (error) {
                console.error('Error fetching artistId:', error);
                return { ...product, id: null };
              }
            })
          );
          return { ...checkout, productId: updatedProducts };
        })
      );
      setCheckouts(updatedCheckouts);
    };

    if (!loading && checkouts.length > 0) {
      fetchArtistIds();
    }
  }, [checkouts, loading]);

  
  const filteredCheckouts = checkouts.filter((checkout) => {
    return checkout.productId.some((product) => product.id === tokenKey);
  });

  return (
    <div className="container h-screen mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Purchases Artworks</h1>
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <>
          {filteredCheckouts.length === 0 ? (
            <div className="flex justify-center items-center h-full">
              <p className="text-gray-500  flex justify-center items-center h-96 text-9xl my-6 text-center">There are no purchases Artworks...</p>
            </div>
          ) : (
            <ul className="grid gap-4">
              {filteredCheckouts.map((checkout) => (
                <li key={checkout._id} className="bg-gray-100 rounded-lg p-4 shadow-md">
                  <p className="text-lg font-semibold">User ID: {checkout.userId}</p>
                  <p className="mt-2">Name: {checkout.fullName}</p>
                  <ul className="mt-4">
                    {checkout.productId.map((product) => (
                      product.id === tokenKey && (
                        <li key={product._id} className="border-t border-gray-300 pt-4 mt-4">
                          <p className="text-sm text-gray-600">
                            ProductID: {product.productId} - ProductTitle: {product.title} - Purchase Date&Time: {new Date(product.dateTime).toLocaleString()}
                          </p>
                        </li>
                      )
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
}

export default ArtistPurchases;
