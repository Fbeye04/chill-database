import db from "../config/db.js";
import bcrypt from "bcrypt";

// parameter disini nanti menjadi patokan pemanggilan di rute sehingga req.body harus dibongkar jadi { ..., ..., ...}
export const registerUser = async (username, email, password) => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const [result] = await db.query(
    "INSERT INTO user (username, email, password) VALUES (?, ?, ?)",
    [username, email, hashedPassword],
  );
  return result.insertId;
};

export const loginUser = async (username, password) => {
  // cuma username karena username lah yang unique dan password di database sudah di-hash jadi tidak akan sama dengan password ketikan sebelum nanti digunakan bcrypt untuk compare
  const [rows] = await db.query("SELECT * FROM user WHERE username = ?", [
    username,
  ]);

  if (rows.length === 0) {
    throw { status: 404, message: "Username not found!" };
  }

  // ini perbandingan password ketikan dengan password hashed di database
  const isMatch = await bcrypt.compare(password, rows[0].password);

  if (!isMatch) {
    throw { status: 401, message: "Wrong password, try again!" };
  }

  // ini adalah kode yang memotong agar saat login berhasil, nantinya password yang sudah di hash tidak muncul di pesan berhasilnya untuk menjaga kerahasiaan
  const { password: passwordDB, ...userWithoutPassword } = rows[0];

  return userWithoutPassword;
};

// disini data yang diambil langsung tanpa password sehingga tidak perlu seperti cara di atas namun alasannya karena ...
export const getUserProfile = async (id) => {
  const [rows] = await db.query(
    "SELECT id_user, username, email, foto_profil FROM user WHERE id_user = ?",
    [id],
  );

  if (rows.length === 0) {
    throw { status: 404, message: "User not found!" };
  }

  return rows[0];
};

export const updateUserProfile = async (id, newData) => {
  const [rows] = await db.query("SELECT * FROM user WHERE id_user = ?", [id]);

  if (rows.length === 0) {
    throw { status: 404, message: "User not found!" };
  }

  const oldData = rows[0];

  const finalUsername = newData.username || oldData.username;
  const finalEmail = newData.email || oldData.email;
  const finalPhoto = newData.foto_profil || oldData.foto_profil;

  let finalPassword = oldData.password;

  if (newData.password) {
    const saltRounds = 10;
    finalPassword = await bcrypt.hash(newData.password, saltRounds);
  }

  await db.query(
    "UPDATE user SET username = ?, email = ?, password = ?, foto_profil = ? WHERE id_user = ?",
    [finalUsername, finalEmail, finalPassword, finalPhoto, id],
  );

  return { message: "Profile updated successfully" };
};
