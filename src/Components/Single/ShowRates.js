import React, { useEffect, useState } from "react";
import { AiFillDislike, AiFillLike, AiOutlineComment } from "react-icons/ai";
import { BsBookmarkStarFill } from "react-icons/bs";
import { addCommentToMovie, addReplyToComment, getCommentsForMovie, updateLikesDislikes } from "../../firebase";
import CommentLimitPopup from "../../Screens/Popup/CommentLimitPopup";
import Rating from "../Stars";
import Titles from "../Titles";
import { Select } from "../UsedInputs";

import { getAuth } from "firebase/auth";

function ShowRates({ show, user, onAddCompleted }) {
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
  const [showPopup, setShowPopup] = useState(false); // Trạng thái hiển thị popup
 
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Kiểm tra trạng thái đăng nhập
  
  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      setIsLoggedIn(true); 
    } else {
      setIsLoggedIn(false); 
    }
  }, []); 


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
      const showComments = await getCommentsForMovie(show.id);
      setComments(showComments);
    };

    

    fetchComments();
  }, [show.id]);

  const handleCommentSubmit = async () => {
    if (!isLoggedIn) {
      setShowPopup(true); // Hiển thị popup nếu chưa đăng nhập
    } else {

    if (commentContent.trim()) {
      try {
        await addCommentToMovie(show.id, user.uid, commentContent, rating, user.name, user.avatarUrl);
        setCommentContent("");
        setRating(0);
        
        const updatedComments = await getCommentsForMovie(show.id);
        setComments(updatedComments);
        onAddCompleted();
      } catch (error) {
        console.error("Error submitting comment:", error);
      }
    } else {
      alert("Vui lòng nhập nội dung bình luận.");
    }
  }
  };

  return (
    <div className="lg:my-12 my-6 lg:mx-12 mx-4">
      <Titles title="Bình luận và đánh giá" Icon={BsBookmarkStarFill} />
      <div className="md:grid flex-colo grid-cols-5 lg:gap-16 gap-4 pt-4 pb-10 rounded">
        
        {/* Viết bình luận */}
        <div className="lg:col-span-2 md:col-span-5 w-full flex flex-col gap-4">
          <div className="lg:mt-8 md:mt-4 mt-2 lg:mb-6 mb-2 relative">
            <h3 className="lg:text-xl md:text-base text-text mb-4">Bình luận</h3>
            <textarea
              className="w-full h-32 p-4 border border-border rounded-lg text-white bg-[#262626]"
              value={commentContent}
              onChange={(e) => setCommentContent(e.target.value)}
              placeholder="Cảm nhận về phim..."
            />
          </div>
          <div className="w-full">
            <h3 className="lg:text-xl md:text-base text-text mb-2">Đánh giá</h3>
            <Select
              //label="Đánh giá"
              options={Ratings}
              onChange={(e) => setRating(e.target.value)}
            />
            <div className="flex mt-4 text-lg gap-2 text-star">
              <Rating value={rating} />
            </div>
          </div>
          <div class="flex justify-end">
            <button
              onClick={handleCommentSubmit}
              className="mt-4 bg-subMain text-white px-6 py-2 rounded"
            >
              Gửi bình luận
            </button>
          </div>

          {/* Hiển thị popup nếu chưa đăng nhập */}
          {showPopup && <CommentLimitPopup onClose={() => setShowPopup(false)} />}
        
        </div>

        {/* Hiển thị bình luận */}
        <div className="lg:col-span-3 md:col-span-5 flex flex-col gap-6 overflow-y-auto max-h-100 w-full self-start">
          {comments.length === 0 ? (
            <div className="mt-8">
              <img
                src="/images/NoReview.jpg"
                alt="No"
                className="lg:w-3/4 md:w-1/2 w-3/5 h-full rounded-lg object-cover mx-auto"
              />
              <p className="lg:mt-10 mt-6 md:text-lg text-base text-text text-center">Chưa có bình luận</p>
            </div>
          ) : (
          <div className="grid grid-cols-1 gap-4 lg:mt-8">
            {comments.map((comment) => (
              <div
                key={comment.id}
                className="flex flex-col gap-4 md:px-4 px-0 py-4 border-b border-gray-200"
              >
                {/* Comment gốc */}
                <div className="flex md:gap-6 gap-4 items-start">
                  <img
                    src={comment.avatarUrl}
                    alt="Avatar"
                    className="md:w-12 md:h-12 w-10 h-10 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="lg:text-base md:text-[15px] text-base font-medium pb-3">{comment.userName}</h4>
                    <p className="text-text lg:text-lg md:text-[17px] text-sm">{comment.content}</p>
                    <div className="flex gap-4 mt-4">
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
                      <div className="mt-3">
                        <textarea
                          placeholder="Thêm phản hồi"
                          className="w-full border border-border p-2 rounded text-white bg-[#262626]"
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
                    <div className="flex mt-4 md:text-lg text-xs md:gap-2 gap-[1px] text-star">
                      <Rating value={comment.rating} />
                    </div>
                    <div className="flex mt-2 text-text md:text-[15px] text-xs md:gap-4 gap-[6px] items-center">
                      <span className="flex-2 flex items-center md:gap-2 gap-[1px]">
                        {comment.likes || 0}
                        <AiFillLike className="text-blue-500" />
                      </span>
                      <span className="flex-2 flex items-center md:gap-2 gap-[1px]">
                        {comment.dislikes || 0}
                        <AiFillDislike className="text-red-500" />
                      </span>
                      <span>{comment.replies?.length || 0} phản hồi</span>
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
                      className="md:w-8 md:h-8 w-6 h-6 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="md:text-sm text-base font-semibold pb-3">{reply.userName}</h4>
                      <p className="text-text md:text-base text-sm">{reply.content}</p>
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

export default ShowRates;
