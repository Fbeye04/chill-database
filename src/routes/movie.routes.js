import express from "express";
import {
  getAllMovies,
  getMoviesById,
  addMovie,
  updateMovie,
  deleteMovie,
} from "../services/movie.service.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const movies = await getAllMovies();

    res.status(200).json({
      message: "Successfully got all movies",
      data: movies,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to get movies, server error",
      error: error.message,
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const idMovie = req.params.id;
    const movie = await getMoviesById(idMovie);

    res.status(200).json({
      message: "Successfully got all movies",
      data: movie,
    });
  } catch (error) {
    if (error.status) {
      return res.status(error.status).json({ message: error.message });
    }

    return res.status(500).json({
      message: "Failed to get movie, server error",
      error: error.message,
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const newMovie = req.body;
    const newId = await addMovie(newMovie);

    res.status(201).json({
      message: "movie successfully received and added",
      id: newId,
    });
  } catch (error) {
    return res.status(500).json({
      message: "failed to add the movie, something went wrong on the server",
      error: error.message,
    });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const idMovie = req.params.id;
    const newMovie = req.body;
    const letsUpdate = await updateMovie(idMovie, newMovie); // jgn kaget, emang ini sesuai sama parameter bukan query

    res.status(200).json({
      message: letsUpdate.message,
    });
  } catch (error) {
    if (error.status) {
      return res.status(error.status).json({ message: error.message });
    }

    return res.status(500).json({
      message: "failed to update movie, something went wrong on the server",
      error: error.message,
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const idMovie = req.params.id;
    const letsDelete = await deleteMovie(idMovie);

    res.status(200).json({
      message: letsDelete.message,
    });
  } catch (error) {
    if (error.status) {
      return res.status(error.status).json({ message: error.message });
    }

    return res.status(500).json({
      message: "failed to delete movie, something went wrong on the server",
      error: error.message,
    });
  }
});

export default router;
