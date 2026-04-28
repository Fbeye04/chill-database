import express from "express";
import {
  addEpisode,
  updateEpisode,
  deleteEpisode,
} from "../services/episode.service.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const newEpisode = req.body;
    const newId = await addEpisode(newEpisode);

    res.status(201).json({
      message: "episode successfully received and added",
      id: newId,
    });
  } catch (error) {
    if (error.status) {
      return res.status(error.status).json({
        message: error.message,
      });
    }

    return res.status(500).json({
      message: "The episode failed to add. An error occurred on the server.",
      error: error.message,
    });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const idEpisode = req.params.id;
    const newEpisode = req.body;
    const letsUpdate = await updateEpisode(idEpisode, newEpisode);

    res.status(200).json({
      message: letsUpdate.message,
    });
  } catch (error) {
    if (error.status) {
      return res.status(error.status).json({
        message: error.message,
      });
    }

    return res.status(500).json({
      message:
        "failed to update the episode, something went wrong on the server",
      error: error.message,
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const idEpisode = req.params.id;
    const letsDelete = await deleteEpisode(idEpisode);

    res.status(200).json({
      message: letsDelete.message,
    });
  } catch (error) {
    if (error.status) {
      return res.status(error.status).json({
        message: error.message,
      });
    }

    return res.status(500).json({
      message: "failed to delete episode, something went wrong on the server",
      error: error.message,
    });
  }
});

export default router;
