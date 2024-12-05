import React from "react";
import { RiCloseLine } from "react-icons/ri";
import { Link } from "react-router-dom";

const CommentLimitPopup = ({ onClose }) => {
  
  return (
    <div 
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{ zIndex: 2000 }} onClick={onClose}
    >
      <div 
        className="relative bg-[#151515FF] border border-white p-6 rounded-lg shadow-lg max-w-sm"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          className="absolute top-3 right-3 bg-[#404040] rounded-full text-3xl cursor-pointer hover:bg-[#333333]"
          onClick={onClose}
        >
          <RiCloseLine />
        </button>
        <h2 className="text-xl font-semibold mb-4">Tài khoản chưa đăng nhập</h2>
        <p className="mb-8">
        Bạn cần đăng nhập để có thể bình luận và chia sẻ ý kiến về bộ phim này. Đăng nhập ngay để tham gia!
        </p>
        <div className="flex justify-end">
          <Link to={`/login`}>
            <button
              className="bg-subMain hover:bg-[#23a30f] transition px-4 py-2 rounded"
            >
              Đăng nhập
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CommentLimitPopup;