import express, { Application } from "express";
import bookRoutes from "./routes/book.routes";
import genreRoutes from "./routes/genre.routes";
import cors from "cors";

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware CORS
app.use(cors());

app.use("/api", bookRoutes, genreRoutes);

export default app;
