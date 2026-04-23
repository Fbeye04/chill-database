import "dotenv/config";
import express from "express";
import cors from "cors";
import db from "./src/config/db.js";
import movieRoutes from "./src/routes/movie.routes.js";
import userRoutes from "./src/routes/user.routes.js";

const app = express();
const port = 5001;

app.use(cors());
app.use(express.json());

app.use("/api/movies", movieRoutes);
app.use("/api/users", userRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
