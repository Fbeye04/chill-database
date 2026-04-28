import db from "../config/db.js";

export const addEpisode = async (episodeData) => {
  const {
    id_seriesfilm,
    urutan_episode,
    judul_episode,
    video_url,
    durasi_episode,
  } = episodeData;

  if (
    !id_seriesfilm ||
    !urutan_episode ||
    !judul_episode ||
    !video_url ||
    !durasi_episode
  ) {
    throw {
      status: 400,
      message:
        "Failed to add episode. Make sure you have filled in the series/film ID, Sequence, Title, Video URL, and Duration.",
    };
  }

  const [result] = await db.query("INSERT INTO episode_movie SET ?", [
    episodeData,
  ]);

  return result.insertId;
};

export const updateEpisode = async (id, newData) => {
  const [result] = await db.query(
    "UPDATE episode_movie SET ? WHERE id_episodemovie = ?",
    [newData, id],
  );

  if (result.affectedRows === 0) {
    throw { status: 404, message: "Episode not found to update!" };
  }

  return { message: "Episode updated successfully" };
};

export const deleteEpisode = async (id) => {
  const [result] = await db.query(
    "DELETE FROM episode_movie WHERE id_episodemovie = ?",
    [id],
  );

  if (result.affectedRows === 0) {
    throw { status: 404, message: "Episode not found to delete!" };
  }

  return { message: "Episode deleted successfully" };
};
