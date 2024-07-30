import { Router } from "express";
import { createBook, getAllBooks } from "../controllers/book.controller";
import { uploadMiddleware } from "../middleware/upload.middleware";

const router = Router();

router.post("/books", uploadMiddleware, createBook);
router.get("/books", getAllBooks);

export default router;
