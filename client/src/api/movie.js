import { catchError, getToken } from "../utils/helper";
import client from "./client";

export const uploadTrailer = async (formData, onUploadProgress) => {
  const token = getToken();
  try {
    const { data } = await client.post("/movie/upload-trailer", formData, {
      headers: {
        authorization: "Bearer " + token,
        "content-type": "multipart/form-data",
      },
      onUploadProgress: ({ loaded, total }) => {
        if (onUploadProgress)
          onUploadProgress(Math.floor((loaded / total) * 100));
      },
    });
    return data;
  } catch (err) {
    return catchError(err);
  }
};

export const uploadMovie = async (formData) => {
  const token = getToken();
  try {
    const { data } = await client.post("/movie/create", formData, {
      headers: {
        authorization: "Bearer " + token,
        "content-type": "multipart/form-data",
      },
    });
    return data;
  } catch (err) {
    return catchError(err);
  }
};

export const getMovieForUpdate = async (movieId) => {
  const token = getToken();
  try {
    const { data } = await client.get(`/movie/for-update/${movieId}`, {
      headers: {
        authorization: "Bearer " + token,
      },
    });
    return data;
  } catch (err) {
    return catchError(err);
  }
};

export const updateMovie = async (movieId, formData) => {
  const token = getToken();
  try {
    const { data } = await client.patch(`/movie/update/${movieId}`, formData, {
      headers: {
        authorization: "Bearer " + token,
        "content-type": "multipart/form-data",
      },
    });
    return data;
  } catch (err) {
    return catchError(err);
  }
};
