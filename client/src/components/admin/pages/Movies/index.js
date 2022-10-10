import React, { Suspense, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useSWR from "swr";
import { getMovieForUpdate, updateMovie } from "../../../../api/movie";
import { useNotification } from "../../../../hooks";
import UpdateMovieModal from "../../../../modals/UpdateMovieModal";
import { getCurrentPage, getToken } from "../../../../utils/helper";
import Loading from "../../../fallback/Loading";
import Pagination from "../../navigation/Pagination";
import MovieListItem from "./MovieListItem";

const LIMIT = 10;

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [modal, setModal] = useState("");
  const [modalContext, setModalContext] = useState({});
  const [reachedToEnd, setReachedToEnd] = useState(false);

  const navigate = useNavigate();

  const updateNotification = useNotification();
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

  const handleOnEdit = async ({ id }) => {
    const { error, movie } = await getMovieForUpdate(id);
    if (error) return updateNotification("error", error);
    setModalContext(movie);
    setModal("update");
  };

  const handleModalContextChange = (value) => {
    console.log(value);
    setModalContext(value);
  };

  const handleOnDelete = () => {};

  useEffect(() => {
    if (data?.data?.movies?.length < LIMIT) {
      setReachedToEnd(true);
    }
    setMovies([...data.data.movies]);
  }, [data]);

  return (
    <>
      <div className="space-y-3 p-5">
        <Suspense fallback={<Loading />}>
          {movies.map((movie) => (
            <MovieListItem
              movie={movie}
              onEdit={() => handleOnEdit(movie)}
              onDelete={() => handleOnDelete()}
            />
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
        </Suspense>
      </div>
      {modal && (
        <UpdateMovieModal
          values={modalContext}
          handleChange={(value) => handleModalContextChange(value)}
          onSubmit={(values) => {
            console.log(values);
            setModal(false);
            updateMovie(modalContext.id, values);
            setModalContext({});
          }}
        />
      )}
    </>
  );
};

export default Movies;
