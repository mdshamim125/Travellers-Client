import React from "react";
import { Link } from "react-router-dom";

const MyBlogCard = ({ _id, title, category, image, shortDescription }) => {
    console.log(_id);
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      <img src={image} alt={title} className="w-full h-[300px]" />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{title}</div>
        <p className="text-cyan-600 font-medium text-lg">{category}</p>
        <p className="text-gray-700 text-base mt-2">{shortDescription}</p>
      </div>
      <div className="px-6 py-4">
        <Link className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
          Details
        </Link>
        <Link  to={`/update/${_id}`} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
          Update
        </Link>
      </div>
    </div>
  );
};

export default MyBlogCard;
