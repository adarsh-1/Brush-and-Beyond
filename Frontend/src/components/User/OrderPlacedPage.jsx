import React from 'react';
import { Link } from 'react-router-dom';

function OrderPlacedPage() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center py-20">
      <div className="bg-green-100 rounded-full p-4 mb-8 animate-bounce">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12 text-green-500"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M7.146 12.854a.5.5 0 0 1-.708 0L3.146 9.707a.5.5 0 0 1 .708-.708l3.001 3a.5.5 0 0 0 .707 0l7.001-7a.5.5 0 1 1 .708.708l-7.5 7.5z"
          />
        </svg>
      </div>
      <h1 className="text-3xl md:text-5xl font-semibold mb-8 text-center">Order Placed Successfully!</h1>
      <p className="text-lg md:text-xl text-center mb-8">Thank you for shopping with us.</p>
      <Link
        to="/user"
        className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-md shadow-md transition duration-300 ease-in-out"
      >
        Continue Shopping
      </Link>
    </div>
  );
}

export default OrderPlacedPage;
