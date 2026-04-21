import db from "../config/db.js";

export const getAllMovies = async () => {
  const [rows] = await db.query("SELECT * FROM series_film");
  return rows;
};

export const getMoviesById = async (id) => {
  const [rows] = await db.query(
    "SELECT * FROM series_film WHERE id_seriesfilm = ?",
    [id],
  );
  return rows[0];
};

export const addMovie = async (movieData) => {
  const [result] = await db.query("INSERT INTO series_film SET ?", [movieData]);
  return result.insertId;
};
