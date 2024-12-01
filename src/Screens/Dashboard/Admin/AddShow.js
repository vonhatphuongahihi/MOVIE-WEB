import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
import Header from "../SideBar";
import { db } from "../../../firebase";
import { collection, addDoc, updateDoc } from "firebase/firestore";

function AddShow() {
  const [showTitle, setShowTitle] = useState('');
  const [showRuntime, setShowRuntime] = useState('');
  const [showLanguage, setShowLanguage] = useState('');
  const [showSeason, setShowSeason] = useState('');
  const [showReleaseDate, setShowReleaseDate] = useState('');
  const [showCountry, setShowCountry] = useState('');
  const [showOverview, setShowOverview] = useState('');
  const [showCategory, setShowCategory] = useState('');
  const [showGenres, setShowGenres] = useState([]);
  const [currentGenre, setCurrentGenre] = useState(""); 

  const [showImages, setShowImages] = useState({
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
    if (currentGenre.trim() !== "" && !showGenres.includes(currentGenre)) {
      setShowGenres([...showGenres, currentGenre.trim()]);
      setCurrentGenre("");
    }
  };
  
  const handleRemoveGenre = (genre) => {
    setShowGenres(showGenres.filter((g) => g !== genre));
  };

  const handleImageChange = (event, imageType) => {
    const file = event.target.files[0];
    if (file) {
      uploadToCloudinary(file, imageType === 'video' ? 'video' : 'image').then((url) => {
        setShowImages((prev) => ({
          ...prev,
          [imageType]: url,
        }));
      });
    }
  };

  const handleCategoryChange = (event) => {
    setShowCategory(event.target.value); 
  };

  const handlePublishShow = async () => {
    try {
      // Upload the images and video to Cloudinary
      const backdrop_path = await uploadToCloudinary(showImages.backdrop, 'image');
      const poster_path = await uploadToCloudinary(showImages.poster, 'image');
      const videoUrl = await uploadToCloudinary(showImages.video, 'video');

      // Construct the show data to store in Firestore
      const newShowData = {
        backdrop_path,
        category: showCategory,
        country: showCountry,
        genres: showGenres,
        language: showLanguage,
        overview: showOverview,
        poster_path,
        release_date: showReleaseDate,
        runtime: showRuntime,
        seasons: showSeason,
        title: showTitle,
        type: 'tvupload',
        video: videoLink,
        vip: false,
        vote_average: 0,
        vote_count: 0,
      };

      // Save the show data to Firestore
      const showRef = collection(db, 'tvShows');
      const docRef = await addDoc(showRef, newShowData);

      await updateDoc(docRef, { id: docRef.id });

      alert('show published successfully!');
    } catch (error) {
      console.error('Error publishing show:', error);
      alert('Error publishing show!');
    }
  };

  return (
    <div className="bg-dry min-h-screen">
      <Header />
      <div className="flex flex-col gap-6 p-6 bg-dry shadow-md rounded-xl mx-6 mt-6">
        <h2 className="text-xl font-bold text-subMain">Create Show</h2>

        {/* Show Title and Runtime */}
        <div className="w-full grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-border">Show Title</label>
            <input
              className="w-full p-3 mt-2 bg-black border border-gray-300 rounded-lg shadow-sm text-white"
              placeholder="Game of Thrones"
              type="text"
              value={showTitle}
              onChange={(e) => setShowTitle(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-border">Runtime</label>
            <input
              className="w-full p-3 mt-2 bg-black border border-gray-300 rounded-lg shadow-sm text-white"
              placeholder="120"
              type="text"
              value={showRuntime}
              onChange={(e) => setShowRuntime(e.target.value)}
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
              value={showLanguage}
              onChange={(e) => setShowLanguage(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-border">Year of Release</label>
            <input
              className="w-full p-3 mt-2 bg-black border border-gray-300 rounded-lg shadow-sm text-white"
              type="date"
              value={showReleaseDate}
              onChange={(e) => setShowReleaseDate(e.target.value)}
            />
          </div>
        </div>

        {/* Season and Episode */}
        <div className="w-full grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-border">Season</label>
            <input
              className="w-full p-3 mt-2 bg-black border border-gray-300 rounded-lg shadow-sm text-white"
              placeholder="Mùa 1"
              type="text"
              value={showSeason}
              onChange={(e) => setShowSeason(e.target.value)}
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
              value={showCountry}
              onChange={(e) => setShowCountry(e.target.value)}
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
          {showGenres.map((genre, index) => (
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
                value={showCategory} 
                onChange={handleCategoryChange} 
              >
                <option value="row1">Hàng 1</option>
                <option value="row2">Hàng 2</option>
                <option value="row3">Hàng 3</option>
                <option value="row4">Hàng 4</option>
                <option value="row5">Hàng 5</option>
              </select>
          </div>
        </div>

        {/* Show Images */}
        <div className="w-full grid md:grid-cols-2 gap-6">
          {/* Image without title */}
          <div className="flex flex-col gap-2">
            <p className="text-border font-semibold text-sm">Backdrop</p>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageChange(e, "backdrop")}
              className="mt-2 p-2 text-sm text-white bg-black border border-gray-300 rounded-lg"
            />
          </div>

          {/* Image with title */}
          <div className="flex flex-col gap-2">
            <p className="text-border font-semibold text-sm">Poster</p>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageChange(e, "poster")}
              className="mt-2 p-2 text-sm text-white bg-black border border-gray-300 rounded-lg"
            />
          </div>
        </div>

        {/* Show Video */}
        <div className="flex flex-col gap-2 w-full">
          <label className="text-border font-semibold text-sm">Show Video</label>
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
        {/* Show Description */}
        <div>
          <label className="block text-sm font-semibold text-border">Show Description</label>
          <textarea
            className="w-full p-3 mt-2 bg-black border border-gray-300 rounded-lg shadow-sm text-white"
            placeholder="Show Description"
            value={showOverview}
            onChange={(e) => setShowOverview(e.target.value)}
          />
        </div>


        {/* Publish Button */}
        <div className="mt-6">
          <button
            onClick={handlePublishShow}
            className="text-white bg-blue-500 rounded-lg px-4 py-2"
          >
            Publish Show
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddShow;
