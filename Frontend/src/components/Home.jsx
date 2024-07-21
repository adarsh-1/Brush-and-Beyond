import React from 'react';
import RecentArtworks from './RecentArtwork';
import PopularArtists from './PopularArtists';
import FAQ from './Faqs';
import { NavLink } from 'react-router-dom';

function Home() {
    return (
        <div className="bg-gray-100 min-h-screen">
            {/* Video Background Section */}
            <div className="relative flex justify-center items-center w-full h-screen overflow-hidden">
                {/* Video Background */}
                <video
                    autoPlay
                    loop
                    muted
                    className="absolute top-0 left-0 w-full h-full object-cover z-0"
                >
                    <source
                        src="https://videos.pexels.com/video-files/4463159/4463159-hd_1920_1080_25fps.mp4"
                        type="video/mp4"
                    />
                </video>
                {/* Overlay */}
                <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 z-10 flex flex-col items-center justify-center text-white">
                    {/* Content */}
                    <div className="text-center">
                        <h1 className="text-4xl font-bold mb-4 relative">
                            <span
                                className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 animate-gradient-x"
                                style={{ backgroundImage: 'linear-gradient(to right, #8B5CF6, #EC4899, #FFD600)' }}
                            >
                                Welcome to Brush & Beyond
                            </span>
                        </h1>
                        <p className="text-lg mb-8">
                            Explore a world of creativity and artistry
                        </p>
                        <NavLink to="/userlogin">
                            <button
                                className="px-6 py-3 text-lg font-medium shadow-lg rounded-full text-white bg-blue-500 hover:bg-blue-600"
                            >
                                Buy Artworks
                            </button>
                        </NavLink>
                        {/* Additional Text Content */}
                        <div className="mt-8 max-w-3xl text-center">
                            <p className="text-lg text-gray-200">
                                Brush & Beyond is a digital sanctuary where creativity flourishes and artistic expression knows no bounds. In our platform, artists can showcase their work, connect with art enthusiasts, and grow their careers. Art buyers can discover diverse artwork and directly support talented artists. Join us on this journey of exploration and inspiration.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            {/* Other Sections */}
            <div className="container mx-auto py-12">
                <RecentArtworks />
                <PopularArtists />
                <FAQ />
            </div>
        </div>
    );
}

export default Home;
