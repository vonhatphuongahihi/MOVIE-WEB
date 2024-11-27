import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
import Header from "../SideBar";
import { db } from "../../../firebase";
import { collection, addDoc, updateDoc } from "firebase/firestore";

function AddMovie() {
  const [newCast, setNewCast] = useState({ name: "", character: "", profile_path: null });
  const [casts, setCasts] = useState([]);
  const [movieTitle, setMovieTitle] = useState('');
  const [movieHours, setMovieHours] = useState('');
  const [movieLanguage, setMovieLanguage] = useState('');
  const [movieReleaseDate, setMovieReleaseDate] = useState('');
  const [movieCountry, setMovieCountry] = useState('');
  const [movieOverview, setMovieOverview] = useState('');
  const [movieCategory, setMovieCategory] = useState('');
  const [movieGenres, setMovieGenres] = useState([]);
  const [currentGenre, setCurrentGenre] = useState(""); 

  const [movieImages, setMovieImages] = useState({
    backdrop: null,
    poster: null,
    video: null
  });
  const [videoLink, setVideoLink] = useState('');
  // Function to upload files to Cloudinary
  const uploadToCloudinary = async (file, type) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'phuongahihi');
      formData.append('folder', type);

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/dh9y38ito/${type}/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );

      const data = await response.json();
      return data.secure_url;
    } catch (error) {
      console.error('Error uploading file to Cloudinary:', error);
    }
  };
  const handleAddGenre = () => {
    if (currentGenre.trim() !== "" && !movieGenres.includes(currentGenre)) {
      setMovieGenres([...movieGenres, currentGenre.trim()]);
      setCurrentGenre("");
    }
  };
  
  const handleRemoveGenre = (genre) => {
    setMovieGenres(movieGenres.filter((g) => g !== genre));
  };

  const handleImageChange = (event, imageType) => {
    const file = event.target.files[0];
    if (file) {
      uploadToCloudinary(file, imageType === 'video' ? 'video' : 'image').then((url) => {
        setMovieImages((prev) => ({
          ...prev,
          [imageType]: url,
        }));
      });
    }
  };

  const handleAddCast = async () => {
    if (newCast.profile_path) {
      try {
        // Upload cast profile image to Cloudinary
        const profileImageUrl = await uploadToCloudinary(newCast.profile_path, "image");
  
        // Add new cast with uploaded image URL
        setCasts([...casts, { ...newCast, profile_path: profileImageUrl }]);
  
        // Reset the newCast state
        setNewCast({ name: "", character: "", profile_path: null });
      } catch (error) {
        console.error("Error uploading cast image:", error);
        alert("Failed to upload cast image.");
      }
    } else {
      alert("Please upload a profile image for the cast.");
    }
  };
  

  const handleCastInputChange = (event) => {
    const { name, value } = event.target;
    setNewCast((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleCastImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setNewCast((prev) => ({
        ...prev,
        profile_path: file, // Store the file for Cloudinary upload
      }));
    }
  };
  
  const handleDeleteCast = (index) => {
    setCasts(casts.filter((_, i) => i !== index));
  };
  const handleCategoryChange = (event) => {
    setMovieCategory(event.target.value); 
  };

  const handlePublishMovie = async () => {
    try {
      // Upload the images and video to Cloudinary
      const backdrop_path = await uploadToCloudinary(movieImages.backdrop, 'image');
      const poster_path = await uploadToCloudinary(movieImages.poster, 'image');
      const videoUrl = await uploadToCloudinary(movieImages.video, 'video');

      // Construct the movie data to store in Firestore
      const newMovieData = {
        title: movieTitle,
        runtime: movieHours,
        language: movieLanguage,
        release_date: movieReleaseDate,
        overview: movieOverview,
        genres: movieGenres,
        category: movieCategory,
        country: movieCountry,
        backdrop_path,
        poster_path,
        video: videoLink,
        cast: casts,
      };

      // Save the movie data to Firestore
      const movieRef = collection(db, 'movies');
      const docRef = await addDoc(movieRef, newMovieData);

      await updateDoc(docRef, { movieId: docRef.id });

      alert('Movie published successfully!');
    } catch (error) {
      console.error('Error publishing movie:', error);
      alert('Error publishing movie!');
    }
  };

  return (
    <div className="bg-dry min-h-screen">
      <Header />
      <div className="flex flex-col gap-6 p-6 bg-dry shadow-md rounded-xl mx-6 mt-6">
        <h2 className="text-xl font-bold text-subMain">Create Movie</h2>

        {/* Movie Title and Hours */}
        <div className="w-full grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-border">Movie Title</label>
            <input
              className="w-full p-3 mt-2 bg-black border border-gray-300 rounded-lg shadow-sm text-white"
              placeholder="Game of Thrones"
              type="text"
              value={movieTitle}
              onChange={(e) => setMovieTitle(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-border">Hours</label>
            <input
              className="w-full p-3 mt-2 bg-black border border-gray-300 rounded-lg shadow-sm text-white"
              placeholder="2hr"
              type="text"
              value={movieHours}
              onChange={(e) => setMovieHours(e.target.value)}
            />
          </div>
        </div>

        {/* Language and Year of Release */}
        <div className="w-full grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-border">Language Used</label>
            <input
              className="w-full p-3 mt-2 bg-black border border-gray-300 rounded-lg shadow-sm text-white"
              placeholder="English"
              type="text"
              value={movieLanguage}
              onChange={(e) => setMovieLanguage(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-border">Year of Release</label>
            <input
              className="w-full p-3 mt-2 bg-black border border-gray-300 rounded-lg shadow-sm text-white"
              type="date"
              value={movieReleaseDate}
              onChange={(e) => setMovieReleaseDate(e.target.value)}
            />
          </div>
        </div>

        {/* Country and Genres */}
        <div className="w-full grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-border">Country</label>
            <input
              className="w-full p-3 mt-2 bg-black border border-gray-300 rounded-lg shadow-sm text-white"
              placeholder="Country"
              type="text"
              value={movieCountry}
              onChange={(e) => setMovieCountry(e.target.value)}
            />
          </div>
          <div className="w-full">
        <label className="block text-sm font-semibold text-border">Genres</label>
        <div className="flex gap-2 mt-2">
          <input
            type="text"
            className="w-full p-3 bg-black border border-gray-300 rounded-lg text-white"
            placeholder="Add a genre and press Enter"
            value={currentGenre}
            onChange={(e) => setCurrentGenre(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAddGenre()}
          />
          <button
            type="button"
            className="text-white bg-blue-500 rounded-lg px-4 py-2"
            onClick={handleAddGenre}
          >
            Add Genre
          </button>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {movieGenres.map((genre, index) => (
            <span key={index} className="bg-gray-600 text-white rounded-full px-4 py-1">
              {genre}
              <button
                type="button"
                onClick={() => handleRemoveGenre(genre)}
                className="ml-2 text-red-500"
              >
                x
              </button>
            </span>
          ))}
        </div>
      </div>
          <div>
            <label className="block text-sm font-semibold text-border">Category</label>
            <select
                className="border rounded px-2 py-1 mt-1 w-full"
                value={movieCategory} 
                onChange={handleCategoryChange} 
              >
                <option value="upcoming">Upcoming</option>
                <option value="top_rated">Top Rated</option>
                <option value="popular">Popular</option>
                <option value="now_playing">Now Playing</option>
              </select>
          </div>
        </div>

        {/* Movie Images */}
        <div className="w-full grid md:grid-cols-2 gap-6">
          {/* Image without title */}
          <div className="flex flex-col gap-2">
            <p className="text-border font-semibold text-sm">Image without Title</p>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageChange(e, "backdrop")}
              className="mt-2 p-2 text-sm text-white bg-black border border-gray-300 rounded-lg"
            />
          </div>

          {/* Image with title */}
          <div className="flex flex-col gap-2">
            <p className="text-border font-semibold text-sm">Image with Title</p>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageChange(e, "poster")}
              className="mt-2 p-2 text-sm text-white bg-black border border-gray-300 rounded-lg"
            />
          </div>
        </div>

        {/* Movie Video */}
        <div className="flex flex-col gap-2 w-full">
          <label className="text-border font-semibold text-sm">Movie Video</label>
          <input
            type="file"
            accept="video/*"
            onChange={(e) => handleImageChange(e, "video")}
            className="w-full p-3 mt-2 bg-black border border-gray-300 rounded-lg shadow-sm"
          />
        </div>
        <div className="flex flex-col gap-2 w-full">
          <label className="text-border font-semibold text-sm">Video Link</label>
          <input
            type="text"
            placeholder="Paste your video link here"
            value={videoLink}
            onChange={(e) => setVideoLink(e.target.value)}
            className="w-full p-3 mt-2 bg-black border border-gray-300 rounded-lg shadow-sm text-white"
          />
        </div>
        {/* Movie Description */}
        <div>
          <label className="block text-sm font-semibold text-border">Movie Description</label>
          <textarea
            className="w-full p-3 mt-2 bg-black border border-gray-300 rounded-lg shadow-sm text-white"
            placeholder="Movie Description"
            value={movieOverview}
            onChange={(e) => setMovieOverview(e.target.value)}
          />
        </div>

        {/* Cast List */}
        <div className="w-full flex flex-col gap-2">
          <p className="text-border font-semibold text-sm">Movie Casts</p>
          {casts.map((cast, index) => (
            <div key={index} className="flex items-center gap-2">
              <img
                src={cast.profile_path}
                alt={`${cast.name} as ${cast.character}`}
                className="w-10 h-10 object-cover rounded-full"
              />
              <p className="text-white">
                {cast.name} as {cast.character}
              </p>
              <button onClick={() => handleDeleteCast(index)} className="text-red-500">
                <MdDelete size={20} />
              </button>
            </div>
          ))}
        </div>

        {/* Add New Cast */}
        <div className="flex gap-2">
          <input
            type="text"
            name="name"
            placeholder="Cast Name"
            value={newCast.name}
            onChange={handleCastInputChange}
            className="w-full p-2 mt-2 bg-black border border-gray-300 rounded-lg text-white"
          />
          <input
            type="text"
            name="character"
            placeholder="Character Name"
            value={newCast.character}
            onChange={handleCastInputChange}
            className="w-full p-2 mt-2 bg-black border border-gray-300 rounded-lg text-white"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleCastImageChange}
            className="mt-2 p-2 text-sm text-white bg-black border border-gray-300 rounded-lg"
          />
          <button onClick={handleAddCast} className="text-white bg-blue-500 rounded-lg px-4 py-2">
            Add Cast
          </button>
        </div>

        {/* Publish Button */}
        <div className="mt-6">
          <button
            onClick={handlePublishMovie}
            className="text-white bg-blue-500 rounded-lg px-4 py-2"
          >
            Publish Movie
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddMovie;