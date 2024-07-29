import { Router } from "express";
import { createGenre } from "../controllers/genre.controller";

const router = Router();

router.post("/genres", createGenre);

export default router;
