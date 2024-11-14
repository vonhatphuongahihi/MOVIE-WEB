import React, { useState, useEffect } from "react";
import Titles from "../Titles";
import { BsBookmarkStarFill } from "react-icons/bs";
import { Message, Select } from "../UsedInputs";
import Rating from "../Stars";
import { addCommentToMovie, getCommentsForMovie } from "../../firebase";

function MovieRates({ movie, user }) {
  const Ratings = [
    { title: "Rất kém", value: 0 },
    { title: "Kém", value: 1 },
    { title: "Trung bình", value: 2 },
    { title: "Tốt", value: 3 },
    { title: "Rất tốt", value: 4 },
    { title: "Tuyệt vời", value: 5 },
  ];

  const [rating, setRating] = useState(0);
  const [commentContent, setCommentContent] = useState("");
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      const movieComments = await getCommentsForMovie(movie.id);
      setComments(movieComments);
    };

    fetchComments();
  }, [movie.id]);

  const handleCommentSubmit = async () => {
    if (commentContent.trim()) {
      try {
        await addCommentToMovie(movie.id, user.uid, commentContent, rating, user.name, user.avatarUrl);
        setCommentContent("");
        setRating(0);
        
        const updatedComments = await getCommentsForMovie(movie.id);
        setComments(updatedComments);
      } catch (error) {
        console.error("Error submitting comment:", error);
      }
    } else {
      alert("Vui lòng nhập nội dung bình luận.");
    }
  };

  return (
    <div className="my-12">
      <Titles title="Reviews" Icon={BsBookmarkStarFill} />
      <div className="mt-10 xl:grid flex-colo grid-cols-5 gap-12 bg-dry xs:p-10 py-10 px-2 sm:p-20 rounded">
        
        {/* Viết bình luận */}
        <div className="xl:col-span-2 w-full flex flex-col gap-8">
          <h3 className="text-xl text-text font-semibold">Bình luận</h3>
          <div className="my-8">
            <textarea
              className="w-full h-32 p-4 border rounded-lg text-black"
              value={commentContent}
              onChange={(e) => setCommentContent(e.target.value)}
              placeholder="Cảm nhận về phim..."
            />
            <button
              onClick={handleCommentSubmit}
              className="mt-4 bg-subMain text-white px-6 py-2 rounded"
            >
              Gửi bình luận
            </button>
          </div>
          <div className="text-sm w-full">
            <Select
              label="Đánh giá"
              options={Ratings}
              onChange={(e) => setRating(e.target.value)}
            />
            <div className="flex mt-4 text-lg gap-2 text-star">
              <Rating value={rating} />
            </div>
          </div>
        </div>

        {/* Hiển thị bình luận */}
        <div className="col-span-3 flex flex-col gap-6 overflow-y-auto max-h-80">
          {comments.length === 0 ? (
            <div>
              <h3 className="text-xl text-text font-semibold">Chưa có bình luận</h3>
              <br></br>
              <img
                src="/images/NoReview.jpg"
                alt="No"
                className="w-full h-full rounded-lg object-cover"
              />
            </div>
          ) : (
            comments.map((comment) => (
              <div key={comment.id} className="flex gap-4 p-4 border-b border-gray-200">
                <img
                  src={comment.avatarUrl}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="text-lg font-semibold">{comment.userName}</h4>
                  <p className="text-gray-600">{comment.content}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default MovieRates;
