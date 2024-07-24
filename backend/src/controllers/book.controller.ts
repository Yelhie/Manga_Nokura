import { Request, Response } from "express";
import { ValidationError } from "sequelize";
import Book from "../models/book.models";

export const createBook = async (
  req: Request,
  res: Response
): Promise<void> => {
  let {
    title,
    author,
    tome,
    genre,
    price,
    publishedDate,
    description,
    coverImagePath = req.file?.path,
  } = req.body;

  // Vérification des champs manquants
  const missingFields = [];
  if (!title) missingFields.push("title missing");
  if (!author) missingFields.push("author missing");
  if (tome === undefined) missingFields.push("tome missing");
  if (!genre) missingFields.push("genre missing");
  if (price === undefined) missingFields.push("price missing");
  if (!description) missingFields.push("description missing");
  if (!coverImagePath) missingFields.push("coverImagePath missing");

  if (missingFields.length > 0) {
    res
      .status(400)
      .json({ error: "Missing required fields", details: missingFields });
    return;
  }

  if (!publishedDate) {
    publishedDate = new Date();
  }

  try {
    const newBook = await Book.create({
      title,
      author,
      tome,
      genre,
      price,
      publishedDate,
      description,
      coverImagePath: req.file?.path,
    });

    res.status(201).json(newBook);
  } catch (error) {
    if (error instanceof ValidationError) {
      res.status(400).json({
        error: "Validation error",
        details: error.errors.map((e) => ({
          message: e.message,
          path: e.path,
        })),
      });
    } else if (error instanceof Error) {
      res
        .status(500)
        .json({ error: "Failed to create book", details: error.message });
    } else {
      res.status(500).json({
        error: "Failed to create book",
        details: "Unknown error occurred",
      });
    }
  }
};
