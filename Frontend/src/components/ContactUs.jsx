import React, { useState } from 'react';
import axios from 'axios';

function ContactUs() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneno, setPhoneNo] = useState('');
  const [query, setQuery] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/contact/addContact', {
        name,
        email,
        phoneno,
        query
      });
      console.log(response.data); // Log response data if needed
      // Clear form fields after successful submission
      setName('');
      setEmail('');
      setPhoneNo('');
      setQuery('');
    } catch (error) {
      console.error('Error submitting form:', error);
      // Handle error if needed
    }
  };

  return (
    <section className="relative">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1679403855896-49b0bd34744a?q=80&w=1793&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
          opacity: 0.9 // Set opacity here (value ranges from 0 to 1)
        }}
      />

      {/* Content */}
      <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md relative z-10" >
        <h2 className="mb-4 text-4xl tracking-tight font-bold text-center text-black">Contact Us</h2>
        <p className="mb-8 lg:mb-16 font-light text-center text-black sm:text-xl">Have a question or need assistance? Feel free to reach out to us!</p>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-black">Name</label>
            <input 
              type="text" 
              id="name" 
              name="name"
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              className="block p-3 w-full text-sm rounded-lg border border-black shadow-md bg-white bg-opacity-10" 
              placeholder="Enter your name" 
              required 
            />
          </div>
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-black">Email</label>
            <input 
              type="email" 
              id="email" 
              name="email"
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              className="block p-3 w-full text-sm rounded-lg border border-black shadow-md bg-white bg-opacity-10" 
              placeholder="example@gmail.com" 
              required 
            />
          </div>
          <div>
            <label htmlFor="phoneno" className="block mb-2 text-sm font-medium text-black">Phone Number</label>
            <input 
              type="text" 
              id="phoneno" 
              name="phoneno"
              value={phoneno} 
              onChange={(e) => setPhoneNo(e.target.value)} 
              className="block p-3 w-full text-sm rounded-lg border border-black shadow-md bg-white bg-opacity-10" 
              placeholder="Enter your phone number" 
              required 
            />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="query" className="block mb-2 text-sm font-medium text-black">Your Message</label>
            <textarea 
              id="query" 
              name="query"
              value={query} 
              onChange={(e) => setQuery(e.target.value)} 
              rows="6" 
              className="bblock p-3 w-full text-sm rounded-lg border border-black shadow-md bg-white bg-opacity-10" 
              placeholder="Write your message here..."
            ></textarea>
          </div>
          <button 
            type="submit" 
            className="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-black sm:w-fit hover:bg-gray-800"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
}

export default ContactUs;
