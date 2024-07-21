import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function CheckoutPage() {
  const { artworkId } = useParams();
  const navigate = useNavigate();
  const [artwork, setArtwork] = useState(null);
  const [formData, setFormData] = useState({
    fullName: '',
    emailAddress: '',
    contactNumber: '',
    address: '',
    pincode: '',
    city: '',
    state: '',
    country: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvv: '',
    userId: '',
    productId: artworkId,
  });
  const [formErrors, setFormErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchArtwork = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/artwork/${artworkId}`);
        setArtwork(response.data);
      } catch (error) {
        console.error('Error fetching artwork:', error);
      }
    };
    fetchArtwork();
  }, [artworkId]);

  useEffect(() => {
    const userId = localStorage.getItem('Token_key');
    setFormData((prevFormData) => ({
      ...prevFormData,
      userId: userId || '',
    }));

    if (userId) {
      checkUserData(userId);
    }
  }, []);

  const checkUserData = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:4000/checkout/getUserCheckoutData/${userId}`);
      const userData = response.data;
      if (userData && Object.keys(userData).length > 0) {
        setFormData((prevFormData) => ({
          ...prevFormData,
          fullName: userData.fullName || '',
          emailAddress: userData.emailAddress || '',
          contactNumber: userData.contactNumber || '',
          address: userData.address || '',
          pincode: userData.pincode || '',
          city: userData.city || '',
          state: userData.state || '',
          country: userData.country || '',
        }));
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Limit input length for specific fields
    if (name === 'contactNumber' && value.length > 10) return;
    if (name === 'cardNumber' && value.length > 16) return;
    if (name === 'cardCvv' && value.length > 3) return;

    setFormData({ ...formData, [name]: value });
    setFormErrors({ ...formErrors, [name]: '' });
  };

  const handleSubmit = async () => {
    const errors = {};
    const { fullName, emailAddress, contactNumber, pincode, city, state, country, cardNumber, cardExpiry, cardCvv } = formData;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailAddress)) {
      errors.emailAddress = 'Invalid email format';
    }

    const nameRegex = /^[a-zA-Z\s]+$/;
    if (!nameRegex.test(fullName)) {
      errors.fullName = 'Name should only contain letters';
    }

    if (!nameRegex.test(city)) {
      errors.city = 'Invalid city format';
    }
    if (!nameRegex.test(state)) {
      errors.state = 'Invalid state format';
    }
    if (!nameRegex.test(country)) {
      errors.country = 'Invalid country format';
    }

    const contactRegex = /^\d{10}$/;
    if (!contactRegex.test(contactNumber)) {
      errors.contactNumber = 'Contact number should be a 10-digit number';
    }

    const pincodeRegex = /^\d{6}$/;
    if (!pincodeRegex.test(pincode)) {
      errors.pincode = 'Pincode should be a 6-digit number';
    }

    const cardNumberRegex = /^\d{16}$/;
    if (!cardNumberRegex.test(cardNumber)) {
      errors.cardNumber = 'Card number should be a 16-digit number';
    }

    const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
    if (!expiryRegex.test(cardExpiry)) {
      errors.cardExpiry = 'Expiry should be in MM/YY format';
    }

    const cvvRegex = /^\d{3}$/;
    if (!cvvRegex.test(cardCvv)) {
      errors.cardCvv = 'CVV should be a 3-digit number';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    try {
      setLoading(true);
      await axios.post('http://localhost:4000/checkout/saveCheckout', formData);
      setTimeout(() => {
        setLoading(false);
        navigate('/user/OrderPlaced');
        console.log('Checkout data sent successfully:', formData);
      }, 3000);
    } catch (error) {
      console.error('Error sending checkout data:', error);
      setLoading(false);
    }
  };

  return (
    <>
      {loading && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-25 z-50">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-900"></div>
        </div>
      )}
      <div className="min-h-screen flex justify-center items-center py-14">
        {artwork && (
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row rounded-lg overflow-hidden shadow-2xl">
            <div className="w-full md:w-1/2 bg-gradient-to-br from-indigo-600 to-purple-800 p-8 flex flex-col justify-center items-center">
              <h1 className="text-4xl font-bold text-white mb-4">{artwork.title}</h1>
              <img
                className="w-full max-w-md mb-6 rounded-lg shadow-lg"
                src={`http://localhost:4000/uploads/artworks/${artwork.image}`}
                alt={artwork.title}
              />
              <p className="text-2xl font-semibold text-white mb-6">Price: ₹{artwork.price}</p>
              <p className="text-lg text-gray-200 mb-6">{artwork.description}</p>
            </div>
            <div className="w-full md:w-1/2 bg-white p-8">
              <h2 className="text-3xl font-semibold mb-6 text-gray-800">Contact & Address Details</h2>
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                className="w-full mb-4 p-3 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
                value={formData.fullName}
                onChange={handleChange}
              />
              {formErrors.fullName && <span className="text-red-500">{formErrors.fullName}</span>}
              <input
                type="email"
                name="emailAddress"
                placeholder="Email Address"
                className="w-full mb-4 p-3 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
                value={formData.emailAddress}
                onChange={handleChange}
              />
              {formErrors.emailAddress && <span className="text-red-500">{formErrors.emailAddress}</span>}
              <input
                type="text"
                name="contactNumber"
                placeholder="Contact Number"
                className="w-full mb-4 p-3 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
                value={formData.contactNumber}
                onChange={handleChange}
                maxLength={10} 
              />
              {formErrors.contactNumber && <span className="text-red-500">{formErrors.contactNumber}</span>}
              <textarea
                name="address"
                placeholder="Address"
                className="w-full mb-4 p-3 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
                value={formData.address}
                onChange={handleChange}
              ></textarea>
              {formErrors.address && <span className="text-red-500">{formErrors.address}</span>}
              <div className="flex mb-4">
                <input
                  type="text"
                  name="pincode"
                  placeholder="Pincode"
                  className="w-1/2 mr-2 p-3 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
                  value={formData.pincode}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  className="w-1/2 ml-2 p-3 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
                  value={formData.city}
                  onChange={handleChange}
                />
              </div>
              {formErrors.pincode && <span className="text-red-500">{formErrors.pincode}</span>}
              {formErrors.city && <span className="text-red-500">{formErrors.city}</span>}
              <div className="flex mb-4">
                <input
                  type="text"
                  name="state"
                  placeholder="State"
                  className="w-1/2 mr-2 p-3 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
                  value={formData.state}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="country"
                  placeholder="Country"
                  className="w-1/2 ml-2 p-3 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
                  value={formData.country}
                  onChange={handleChange}
                />
              </div>
              {formErrors.state && <span className="text-red-500">{formErrors.state}</span>}
              {formErrors.country && <span className="text-red-500">{formErrors.country}</span>}
              <h2 className="text-3xl font-semibold mb-6 text-gray-800">Payment Details</h2>
              <input
                type="text"
                name="cardNumber"
                placeholder="Card Number (0000-0000-0000-xxxx)"
                className="w-full mb-4 p-3 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
                value={formData.cardNumber}
                onChange={handleChange}
                maxLength={16}
              />
              {formErrors.cardNumber && <span className="text-red-500">{formErrors.cardNumber}</span>}
              <div className="flex mb-4">
                <input
                  type="text"
                  name="cardExpiry"
                  placeholder="Expiry (MM/YY)"
                  className="w-1/2 mr-2 p-3 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
                  value={formData.cardExpiry}
                  onChange={handleChange}
                />
                <input
                  type="password"
                  name="cardCvv"
                  placeholder="CVV"
                  className="w-1/2 ml-2 p-3 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
                  value={formData.cardCvv}
                  onChange={handleChange}
                  maxLength={3}
                />
              </div>
              {formErrors.cardExpiry && <span className="text-red-500">{formErrors.cardExpiry}</span>}
              {formErrors.cardCvv && <span className="text-red-500">{formErrors.cardCvv}</span>}
              <button
                className="w-full bg-indigo-600 text-white px-4 py-3 rounded hover:bg-indigo-700 focus:outline-none shadow-md"
                onClick={handleSubmit}
              >
                Confirm order
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default CheckoutPage;
