import { catchError, getToken } from "../utils/helper";
import client from "./client";

export const createActor = async (formData) => {
  const token = getToken();
  try {
    const { data } = await client.post("/actor/create", formData, {
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

export const updateActor = async (id, formData) => {
  const token = getToken();
  try {
    const { data } = await client.post(`/actor/update/${id}`, formData, {
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

export const searchActor = async (query) => {
  const token = getToken();
  try {
    const { data } = await client.get(`/actor/search?name=${query}`, {
      headers: {
        authorization: "Bearer " + token,
      },
    });
    return data;
  } catch (err) {
    return catchError(err);
  }
};

export const fetchActors = async (page, limit) => {
  const token = getToken();
  try {
    const { data } = await client.get(
      `http://localhost:8080/api/actor/actors?pageNumber=${page}&limit=${limit}`,
      {
        headers: {
          authorization: "Bearer " + token,
          "content-type": "multipart/form-data",
        },
      }
    );
    return data;
  } catch (err) {
    return catchError(err);
  }
};

export const deleteActor = async (id) => {
  const token = getToken();
  try {
    const { data } = await client.delete(`actor/${id}`, {
      headers: {
        authorization: "Bearer " + token,
      },
    });
    return data;
  } catch (err) {
    return catchError(err);
  }
};
