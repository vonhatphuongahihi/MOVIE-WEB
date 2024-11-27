import { useEffect, useRef, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { RiCloseLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

function SearchForm() {
  const [query, setQuery] = useState("");
  const [history, setHistory] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const [trendingContent, setTrendingContent] = useState([]);

  // Lấy danh sách phim và show truyền hình xu hướng từ TMDB
  useEffect(() => {
    const fetchTrendingData = async () => {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlYjBmODI3MTcyNGVjN2RkMDhjNjM4N2E4N2IyOTdiOCIsIm5iZiI6MTcyNzI4MDU5My4xNzQ4MDcsInN1YiI6IjY2ZjI0NzQ0NmMzYjdhOGQ2NDhlMGJjZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ogqT5xPvWtOvhmZVifUCsnAxuijTrhZYoX5L7IcxE_o",
        },
      };

      try {
        // Gửi yêu cầu đồng thời cho trending movies và TV shows
        const [moviesResponse, tvShowsResponse] = await Promise.all([
          fetch("https://api.themoviedb.org/3/trending/movie/day?language=vi-VN", options),
          fetch("https://api.themoviedb.org/3/trending/tv/day?language=vi-VN", options),
        ]);

        const moviesData = await moviesResponse.json();
        const tvShowsData = await tvShowsResponse.json();

        // Hợp nhất và sắp xếp theo độ phổ biến
        const combinedTrending = [...moviesData.results, ...tvShowsData.results];
        const sortedTrending = combinedTrending
          .sort((a, b) => b.popularity - a.popularity)
          .slice(0, 3); // Lấy 3 mục có độ phổ biến cao nhất

        setTrendingContent(sortedTrending);
      } catch (error) {
        console.error("Error fetching trending data:", error);
      }
    };

    fetchTrendingData();
  }, []);

  // Lấy lịch sử tìm kiếm từ localStorage
  useEffect(() => {
    // Lấy danh sách lịch sử từ localStorage
    const searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];
    setHistory(searchHistory);
  }, []);

  // Cập nhật lịch sử tìm kiếm vào localStorage
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      // Lấy danh sách lịch sử hiện tại từ localStorage
      const currentHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];
  
      // Thêm từ khóa vào đầu danh sách (nếu chưa có trong danh sách)
      const updatedHistory = [query, ...currentHistory.filter(item => item !== query)];
  
      // Lưu lại toàn bộ lịch sử vào localStorage
      localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
  
      // Cập nhật lại state và điều hướng tới kết quả tìm kiếm
      setHistory(updatedHistory);
      navigate(`/search?query=${encodeURIComponent(query)}`);
      setShowDropdown(false);
    }
  };

  // Xóa từ khóa khỏi lịch sử tìm kiếm
  const handleDeleteHistory = (index) => {
    const updatedHistory = history.filter((_, i) => i !== index);
  
    // Lưu lại danh sách lịch sử đã cập nhật vào localStorage
    localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
    setHistory(updatedHistory);
    setShowDropdown(true);
  };
  

  // Xử lý khi click vào từ khóa trong lịch sử tìm kiếm
  const handleHistoryClick = (item) => {
    setQuery(item);
    // Xóa từ khóa nếu đã có trong lịch sử, sau đó thêm nó vào đầu danh sách
    const updatedHistory = [item, ...history.filter((term) => term !== item)];
  
    // Cập nhật danh sách vào state và lưu vào localStorage
    setHistory(updatedHistory);
    localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
    navigate(`/search?query=${encodeURIComponent(item)}`);
    setShowDropdown(false);
  };
  
  

  // Lấy từ khóa tìm kiếm từ URL
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const queryFromUrl = urlParams.get("query") || "";
    setQuery(queryFromUrl); // Giữ `query` trên thanh tìm kiếm
  }, []);

  // Xử lý đóng dropdown khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  

  return (
    <div className="flex col-span-3 items-center w-full relative">
      <form
        onSubmit={handleSearchSubmit}
        className="w-full text-sm bg-white rounded flex items-center"
      >
        <button
          type="submit"
          className="w-12 flex justify-center items-center h-8 rounded text-subMain"
        >
          <FaSearch />
        </button>
        <input
          type="text"
          placeholder="Tìm kiếm"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setShowDropdown(true)}
          className="font-medium placeholder:text-border text-sm w-full h-8 bg-transparent border-none pr-2 text-black"
        />
        {/* Nút xóa nội dung tìm kiếm */}
        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setShowDropdown(true);
            }}
            className="text-xl mr-3.5 text-black"
          >
            <RiCloseLine />
          </button>
        )}
      </form>

      {showDropdown && (
        <div
          ref={dropdownRef}
          className="absolute top-10 left-0 w-full bg-white border rounded shadow-lg p-2"
        >
          {/* Lịch sử tìm kiếm */}
          <h4
            className="text-sm font-semibold mt-2 ml-3.5"
            style={{ color: "rgba(0,0,0,0.5)" }}
          >
            Tìm kiếm gần đây
          </h4>
          <ul className="mb-6 mt-2 ml-3.5 mr-3.5">
            {history.slice(0, 5).map((item, index) => (
              <li
                key={index}
                className="text-black flex justify-between items-center mb-1 hover:bg-neutral-200"
              >
                <span
                  className="cursor-pointer"
                  onClick={() => handleHistoryClick(item)}
                >
                  {item}
                </span>
                <button onClick={() => handleDeleteHistory(index)} className="text-xl">
                  <RiCloseLine />
                </button>
              </li>
            ))}
          </ul>

          {/* Xu hướng */}
          <h4
            className="text-sm font-semibold mt-2 ml-3.5"
            style={{ color: "rgba(0,0,0,0.5)" }}
          >
            Xu hướng gần đây
          </h4>
          <ul className="mt-3 ml-3.5 mr-3.5">
            {trendingContent.map((item, index) => (
              <li
                key={item.id || index}
                className="text-black cursor-pointer flex items-center mb-3 hover:bg-neutral-200"
                onClick={() => navigate(`/movie/${item.id}`)}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${item.backdrop_path}`}
                  alt={item.title || item.name}
                  className="w-44 h-26 rounded mr-6"
                />
                <span>{item.title || item.name}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default SearchForm;
