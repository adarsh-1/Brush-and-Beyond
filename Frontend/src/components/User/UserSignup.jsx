import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function UserSignup() {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneno, setPhoneno] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const validateName = (name) => {
    const regex = /^[a-zA-Z\s]+$/;
    return regex.test(name);
  };

  const validatePhoneNo = (phoneno) => {
    const regex = /^\d{10}$/;
    return regex.test(phoneno);
  };

  const validateStringInput = (value) => {
    const regex = /^[a-zA-Z\s]+$/;
    return regex.test(value);
  };

  const handleSignup = async () => {
    try {
      // Mandatory field validation
      if (!id || !name || !email || !password || !phoneno || !address || !city || !state) {
        setError('All fields are mandatory.');
        return;
      }

      if (!validateEmail(email)) {
        setError('Please enter a valid email address.');
        return;
      }

      if (!validatePassword(password)) {
        setError('Password must be at least 6 characters.');
        return;
      }

      if (!validateStringInput(name)) {
        setError('Name should only contain letters.');
        return;
      }

      if (!validatePhoneNo(phoneno)) {
        setError('Phone number should be a 10-digit number.');
        return;
      }

      if (!validateStringInput(city)) {
        setError('City should only contain letters.');
        return;
      }

      if (!validateStringInput(state)) {
        setError('State should only contain letters.');
        return;
      }

      const response = await axios.post('http://localhost:4000/User/UserSignup', {
        id,
        name,
        email,
        password,
        phoneno,
        address,
        city,
        state,
      });

      if (response.status === 201) {
        setId('');
        setName('');
        setEmail('');
        setPassword('');
        setPhoneno('');
        setAddress('');
        setCity('');
        setState('');
        setError(null);
        navigate('/userlogin');
      } else {
        setError(response.data);
      }
    } catch (error) {
      // API error, display error message
      setError(error.response.data);
    }
  };

  const handlePhoneChange = (e) => {
    const input = e.target.value;
    if (/^\d{0,10}$/.test(input)) {
      setPhoneno(input);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-100">
      <div className="relative flex flex-col my-16 mx-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0">
        {/* Left side */}
        <div className="flex flex-col justify-center p-10 md:px-16">
          <span className="mb-1.5 text-4xl font-bold">User Signup</span>
          <span className="font-light text-gray-400 mb-5">
            Create your account
          </span>
          {/* Input fields */}
          <div className="py-1.5">
            <span className="mb-2 text-md">ID</span>
            <input
              type="text"
              className="w-full p-0.5 border border-gray-300 rounded-md placeholder-font-light placeholder-text-gray-500"
              name="id"
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
          </div>
          <div className="py-1.5">
            <span className="mb-2 text-md">Name</span>
            <input
              type="text"
              className="w-full p-0.5 border border-gray-300 rounded-md placeholder-font-light placeholder-text-gray-500"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="py-1.5">
            <span className="mb-2 text-md">Email</span>
            <input
              type="text"
              className="w-full p-0.5 border border-gray-300 rounded-md placeholder-font-light placeholder-text-gray-500"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="py-1.5">
            <span className="mb-2 text-md">Password</span>
            <input
              type="password"
              name="password"
              className="w-full p-0.5 border border-gray-300 rounded-md placeholder-font-light placeholder-text-gray-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="py-1.5">
            <span className="mb-2 text-md">Phone Number</span>
            <input
              type="text"
              className="w-full p-0.5 border border-gray-300 rounded-md placeholder-font-light placeholder-text-gray-500"
              name="phoneno"
              value={phoneno}
              onChange={handlePhoneChange}
            />
          </div>
          <div className="py-1.5">
            <span className="mb-2 text-md">Address</span>
            <input
              type="text"
              className="w-full p-0.5 border border-gray-300 rounded-md placeholder-font-light placeholder-text-gray-500"
              name="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="py-1.5">
            <span className="mb-2 text-md">City</span>
            <input
              type="text"
              className="w-full p-0.5 border border-gray-300 rounded-md placeholder-font-light placeholder-text-gray-500"
              name="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <div className="py-1.5">
            <span className="mb-2 text-md">State</span>
            <input
              type="text"
              className="w-full p-0.5 border border-gray-300 rounded-md placeholder-font-light placeholder-text-gray-500"
              name="state"
              value={state}
              onChange={(e) => setState(e.target.value)}
            />
          </div>
          {error && <div className="text-red-500 mb-4">{error}</div>}
          {/* Signup button */}
          <button
            onClick={handleSignup}
            className="w-full bg-black text-white p-1.5 mt-4 rounded-lg mb-6 hover:bg-gray-900"
          >
            Sign up
          </button>
          {/* Signin link */}
          <Link to="/userlogin" className="text-center text-gray-400">
            Already have an account? <span className="font-bold text-black">Sign in</span>
          </Link>
        </div>
        {/* Right side (Image display) */}
        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1597274303632-880ef8660375?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTQ3fHxhcnRpc3R8ZW58MHx8MHx8fDA%3D"
            alt="img"
            className="w-[430px] h-full hidden rounded-r-2xl md:block object-cover"
          />
        </div>
      </div>
    </div>
  );
}

export default UserSignup;
