import { Request, Response } from "express";
import { ValidationError } from "sequelize";
import Book from "../models/book.models";

export const createBook = async (
  req: Request,
  res: Response
): Promise<void> => {
  const {
    title,
    author,
    tome,
    genre,
    price,
    publishedDate = new Date(),
    description,
    popularity,
    stock,
  } = req.body;

  let thumbnailImagePath: string | undefined;
  let coverImagePath: string | undefined;

  if (req.files && !Array.isArray(req.files)) {
    if (req.files.thumbnail && Array.isArray(req.files.thumbnail)) {
      thumbnailImagePath = req.files.thumbnail[0]?.path;
    }
    if (req.files.cover && Array.isArray(req.files.cover)) {
      coverImagePath = req.files.cover[0]?.path;
    }
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
      popularity,
      stock,
      thumbnailImagePath,
      coverImagePath,
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
