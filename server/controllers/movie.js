const { sendError, formatActor } = require("../utils/helper");
const cloudinary = require("../cloud");
const Movie = require("../models/movie");
const Actor = require("../models/actor");
const { isValidObjectId } = require("mongoose");

exports.uploadTrailer = async (req, res) => {
  const { file } = req;
  if (!file) return sendError(res, "Video file is missing");

  const { secure_url: url, public_id } = await cloudinary.uploader.upload(
    file.path,
    {
      resource_type: "video",
    }
  );
  res.status(201).json({ url, public_id });
};

exports.createMovie = async (req, res) => {
  const { file, body } = req;
  const {
    title,
    storyLine,
    director,
    releaseDate,
    status,
    type,
    genres,
    tags,
    cast,
    writers,
    trailer,
    language,
  } = body;

  const newMovie = new Movie({
    title,
    storyLine,
    releaseDate,
    status,
    type,
    genres,
    tags,
    cast,
    trailer,
    language,
  });

  // uploading director
  if (director) {
    if (!isValidObjectId(director))
      return sendError(res, "Invalid director id");
    newMovie.director = director;
  }
  // uploading writers
  if (writers) {
    for (let writerId of writers) {
      if (!isValidObjectId(writerId))
        return sendError(res, "Invalid writer id");
    }
    newMovie.writers = writers;
  }
  // Uploading poster
  if (file) {
    const {
      secure_url: url,
      public_id,
      responsive_breakpoints,
    } = await cloudinary.uploader.upload(file.path, {
      transformation: {
        width: 1280,
        height: 720,
      },
      responsive_breakpoints: {
        create_derived: true,
        max_width: 640,
        max_images: 3,
      },
    });

    const poster = { url, public_id, responsive: [] };
    const { breakpoints } = responsive_breakpoints[0];
    if (breakpoints.length) {
      for (let imgObj of breakpoints) {
        const { secure_url } = imgObj;
        poster.responsive.push(secure_url);
      }
    }
    newMovie.poster = poster;
  }

  await newMovie.save();

  res.status(201).json({
    id: newMovie._id,
    title,
  });
};

exports.updateMovie = async (req, res) => {
  const { movieId } = req.params;
  const { file } = req;

  if (!isValidObjectId(movieId)) return sendError(res, "Invalid movie id");

  const movie = await Movie.findById(movieId);
  if (!movie) return sendError(res, "Movie not found", 404);

  const {
    title,
    storyLine,
    director,
    releaseDate,
    status,
    type,
    genres,
    tags,
    cast,
    writers,
    language,
  } = req.body;

  movie.title = title;
  movie.storyLine = storyLine;
  movie.tags = tags;
  movie.releaseDate = releaseDate;
  movie.status = status;
  movie.type = type;
  movie.genres = genres;
  movie.cast = cast;
  movie.language = language;

  if (director) {
    if (!isValidObjectId(director))
      return sendError(res, "Invalid director id");
    movie.director = director;
  }
  if (writers) {
    for (let writerId of writers) {
      if (!isValidObjectId(writerId))
        return sendError(res, "Invalid writer id");
    }
    movie.writers = writers;
  }

  // Update poster
  if (file) {
    // Removing poster from cloud is there is any
    const publicId = movie.poster?.public_id;
    if (publicId) {
      const { result } = await cloudinary.uploader.destroy(publicId);

      if (result !== "ok") {
        return sendError(res, "Could not update poster at the moment");
      }
    }

    const {
      secure_url: url,
      public_id,
      responsive_breakpoints,
    } = await cloudinary.uploader.upload(req.file.path, {
      transformation: {
        width: 1280,
        height: 720,
      },
      responsive_breakpoints: {
        create_derived: true,
        max_width: 640,
        max_images: 3,
      },
    });

    const poster = { url, public_id, responsive: [] };
    const { breakpoints } = responsive_breakpoints[0];
    if (breakpoints.length) {
      for (let imgObj of breakpoints) {
        const { secure_url } = imgObj;
        poster.responsive.push(secure_url);
      }
    }
    movie.poster = poster;
  }

  await movie.save();
  res.json({ message: "Movie is updated", movie });
};

