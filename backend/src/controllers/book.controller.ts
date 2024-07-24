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
  } = req.body;
  const coverImagePath = req.file?.path;

  try {
    const newBook = await Book.create({
      title,
      author,
      tome,
      genre,
      price,
      publishedDate,
      description,
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
