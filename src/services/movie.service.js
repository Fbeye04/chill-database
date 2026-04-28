import db from "../config/db.js";

export const getAllMovies = async () => {
  const [rows] = await db.query("SELECT * FROM series_film");

  return rows;
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

export const getMovieDetail = async (id) => {
  // ini akan mengambil semua data dari movie yang terpilih berdasarkan id (kalau lupa, coba lihat apa saja isinya di tabel database)
  const [masterRows] = await db.query(
    "SELECT * FROM series_film WHERE id_seriesfilm = ?",
    [id],
  );

  // kalau movie yang terpilih berdasarkan id itu tidak ada di dalam tabel maka akan dilemparkan error karena dia ghoib
  if (masterRows.length === 0) {
    throw {
      status: 404,
      message: "Series/film is not found",
    };
  }

  // barulah disini dari id movie tadi, diambil isi data episode/movie dari id tersebut (bisa lihat apa saja data yang ada di database)
  const [episodeRows] = await db.query(
    "SELECT * FROM episode_movie WHERE id_seriesfilm = ? ORDER BY urutan_episode ASC",
    [id],
  );

  // mengeluarkan data movie tadi dari array nya sehingga tersisa objek saja
  const movieData = masterRows[0];
  // baru lah disini data episode rows itu digabungkan sebagai bagian dari objek movie data tadi dengan nama episodes
  movieData.episodes = episodeRows;

  // makanya disini itu yang dipanggil lagi adalah movie data karena sudah menampung semuanya
  return movieData;
};