exports.updateMovieWithoutPoster = async (req, res) => {
  const { movieId } = req.params;

  if (!isValidObjectId(movieId)) return sendError(res, "Invalid movie id");

  const movie = await Movie.findById(movieId);
  if (!movie) return sendError(res, "Movie not found", 404);

  const {
    title,
    storyLine,
    director,
    releaseDate,
    status,
    type,
    genres,
    tags,
    cast,
    writers,
    trailer,
    language,
  } = req.body;

  movie.title = title;
  movie.storyLine = storyLine;
  movie.tags = tags;
  movie.releaseDate = releaseDate;
  movie.status = status;
  movie.type = type;
  movie.genres = genres;
  movie.cast = cast;
  movie.trailer = trailer;
  movie.language = language;

  //   if (director) {
  //     if (!isValidObjectId(director))
  //       return sendError(res, "Invalid director id");
  //     movie.director = director;
  //   }
  //   if (writers) {
  //     for (let writerId of writers) {
  //       if (!isValidObjectId(writerId))
  //         return sendError(res, "Invalid writer id");
  //     }
  //     movie.writers = writers;
  //   }

  await movie.save();
  res.json({ message: "Movie is updated", movie });
};

exports.removeMovie = async (req, res) => {
  const { movieId } = req.params;

  if (!isValidObjectId(movieId)) return sendError(res, "Invalid movie id");

  const movie = await Movie.findById(movieId);
  if (!movie) return sendError(res, "Movie not found", 404);

  const posterId = movie.poster?.public_id;
  if (posterId) {
    const { result } = await cloudinary.uploader.destroy(posterId);
    if (result !== "ok")
      return sendError(res, "Could not remove poster from cloud");
  }

  // Removing trailer
  const trailerId = movie.trailer.public_id;
  if (!trailerId)
    return sendError(res, "Something went wrong. Could not find trailer");

  const { result } = await cloudinary.uploader.destroy(trailerId, {
    resource_type: "video",
  });
  if (result !== "ok")
    return sendError(res, "Could not remove trailer from cloud");

  await Movie.findByIdAndDelete(movieId);
  res.json({ message: "Movie removed successfully" });
};

exports.getMovies = async (req, res) => {
  const { pageNumber = 1, limit = 10 } = req.query;

  const movies = await Movie.find({})
    .sort({ createdAt: -1 })
    .skip((parseInt(pageNumber) - 1) * parseInt(limit))
    .limit(parseInt(limit));

  if (!movies) return sendError(res, "No movies found", 404);

  const formattedMovies = movies.map((movie) => ({
    id: movie._id,
    title: movie.title,
    poster: movie.poster?.url,
    genres: movie.genres,
    status: movie.status,
  }));

  res.json({ movies: formattedMovies });
};

exports.getMovieForUpdate = async (req, res) => {
  const { movieId } = req.params;

  if (!isValidObjectId(movieId)) return sendError(res, "Id is invalid");

  const movie = await Movie.findById(movieId).populate(
    "director writers cast.actor"
  );
  console.log(movie);

  res.json({
    movie: {
      id: movie._id,
      title: movie.title,
      storyLine: movie.storyLine,
      poster: movie.poster?.url,
      releaseDate: movie.releaseDate,
      status: movie.status,
      type: movie.type,
      language: movie.language,
      genres: movie.genres,
      tags: movie.tags,
      director: formatActor(movie.director),
      writers: movie.writers.map((writer) => formatActor(writer)),
      cast: movie.cast.map((c) => ({
        id: c.id,
        profile: formatActor(c.actor),
        roleAs: c.roleAs,
        leadActor: c.leadActor,
      })),
    },
  });
};
