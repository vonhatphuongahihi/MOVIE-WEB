import React, { useState } from "react";
import Titles from "../Titles";
import { BsBookmarkStarFill } from "react-icons/bs";
import { Message, Select } from "../UsedInputs";
import Rating from "../Stars";
import { UsersData } from "../../Data/MovieData";

function MovieRates({ movie }) {
  const Ratings = [
    {
      title: " Rất kém  ",
      value: 0,
    },
    {
      title: " Kém",
      value: 1,
    },
    {
      title: " Trung bình",
      value: 2,
    },
    {
      title: " Tốt",
      value: 3,
    },
    {
      title: " Rất tốt",
      value: 4,
    },
    {
      title: " Tuyệt vời",
      value: 5,
    },
  ];

  const [rating, setRating] = useState();

  return (
    <div className="my-12">
      <Titles title="Reviews" Icon={BsBookmarkStarFill} />
      <div className="mt-10 xl:grid flex-colo grid-cols-5 gap-12 bg-dry xs:p-10 py-10 px-2 sm:p-20 rounded">
        {/* write review */}
        <div className="xl:col-span-2 w-full flex flex-col gap-8">
          <h3 className="text-xl text-text font-semibold">
            Bình luận 
          </h3>
          
          {/* message */}
          <Message placeholder="Cảm nhận về phim...." />
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
          
          {/* submit */}
          <button className="bg-subMain text-white py-3 w-full flex-colo rounded">
            Gửi
          </button>
        </div>
        {/* REVIWERS <img
                    src={`/images/${user ? user.image : "user.jpg"}`}
                    alt={user.fullName}
                    className="w-full h-24 rounded-lg object-cover"
                  />*/}
        <div className="col-span-3 flex flex-col gap-6">
          <h3 className="text-xl text-text font-semibold">Chưa có bình luận</h3>
          
          <img
                    src="/images/NoReview.jpg"
                    alt="No"
                    className="w-full h-full rounded-lg object-cover"
                  />
          
        </div>
      </div>
    </div>
  );
}

export default MovieRates;
