import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';


function Login() {
  const [id, setid] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:4000/artist/Artistlogin', {
        id,
        password
      });
      localStorage.setItem("Token_key", response.data.token);
      console.log(response.data.message);
      navigate('/artist');
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-100">
      <div className="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0">
        {/* Left side */}
        <div className="flex flex-col justify-center p-8 md:p-14">
          <span className="mb-3 text-4xl font-bold">Artist Login</span>
          <span className="font-light text-gray-400 mb-8">
            Welcome back! Please enter your details
          </span>
          <div className="py-4">
            <span className="mb-2 text-md">ID</span>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md placeholder-font-light placeholder-text-gray-500"
              name="id"
              id="id"
              value={id}
              onChange={(e) => setid(e.target.value)}
            />
          </div>
          <div className="py-4">
            <span className="mb-2 text-md">Password</span>
            <input
              type="password"
              name="pass"
              id="pass"
              className="w-full p-2 border border-gray-300 rounded-md placeholder-font-light placeholder-text-gray-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <div className="text-red-500 mb-4">{error}</div>}
          <button
            onClick={handleLogin}
            className="w-full bg-black text-white p-2 rounded-lg mb-6 hover:bg-gray-900"
          >
            Sign in
          </button>
          <Link to="/artistsignup" className="text-center text-gray-400">
            Don't have an account? <span className="font-bold text-black">Sign up for free</span>
          </Link>
        </div>
        {/* Right side */}
        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1597274303632-880ef8660375?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTQ3fHxhcnRpc3R8ZW58MHx8MHx8fDA%3D"
            alt="img"
            className="w-[400px] h-full hidden rounded-r-2xl md:block object-cover"
          />
        </div>
      </div>
    </div>
  );
}

export default Login;
