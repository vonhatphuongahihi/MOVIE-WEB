import React, { useState, useEffect } from "react";
import Titles from "../Titles";
import { BsBookmarkStarFill } from "react-icons/bs";
import { Message, Select } from "../UsedInputs";
import Rating from "../Stars";
import { addCommentToMovie, getCommentsForMovie, addReplyToComment, updateLikesDislikes } from "../../firebase";
import { AiFillLike, AiFillDislike, AiOutlineComment } from "react-icons/ai";

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
//Like và dislike
  const [likeState, setLikeState] = useState({});
  const [commentState, setCommentState] = useState({});
 

  const handleLike = async (id) => {
    const currentState = likeState[id]; // Current state for this comment
    const updatedComments = comments.map((comment) => {
      if (comment.id === id) {
        if (currentState === "like") {
          // User is removing their like
          return { ...comment, likes: comment.likes - 1 };
        } else if (currentState === "dislike") {
          // User is switching from dislike to like
          return {
            ...comment,
            likes: comment.likes + 1,
            dislikes: comment.dislikes - 1,
          };
        } else {
          // User is adding a like
          return { ...comment, likes: comment.likes + 1 };
        }
      }
      return comment;
    });
  
    setComments(updatedComments);
  
    // Update the user's like/dislike state
    setLikeState((prev) => ({
      ...prev,
      [id]: currentState === "like" ? null : "like",
    }));
  
    // Update the database
    const updatedComment = updatedComments.find((c) => c.id === id);
    await updateLikesDislikes(id, "likes", updatedComment.likes);
    await updateLikesDislikes(id, "dislikes", updatedComment.dislikes);
  };
  
  const handleDislike = async (id) => {
    const currentState = likeState[id]; // Current state for this comment
    const updatedComments = comments.map((comment) => {
      if (comment.id === id) {
        if (currentState === "dislike") {
          // User is removing their dislike
          return { ...comment, dislikes: comment.dislikes - 1 };
        } else if (currentState === "like") {
          // User is switching from like to dislike
          return {
            ...comment,
            dislikes: comment.dislikes + 1,
            likes: comment.likes - 1,
          };
        } else {
          // User is adding a dislike
          return { ...comment, dislikes: comment.dislikes + 1 };
        }
      }
      return comment;
    });
  
    setComments(updatedComments);
  
    // Update the user's like/dislike state
    setLikeState((prev) => ({
      ...prev,
      [id]: currentState === "dislike" ? null : "dislike",
    }));
  
    // Update the database
    const updatedComment = updatedComments.find((c) => c.id === id);
    await updateLikesDislikes(id, "likes", updatedComment.likes);
    await updateLikesDislikes(id, "dislikes", updatedComment.dislikes);
  };
  

  const handleReplySubmit = async (id, content) => {
    if (!content.trim()) return;
  
    const newReply = {
      userId: user.uid,
      userName: user.name,
      content,
      avatarUrl: user.avatarUrl,
      createdAt: new Date(),
    };
  
    const updatedComments = comments.map((comment) => {
      if (comment.id === id) {
        return {
          ...comment,
          replies: [...(comment.replies || []), newReply],
        };
      }
      return comment;
    });
  
    setComments(updatedComments);
  
    await addReplyToComment(id, newReply);
  };


  const toggleCommentBox = (id) => {
    setCommentState((prev) => ({
      ...prev,
      [id]: !prev[id], // Toggle comment box visibility
    }));
  };

  
//End Comment

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
            // comments.map((comment) => (
            //   <div key={comment.id} className="flex gap-4 p-4 border-b border-gray-200">
            //     <img
            //       src={comment.avatarUrl}
            //       className="w-12 h-12 rounded-full object-cover"
            //     />
            //     <div>
            //       <h4 className="text-lg font-semibold">{comment.userName}</h4>
            //       <div className="flex mt-4 text-lg gap-2 text-star pb-3">
            //   <Rating value={comment.rating} />
            // </div>
            //       <p className="text-gray-600">{comment.content}</p>
                  
            
            //     </div>
            //   </div>
            // ))


<div className="grid grid-cols-1 gap-4">
      {comments.map((comment) => (
        <div
          key={comment.id}
          className="flex flex-col gap-4 p-4 border-b border-gray-200"
        >
          {/* Comment gốc */}
          <div className="flex gap-8 items-start">
            <img
              src={comment.avatarUrl}
              alt="Avatar"
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="flex-1">
              <h4 className="text-lg font-semibold pb-3">{comment.userName}</h4>
              <p className="text-gray-600">{comment.content}</p>
              <div className="flex gap-4 mt-2">
                <AiFillLike
                  onClick={() => handleLike(comment.id)}
                  className={`cursor-pointer text-2xl ${
                    likeState[comment.id] === "like"
                      ? "text-blue-500"
                      : "text-gray-500"
                  }`}
                />
                <AiFillDislike
                  onClick={() => handleDislike(comment.id)}
                  className={`cursor-pointer text-2xl ${
                    likeState[comment.id] === "dislike"
                      ? "text-red-500"
                      : "text-gray-500"
                  }`}
                />
                <AiOutlineComment
                  onClick={() => toggleCommentBox(comment.id)}
                  className="cursor-pointer text-2xl text-gray-500 hover:text-blue-500"
                />
              </div>

              {/* Khung nhập bình luận */}
              {commentState[comment.id] && (
                <div className="mt-2">
                  <textarea
                    placeholder="Thêm phản hồi"
                    className="w-full border border-gray-300 p-2 rounded text-main"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleReplySubmit(comment.id, e.target.value);
                        e.target.value = ""; // Reset nội dung textarea
                      }
                    }}
                  />
                </div>
              )}
            </div>
            {/* Hiển thị rating */}
            <div className="flex flex-col justify-center items-center">
            <div className="flex mt-4 text-lg gap-2 text-star ">
              <Rating value={comment.rating} />
            </div>
            <div className="flex mt-2 text-gray-500 text-sm gap-4 items-center">
  <span>{comment.likes || 0} like</span>
  <span>{comment.dislikes || 0} dislike</span>
  <span>{comment.replies?.length || 0} replies</span>
</div>
              </div>

          </div>

          {/* Hiển thị danh sách reply */}
          {comment.replies?.map((reply, index) => (
            <div
              key={index}
              className="flex gap-4 items-start ml-12 border-l pl-4 border-gray-300"
            >
              <img
                src={reply.avatarUrl}
                alt="Avatar"
                className="w-8 h-8 rounded-full object-cover"
              />
              <div>
                <h4 className="text-sm font-semibold pb-3">{reply.userName}</h4>
                <p className="text-gray-600">{reply.content}</p>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>

          )}
        </div>
      </div>
    </div>
  );
}

export default MovieRates;
