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

    res.json({
      data: movies,
    });
  } catch (error) {
    res.status(500).json({
      message:
        "failed to fetch movies list, something went wrong on the server",
      error: error.message,
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const idMovie = req.params.id;
    const movie = await getMoviesById(idMovie);

    if (!movie) {
      return res.status(404).json({
        message: "movie not found",
      });
    }

    res.json({
      data: movie,
    });
  } catch (error) {
    res.status(500).json({
      message:
        "failed to fetch the requested movie, something went wrong on the server",
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
    res.status(500).json({
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

    if (letsUpdate === 0) {
      return res.status(404).json({
        message: "movie not found",
      });
    } else {
      return res.status(200).json({
        message: "movie successfully updated",
        id: idMovie,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "failed to update movie, something went wrong on the server",
      error: error.message,
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const idMovie = req.params.id;
    const letsDelete = await deleteMovie(idMovie);

    if (letsDelete === 0) {
      return res.status(404).json({
        message: "movie not found",
      });
    } else {
      return res.status(200).json({
        message: "movie successfully deleted",
        id: idMovie,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "failed to delete movie, something went wrong on the server",
      error: error.message,
    });
  }
});

export default router;
