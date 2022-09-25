import React from "react";
import MovieListItem from "../Movies/MovieListItem";
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

export default LatestUploads;
