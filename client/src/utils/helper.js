export const isValidEmail = (email) => {
  const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return isValid.test(email);
};

export const getToken = () => localStorage.getItem("auth-token");

export const catchError = (error) => {
  const { response } = error;
  if (response?.data) return response.data;

  return { error: error.message || error };
};

export const createUrlForUI = (file) => {
  return URL.createObjectURL(file);
};
