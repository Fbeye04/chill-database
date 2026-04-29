import "dotenv/config";
import express from "express";
import cors from "cors";
import db from "./src/config/db.js";
import movieRoutes from "./src/routes/movie.routes.js";
import userRoutes from "./src/routes/user.routes.js";
import mylistRoutes from "./src/routes/mylist.routes.js";
import episodeRoutes from "./src/routes/episode.routes.js";

const app = express();
const port = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

app.use("/api/movies", movieRoutes);
app.use("/api/users", userRoutes);
app.use("/api/mylist", mylistRoutes);
app.use("/api/episodes", episodeRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
