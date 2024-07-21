import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function ArtistSignup() {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneno, setPhoneno] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [experience, setExperience] = useState('');
  const [skills, setSkills] = useState('');
  const [gender, setGender] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    setAvatar(file);
  };

  const handleArtistSignup = async () => {
    // Mandatory field validation
    if (!id || !name || !email || !password || !phoneno || !address || !city || !experience || !skills || !gender || !avatar) {
      setError('All fields are mandatory.');
      return;
    }

    try {
      if (!validateEmail(email)) {
        setError('Please enter a valid email address.');
        return;
      }
      if (!validatePassword(password)) {
        setError('Password must be at least 6 characters.');
        return;
      }
      if (phoneno.length !== 10 || !/^\d+$/.test(phoneno)) {
        setError('Phone number should be a 10-digit number.');
        return;
      }

      const formData = new FormData();
      formData.append('id', id);
      formData.append('name', name);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('phoneno', phoneno);
      formData.append('address', address);
      formData.append('city', city);
      formData.append('experience', experience);
      formData.append('skills', skills);
      formData.append('gender', gender);
      formData.append('avatar', avatar);

      const response = await axios.post('http://localhost:4000/artist/Artistsignup', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.status === 201) {
        setId('');
        setName('');
        setEmail('');
        setPassword('');
        setPhoneno('');
        setAddress('');
        setCity('');
        setExperience('');
        setSkills('');
        setGender('');
        setAvatar(null);
        setError(null); // Clear any previous error messages
        navigate('/artistlogin');
      } else {
        setError(response.data);
      }
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-100">
      <div className="relative flex flex-col my-16 mx-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0">
        {/* Left side */}
        <div className="flex flex-col justify-center p-10 md:px-16">
          <span className="mb-1.5 text-4xl font-bold">Artist Signup</span>
          <span className="font-light text-gray-400 mb-5">
            Create your account
          </span>
          {/* Your input fields */}
          {/* ID */}
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
          {/* Name */}
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
          {/* Email */}
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
          {/* Password */}
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
          {/* Phone Number */}
          <div className="py-1.5">
            <span className="mb-2 text-md">Phone Number</span>
            <input
              type="text"
              className="w-full p-0.5 border border-gray-300 rounded-md placeholder-font-light placeholder-text-gray-500"
              name="phoneno"
              value={phoneno}
              onChange={(e) => {
                const inputVal = e.target.value.replace(/\D/g, '').slice(0, 10);
                setPhoneno(inputVal);
              }}
            />
          </div>
          {/* Address */}
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
          {/* City */}
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
          {/* Experience */}
          <div className="py-1.5">
            <span className="mb-2 text-md">Experience</span>
            <input
              type="text"
              className="w-full p-0.5 border border-gray-300 rounded-md placeholder-font-light placeholder-text-gray-500"
              name="experience"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
            />
          </div>
          {/* Skills */}
          <div className="py-1.5">
            <span className="mb-2 text-md">Skills</span>
            <input
              type="text"
              className="w-full p-0.5 border border-gray-300 rounded-md placeholder-font-light placeholder-text-gray-500"
              name="skills"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
            />
          </div>
          {/* Gender */}
          <div className="py-1.5">
            <span className="mb-2 text-md">Gender</span>
            <div className="flex items-center">
              <label htmlFor="male" className="mr-2">
                <input
                  type="radio"
                  id="male"
                  name="gender"
                  value="male"
                  checked={gender === 'male'}
                  onChange={(e) => setGender(e.target.value)}
                />
                Male
              </label>
              <label htmlFor="female" className="mr-2">
                <input
                  type="radio"
                  id="female"
                  name="gender"
                  value="female"
                  checked={gender === 'female'}
                  onChange={(e) => setGender(e.target.value)}
                />
                Female
              </label>
            </div>
          </div>
          {/* Upload Avatar */}
          <div className="py-1.5">
            <span className="mb-2 text-md">Upload Avatar</span>
            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
            />
          </div>
          {/* Error message */}
          {error && <div className="text-red-500 mb-4">{error}</div>}
          {/* ArtistSignup button */}
          <button
            onClick={handleArtistSignup}
            className="w-full bg-black text-white p-1.5 mt-4 rounded-lg mb-6 hover:bg-gray-900"
          >
            Sign up
          </button>
          {/* Signin link */}
          <Link to="/artistlogin" className="text-center text-gray-400">
            Already have an account? <span className="font-bold text-black">Sign in</span>
          </Link>
        </div>
        {/* Right side (Image display) */}
        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1597274303632-880ef8660375?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTQ3fHxhcnRpc3R8ZW58MHx8MHx8fDA%3D"
            alt="img"
            className="w-[500px] h-full hidden rounded-r-2xl md:block object-cover"
          />
        </div>
      </div>
    </div>
  );
}

export default ArtistSignup;
