import { ValidationError } from "sequelize";
import { Request, Response } from "express";
import fs from "fs";
import Book from "../models/book.model";
import Genre from "../models/genre.model";
import sequelize from "../config/dbConfig";
import exp from "constants";

export const createBook = async (req: Request, res: Response) => {
  const transaction = await sequelize.transaction(); // start a transaction to ensure data consistency in the database

  let thumbnailImagePath = "";
  let coverImagePath = "";

  try {
    const {
      title,
      author,
      tome,
      genres,
      price,
      publishedDate = new Date(),
      description,
      popularity,
      stock,
    } = req.body;

    if (req.files && !Array.isArray(req.files)) {
      if (req.files.thumbnail && req.files.thumbnail.length > 0) {
        thumbnailImagePath = req.files.thumbnail[0].path;
      }
      if (req.files.cover && req.files.cover.length > 0) {
        coverImagePath = req.files.cover[0].path;
      }
    }

    const newBook = await Book.create(
      {
        title,
        author,
        tome,
        price,
        publishedDate,
        description,
        popularity,
        stock,
        thumbnailImagePath,
        coverImagePath,
      },
      { transaction }
    );

    if (genres && genres.length > 0) {
      const genreInstances = await Genre.findAll({
        where: {
          id: genres,
        },
      });

      await (newBook as any).addGenres(genreInstances, { transaction });
    }

    await transaction.commit();
    res.status(201).json(newBook);
  } catch (error) {
    await transaction.rollback();

    // delete uploaded images if transaction fails
    if (thumbnailImagePath) {
      fs.unlink(thumbnailImagePath, (err) => {
        if (err) console.error("Error deleting thumbnail image:", err);
      });
    }
    if (coverImagePath) {
      fs.unlink(coverImagePath, (err) => {
        if (err) console.error("Error deleting cover image:", err);
      });
    }

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

export const getAllBooks = async (req: Request, res: Response) => {
  try {
    const books = await Book.findAll();
    res.status(200).json(books);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({
        message: "Failed to retrieve books",
        error: error.message,
      });
    }
  }
};
