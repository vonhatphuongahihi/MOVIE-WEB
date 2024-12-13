import React, { useState } from 'react';
import { RiCloseFill } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import { durationOptions, genreOptions, languageOptions } from '../Data/FilterPopupData';

function FilterPopup({ onClose }) {
  const [duration, setDuration] = useState('');
  const [language, setLanguage] = useState('');
  const [releaseDateFrom, setReleaseDateFrom] = useState('');
  const [releaseDateTo, setReleaseDateTo] = useState('');
  const [genre, setGenre] = useState('');
  const [dateError, setDateError] = useState(''); // Biến trạng thái lưu lỗi ngày
  const navigate = useNavigate();

  // Hàm kiểm tra điều kiện ngày
  const validateDates = (from, to) => {
    if (from && to && new Date(from) > new Date(to)) {
      setDateError('Ngày bắt đầu không được lớn hơn ngày kết thúc');
    } else {
      setDateError('');
    }
  };

  const handleFromDateChange = (e) => {
    setReleaseDateFrom(e.target.value);
    validateDates(e.target.value, releaseDateTo);
  };

  const handleToDateChange = (e) => {
    setReleaseDateTo(e.target.value);
    validateDates(releaseDateFrom, e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!dateError) {  // Kiểm tra lỗi trước khi điều hướng
      const filterParams = new URLSearchParams({
        duration,
        language,
        release_date_from: releaseDateFrom,
        release_date_to: releaseDateTo,
        genre,
      });
      navigate(`/search?${filterParams.toString()}`);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center z-50 text-black" style={{fontFamily: "Roboto Condensed"}}>
      <div className="absolute top-12 bg-white rounded-lg p-6 pt-5">

        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl font-bold">BỘ LỌC</h2>
        </div>

        <button onClick={onClose} className="absolute top-3 right-3">
          <RiCloseFill className="w-7 h-7" />
        </button>

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-x-8 gap-y-5 ">
          <div>
            <label className="block text-sm font-medium text-black text-opacity-60 text-left">Thời lượng</label>
            <select
              name="duration"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="mt-1 p-2 w-full border border-gray-400 rounded-md text-black"
              style={{ backgroundColor: "#d6fbd0" }}
            >
              {durationOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-black text-opacity-60 text-left">Ngôn ngữ</label>
            <select
              name="language"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="mt-1 p-2 w-full border border-gray-400 rounded-md bg-green-100 text-black"
              style={{ backgroundColor: "#d6fbd0" }}
            >
              {languageOptions.map((option) => (
                <option key={option.label}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-black text-opacity-60 text-left">Ngày phát hành (từ ngày)</label>
            <input
              type="date"
              name="releaseDateFrom"
              value={releaseDateFrom}
              onChange={handleFromDateChange}
              className="mt-1 p-2 w-full border border-gray-400 rounded-md bg-green-100 text-black"
              style={{ backgroundColor: "#d6fbd0" }}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-black text-opacity-60 text-left">Ngày phát hành (đến ngày)</label>
            <input
              type="date"
              name="releaseDateTo"
              value={releaseDateTo}
              onChange={handleToDateChange}
              className="mt-1 p-2 w-full border border-gray-400 rounded-md bg-green-100 text-black"
              style={{ backgroundColor: "#d6fbd0" }}
            />
          </div>
          
          {/* Hiển thị lỗi */}
          {dateError && <p className="col-span-2 text-red-500 text-md">{dateError}</p>}

          <div>
            <label className="block text-sm font-medium text-black text-opacity-60 text-left">Thể loại</label>
            <select
              name="genre"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              className="mt-1 p-2 w-full border border-gray-400 rounded-md bg-green-100 text-black"
              style={{ backgroundColor: "#d6fbd0" }}
            >
              {genreOptions.map((option) => (
                <option key={option.label}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div className="col-span-2 flex justify-end gap-5 mt-4">
            <button
              type="button"
              onClick={() => {
                setDuration('');
                setLanguage('');
                setReleaseDateFrom('');
                setReleaseDateTo('');
                setGenre('');
                setDateError('');
              }}
              className="px-4 py-2 border border-black rounded-md"
            >
              Đặt lại
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-white rounded-md"
              style={{ backgroundColor: "#28BD11" }}
            >
              Tìm kiếm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FilterPopup;
