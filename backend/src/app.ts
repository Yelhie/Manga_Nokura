import express, { Application } from "express";
import bookRoutes from "./routes/book.routes";

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", bookRoutes);

export default app;
