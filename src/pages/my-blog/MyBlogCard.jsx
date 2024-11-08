import React from "react";
import { Link } from "react-router-dom";

const MyBlogCard = ({ _id, title, category, image, shortDescription }) => {
  return (
    <div className="max-w-sm rounded-lg overflow-hidden shadow-lg">
      {/* Background image with overlay */}
      <div
        className="relative w-full h-[300px] bg-cover bg-center"
        style={{
          backgroundImage: `url(${image || "default-image.jpg"})`,
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50 rounded-t-lg"></div>
        <div className="relative z-10 px-8 py-8 flex flex-col gap-2">
          <div className="font-bold text-xl text-white">{title}</div>
          <p className="text-cyan-400 font-medium text-lg">{category}</p>
        </div>
      </div>

      <div className=" py-4">
        <p className="text-gray-700 text-base mt-2">{shortDescription}</p>
      </div>

      <div className=" py-4 flex gap-2">
        <Link
          to={`/details/${_id}`}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Details
        </Link>
        <Link
          to={`/update/${_id}`}
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
        >
          Update
        </Link>
      </div>
    </div>
  );
};

export default MyBlogCard;
