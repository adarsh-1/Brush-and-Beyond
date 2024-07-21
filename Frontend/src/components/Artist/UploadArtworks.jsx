import React, { useState } from 'react';
import axios from 'axios';

const UploadArtwork = () => {
    const Token_key = localStorage.getItem("Token_key");
    const [artworkData, setArtworkData] = useState({
        id: Token_key,
        image: '',
        title: '',
        description: '',
        price: '',
        discount: '',
        category: '',
        forSale: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setArtworkData({ ...artworkData, [name]: value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setArtworkData({ ...artworkData, image: file });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("id", artworkData.id);
            formData.append('image', artworkData.image);
            formData.append('title', artworkData.title);
            formData.append('description', artworkData.description);
            formData.append('price', artworkData.price);
            formData.append('discount', artworkData.discount);
            formData.append('category', artworkData.category);
            formData.append('forSale', artworkData.forSale);

            const response = await axios.post('http://localhost:4000/artwork/addArtworks', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            console.log(response.data);

            // Clear form data after successful upload
            setArtworkData({
                image: '',
                title: '',
                description: '',
                price: '',
                discount: '',
                category: '',
                forSale: '',
            });
        } catch (error) {
            console.error('Error uploading artwork:', error);
        }
    };

    return (
        <div className="" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1679403855896-49b0bd34744a?q=80&w=1793&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}>
     
        
        <div className="min-h-screen flex items-center justify-center  py-14">
            <div className="max-w-md w-full bg-white shadow-md rounded-lg overflow-hidden">
                <div className="px-6 py-4">
                    <h2 className="text-2xl font-semibold text-center text-gray-800">Upload Artwork</h2>
                </div>
                <div className="max-w-md mx-auto mt-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="px-4">
                            <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                                Artwork Image
                            </label>
                            <input
                                type="file"
                                name="image"
                                id="image"
                                onChange={handleFileChange}
                                className=""
                            />
                        </div>
                        <div className="px-4">
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                                Title
                            </label>
                            <input
                                type="text"
                                name="title"
                                id="title"
                                value={artworkData.title}
                                onChange={handleChange}
                                className="w-full p-0.5 border border-gray-300 rounded-md placeholder-font-light placeholder-text-gray-500"
                            />
                        </div>
                        <div className="px-4">
                            <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                                Category
                            </label>
                            <input
                                type="text"
                                name="category"
                                id="category"
                                value={artworkData.category}
                                onChange={handleChange}
                                className="w-full p-0.5 border border-gray-300 rounded-md placeholder-font-light placeholder-text-gray-500"
                            />
                        </div>
                        <div className="px-4">
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                                Description
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                rows="3"
                                value={artworkData.description}
                                onChange={handleChange}
                                className="w-full p-0.5 border border-gray-300 rounded-md placeholder-font-light placeholder-text-gray-500"
                            ></textarea>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="px-4">
                                <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                                    Price
                                </label>
                                <input
                                    type="text"
                                    name="price"
                                    id="price"
                                    value={artworkData.price}
                                    onChange={handleChange}
                                    className="w-full p-0.5 border border-gray-300 rounded-md placeholder-font-light placeholder-text-gray-500"
                                />
                            </div>
                            <div className="px-4">
                                <label htmlFor="discount" className="block text-sm font-medium text-gray-700">
                                    Discount
                                </label>
                                <input
                                    type="text"
                                    name="discount"
                                    id="discount"
                                    value={artworkData.discount}
                                    onChange={handleChange}
                                    className="w-full p-0.5 border border-gray-300 rounded-md placeholder-font-light placeholder-text-gray-500"
                                />
                            </div>
                        </div>
                        <div className="px-4">
                            <label className="block text-sm font-medium pb-1 text-gray-700">
                                For Sale
                            </label>
                            <div className="flex items-center">
                                <div className="mr-4">
                                    <input
                                        type="radio"
                                        id="yes"
                                        name="forSale"
                                        value="Yes"
                                        onChange={handleChange}
                                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                                    />
                                    <label htmlFor="yes" className="ml-2  text-sm text-gray-900">
                                        Yes
                                    </label>
                                </div>
                                <div>
                                    <input
                                        type="radio"
                                        id="no"
                                        name="forSale"
                                        value="No"
                                        onChange={handleChange}
                                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                                    />
                                    <label htmlFor="no" className="ml-2 text-sm text-gray-900">
                                        No
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="px-4">
                            <button
                                type="submit"
                                className="w-full flex justify-center my-6 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Upload Artwork
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        </div>
    );
};

export default UploadArtwork;
