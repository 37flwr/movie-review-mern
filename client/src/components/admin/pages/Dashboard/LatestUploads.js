import React from "react";
import { BsBoxArrowUpRight, BsPencilSquare, BsTrash } from "react-icons/bs";
import BoxTitle from "./BoxTitle";

const LatestUploads = ({ movie }) => {
  return (
    <div className="dark:bg-secondary bg-white shadow p-5 rounded col-span-3">
      <BoxTitle title="Recent Uploads" />
      <MovieListItem
        movie={{
          poster:
            "https://images.unsplash.com/photo-1661956600655-e772b2b97db4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80",
          title: "asdasd",
          genres: ["Action", "Drama"],
          status: "Public",
        }}
      />
    </div>
  );
};

const MovieListItem = ({ movie, onDelete, onEdit, onOpen }) => {
  const { poster, title, genres = [], status } = movie;
  return (
    <table className="w-full border-b">
      <tbody>
        <tr>
          <td>
            <div className="w-24">
              <img className="w-full aspect-video" src={poster} alt="" />
            </div>
          </td>
          <td className="w-full pl-5">
            <div>
              <h1 className="font-semibold text-lg text-primary dark:text-white">
                {title}
              </h1>
              <div className="space-x-1">
                {genres?.map((genre, idx) => (
                  <span
                    key={genre + idx}
                    className="text-primary dark:text-white text-xs"
                  >
                    {genre}
                  </span>
                ))}
              </div>
            </div>
          </td>
          <td className="px-5">
            <p className="text-primary dark:text-white">{status}</p>
          </td>
          <td>
            <div className="flex items-center space-x-3 text-primary dark:text-white text-lg">
              <button onClick={onDelete} type="button">
                <BsTrash />
              </button>
              <button onClick={onEdit} type="button">
                <BsPencilSquare />
              </button>
              <button onClick={onOpen} type="button">
                <BsBoxArrowUpRight />
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default LatestUploads;
