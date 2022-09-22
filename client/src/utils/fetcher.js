import axios from "axios";

export const fetcher = async (url, params) => {
  const res = await axios.get(url, params && { ...params });
  if (res.error) throw new Error(res.statusText);

  return res;
};
