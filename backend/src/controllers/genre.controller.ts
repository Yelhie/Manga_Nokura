import { Request, Response } from "express";
import { ValidationError } from "sequelize";
import Genre from "../models/genre.model";
import sequelize from "../config/dbConfig";

export const createGenre = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { name } = req.body;

  const transaction = await sequelize.transaction();

  try {
    const newGenre = await Genre.create({ name }, { transaction });

    await transaction.commit();
    res.status(201).json(newGenre);
  } catch (error) {
    await transaction.rollback();
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
        .json({ error: "Failed to create genre", details: error.message });
    } else {
      res.status(500).json({
        error: "Failed to create genre",
        details: "Unknown error occurred",
      });
    }
  }
};
