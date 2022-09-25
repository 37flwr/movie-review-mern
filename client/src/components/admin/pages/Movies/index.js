import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useSWR from "swr";
import { getCurrentPage, getToken } from "../../../../utils/helper";
import Pagination from "../../navigation/Pagination";
import MovieListItem from "./MovieListItem";

const LIMIT = 10;

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [reachedToEnd, setReachedToEnd] = useState(false);

  const navigate = useNavigate();

  const page = getCurrentPage();
  const token = getToken();

  const { data } = useSWR([
    `http://localhost:8080/api/movie/movies?pageNumber=${page}&limit=${LIMIT}`,
    {
      headers: {
        authorization: "Bearer " + token,
        "content-type": "application/json",
      },
    },
  ]);

  useEffect(() => {
    if (data?.data?.movies?.length < LIMIT) {
      setReachedToEnd(true);
    }
    setMovies([...data.data.movies]);
  }, [data]);
  return (
    <div className="space-y-3 p-5">
      {movies.map((movie) => (
        <MovieListItem movie={movie} />
      ))}
      <Pagination
        prevDisabled={page === 1}
        prevOnClick={() => {
          if (page > 1) {
            setReachedToEnd(false);
            navigate(`${window.location.pathname}?page=${page - 1}`);
          }
        }}
        nextDisabled={reachedToEnd}
        nextOnClick={() => {
          if (!reachedToEnd) {
            navigate(`${window.location.pathname}?page=${page + 1}`);
          }
        }}
        customClassName="mt-5"
      />
    </div>
  );
};

export default Movies;
