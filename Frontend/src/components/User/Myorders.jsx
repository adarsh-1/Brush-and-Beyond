import React, { useState, useEffect } from 'react';
import axios from 'axios';

function OrderSection() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userId = localStorage.getItem('Token_key');
    const fetchOrders = async () => {
      try {
        // Fetch checkout data for the logged-in user
        const response = await axios.get(`http://localhost:4000/checkout/getUserCheckoutData/${userId}`);
        const userData = response.data;

        // Check if userData.productId is an array
        if (Array.isArray(userData.productId)) {
          const productIds = userData.productId;

          // Fetch product details for each product ID
          const productDetailsPromises = productIds.map((order) =>
            axios.get(`http://localhost:4000/artwork/${order.productId}`)
          );

          const productDetailsResponses = await Promise.all(productDetailsPromises);
          const products = productDetailsResponses.map((response, index) => ({
            ...response.data,
            dateTime: userData.productId[index].dateTime,
          }));

          // Set the orders with product details
          setOrders(products);
        } else {
          console.log('No orders found for the user.');
          setOrders([]); // Set orders to an empty array if no orders found
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      {loading ? (
        <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-25 z-50">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-900"></div>
        </div>
      ) : (
        <div className="container mx-auto px-4 py-8">
          <h2 className="text-2xl font-semibold mb-4">Your Orders</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {orders.map((product) => (
              <div key={product._id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <img
                  className="w-full h-48 object-cover object-center"
                  src={`http://localhost:4000/uploads/artworks/${product.image}`}
                  alt={product.title}
                />
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-2">{product.title}</h3>
                  <p className="text-gray-600 mb-2">Price: ₹{product.price}</p>
                  <p className="text-gray-600 mb-2">Date & Time: {new Date(product.dateTime).toLocaleString()}</p>
                  <p className="text-gray-600 mb-4">Description: {product.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default OrderSection;
