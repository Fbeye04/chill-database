import db from "../config/db.js";

export const addToMyList = async (idUser, idSeriesFilm) => {
  // perlu dua id sebagai akibat sebagai tabel penghubung
  const [rows] = await db.query(
    "SELECT * FROM daftar_saya WHERE id_user = ? AND id_seriesfilm = ?",
    [idUser, idSeriesFilm],
  );

  // memblokir agar series/film yang sudah masuk ke daftar saya tidak ditambahkan dua kali
  if (rows.length > 0) {
    throw { status: 400, message: "Series/film is already in your list" };
  }

  await db.query(
    "INSERT INTO daftar_saya (id_user, id_seriesfilm) VALUES (?, ?)",
    [idUser, idSeriesFilm],
  );

  return { message: "Series/film successfully added to my list" };
};

export const getMyList = async (idUser) => {
  // penyaring pertama agar user ghoib tidak lewat tapi juga muncul sebagai error
  const [userRows] = await db.query(
    "SELECT id_user, username, email, foto_profil FROM user WHERE id_user = ?",
    [idUser],
  );

  if (userRows.length === 0) {
    throw { status: 404, message: "User not found!" };
  }

  // barulah disini data yang dibutuhkan untuk ditampilkan di daftar saya bisa diambil
  const [movieRows] = await db.query(
    `SELECT series_film.* FROM daftar_saya JOIN series_film ON daftar_saya.id_seriesfilm = series_film.id_seriesfilm WHERE daftar_saya.id_user = ?`,
    [idUser],
  );

  return movieRows;
};

export const deleteFromMyList = async (idUser, idSeriesFilm) => {
  const [result] = await db.query(
    "DELETE FROM daftar_saya WHERE id_user = ? AND id_seriesfilm = ?",
    [idUser, idSeriesFilm],
  );

  if (result.affectedRows === 0) {
    throw {
      status: 404,
      message: "No series/film found to remove from my list",
    };
  }

  return { message: "Series/movie successfully removed from my list" };
};
