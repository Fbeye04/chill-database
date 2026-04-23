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
  const [result] = await db.query("SELECT * FROM user WHERE username = ?", [
    username,
  ]);

  if (result.length === 0) {
    throw { status: 404, message: "Username not found!" };
  }

  // ini perbandingan password ketikan dengan password hashed di database
  const isMatch = await bcrypt.compare(password, result[0].password);

  if (!isMatch) {
    throw { status: 401, message: "Wrong password, try again!" };
  }

  const { password: passwordDB, ...userWithoutPassword } = result[0];

  return userWithoutPassword;
};
