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

  if (rows.length === 0) {
    throw { status: 404, message: "Movie not found!" };
  }

  return rows[0];
};

export const addMovie = async (movieData) => {
  const [result] = await db.query("INSERT INTO series_film SET ?", [movieData]);
  return result.insertId;
};

export const updateMovie = async (id, newData) => {
  const [result] = await db.query(
    // urutan baku query sql: UPDATE [nama_tabel] SET [data_yang_diubah] WHERE [kondisi_target]
    "UPDATE series_film SET ? WHERE id_seriesfilm = ?",
    [newData, id], // walaupun di parameter id duluan tapi di query harus sesuai dengan urutan query
  );

  // kenapa tidak menggunakan length? karena memang hasilnya bukan array, ini perintah ke database langsung melainkan objek laporan
  if (result.affectedRows === 0) {
    throw { status: 404, message: "Movie not found to update!" };
  }

  return { message: "Movie updated successfully" };
};

export const deleteMovie = async (id) => {
  const [result] = await db.query(
    "DELETE FROM series_film WHERE id_seriesfilm = ?",
    [id],
  );

  if (result.affectedRows === 0) {
    throw { status: 404, message: "Movie not found to delete!" };
  }

  return { message: "Movie deleted successfully" };
};
