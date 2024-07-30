import { Router } from "express";
import { createGenre, getAllGenders } from "../controllers/genre.controller";

const router = Router();

router.post("/genres", createGenre);
router.get("/genres", getAllGenders);

export default router;
