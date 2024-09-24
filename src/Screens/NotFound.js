import React from "react";
import { Link } from "react-router-dom";
import { BiHomeAlt } from "react-icons/bi";

function NotFound() {
  return (
    <div className="flex-colo gap-8 w-full min-h-screen text-white bg-main lg:py-20 py-10 px-6">
      <img
        className="w-full h-96 object-contain"
        src="/images/404.png"
        alt="notfound"
      />
      <h1 className="lg:text-4xl font-bold">Oops ... Page not found</h1>
      <p className="font-medium text-border italic leading-6">
        The page you are looking for does not exist or other error occurred. Click the button below to return to the home page.
      </p>
      <Link
        to="/"
        className="bg-subMain transitions text-white flex-rows gap-4 font-medium py-3 hover:text-main px-6 rounded-md"
      >
        <BiHomeAlt />Go back Home
      </Link>
    </div>
  );
}

export default NotFound;
