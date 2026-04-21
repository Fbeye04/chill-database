import express from "express";
import {
  getAllMovies,
  getMoviesById,
  addMovie,
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
      message: "failed to fetch the data, something went wrong on the server",
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
      message: "failed to fetch the data, something went wrong on the server",
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
      message: "failed to fetch the data, something went wrong on the server",
      error: error.message,
    });
  }
});

export default router;
