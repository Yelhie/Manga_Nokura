import { Model, DataTypes } from "sequelize";
import sequelize from "../config/dbConfig";
import { BookAttributes, BookCreationAttributes } from "../types/book";

class Book
  extends Model<BookAttributes, BookCreationAttributes>
  implements BookAttributes
{
  public id!: number;
  public title!: string;
  public author!: string;
  public tome!: number;
  public genre!: string;
  public price!: number;
  public publishedDate!: Date;
  public description!: string;
  public popularity!: number;
  public stock!: number;
  public thumbnailImagePath!: string;
  public coverImagePath!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Book.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Le titre est obligatoire." },
        notEmpty: { msg: "Le titre ne peut pas être vide." },
      },
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "L'auteur est obligatoire." },
        notEmpty: { msg: "L'auteur ne peut pas être vide." },
      },
    },
    tome: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: "Le nombre de tome est obligatoire." },
        min: {
          args: [1],
          msg: "Le nombre de tome doit être supérieur ou égal à 1.",
        },
      },
    },
    genre: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Le genre est obligatoire." },
        notEmpty: { msg: "Le genre ne peut pas être vide." },
      },
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        notNull: { msg: "Le prix est obligatoire." },
        min: { args: [0], msg: "Le prix doit être supérieur ou égal à 0." },
      },
    },
    publishedDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
      validate: {
        len: {
          args: [10, 500],
          msg: "La description doit contenir entre 10 et 500 caractères.",
        },
      },
    },
    popularity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        min: {
          args: [0],
          msg: "La popularité doit être supérieure ou égale à 0.",
        },
      },
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        min: {
          args: [0],
          msg: "Le stock doit être supérieur ou égal à 0.",
        },
      },
    },
    thumbnailImagePath: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Le chemin de la miniature est obligatoire." },
        notEmpty: {
          msg: "Le chemin de la miniature ne peut pas être vide.",
        },
      },
    },
    coverImagePath: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Le chemin de l'image de couverture est obligatoire." },
        notEmpty: {
          msg: "Le chemin de l'image de couverture ne peut pas être vide.",
        },
      },
    },
  },
  {
    sequelize,
    tableName: "books",
  }
);

export default Book;
