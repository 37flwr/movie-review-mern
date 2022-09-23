import { genres } from "./genres";

export const validateMovie = (movieInfo) => {
  const {
    title,
    storyLine,
    language,
    releaseDate,
    status,
    type,
    genres: formGenres,
    tags,
    cast,
    trailer,
  } = movieInfo;

  if (!title.trim()) return { error: "Title is missing" };
  if (!storyLine.trim()) return { error: "Story line is missing" };
  if (!language.trim()) return { error: "Language is missing" };
  if (!releaseDate.trim()) return { error: "Release date is missing" };
  if (!status.trim()) return { error: "Status is missing" };
  if (!type.trim()) return { error: "Type is missing" };
  // validation for genres
  if (!formGenres.length) return { error: "Genres are missing" };
  for (let genre of formGenres) {
    if (!genre.trim()) return { error: "Invalid genres" };
    if (!genres.includes(genre))
      return { error: `Please select valid genre. There is no such ${genre}` };
  }
  // validation for tags
  if (!tags.length) return { error: "Tags are missing" };
  for (let tag of tags) {
    if (!tag.trim()) return { error: "Invalid tags" };
  }
  // validation for cast
  if (!cast.length) return { error: "Cast and crew are missing" };
  for (let c of cast) {
    if (typeof c !== "object") return { error: "Invalid cast" };
  }
  // validation for trailer
  if (!trailer?.url || !trailer?.public_id)
    return { error: "Trailer is missing" };

  return { error: null };
};

export const isValidEmail = (email) => {
  const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return isValid.test(email);
};
