import express from "express";
import {
  addToMyList,
  getMyList,
  deleteFromMyList,
} from "../services/mylist.service.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { idUser, idSeriesFilm } = req.body;
    const letsAdd = await addToMyList(idUser, idSeriesFilm);

    res.status(201).json({
      message: letsAdd.message,
    });
  } catch (error) {
    if (error.status) {
      return res.status(error.status).json({
        message: error.message,
      });
    }
    return res.status(500).json({
      message:
        "failed to add series/film to my list, something went wrong on the server",
      error: error.message,
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const idUser = req.params.id;
    const yourList = await getMyList(idUser);

    res.status(200).json({
      message: "Successfully display your list",
      data: yourList,
    });
  } catch (error) {
    if (error.status) {
      return res.status(error.status).json({
        message: error.message,
      });
    }

    return res.status(500).json({
      message: "Failed to get your list, something went wrong on the server",
      error: error.message,
    });
  }
});

// alasan dibalik endpoint hanya kosong karena kebutuhan dua id maka dua id tersebut di proses di kode saja
router.delete("/", async (req, res) => {
  try {
    const { idUser, idSeriesFilm } = req.body;
    const letsDelete = await deleteFromMyList(idUser, idSeriesFilm);

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
      message:
        "Failed to remove series/movie from my list. An error occurred on the server.",
      error: error.message,
    });
  }
});

export default router;
