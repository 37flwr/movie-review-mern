export const getToken = () => localStorage.getItem("auth-token");

export const catchError = (error) => {
  const { response } = error;
  if (response?.data) return response.data;

  return { error: error.message || error };
};

export const createUrlForUI = (file) => {
  return URL.createObjectURL(file);
};

export const getCurrentPage = () => {
  return parseInt(new URL(document.location).searchParams.get("page"));
};
