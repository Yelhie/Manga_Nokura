import { Router } from "express";
import { createBook } from "../controllers/book.controller";
import { uploadMiddleware } from "../middleware/upload.middleware";

const router = Router();

router.post("/books", uploadMiddleware, createBook);

export default router;
