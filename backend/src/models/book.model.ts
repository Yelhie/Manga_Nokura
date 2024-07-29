import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/dbConfig";
import Genre from "../models/genre.model";

interface BookAttributes {
  id: number;
  title: string;
  author: string;
  tome: number;
  price: number;
  publishedDate: Date;
  description: string;
  popularity: number;
  stock: number;
  thumbnailImagePath: string;
  coverImagePath: string;
}

interface BookCreationAttributes extends Optional<BookAttributes, "id"> {}

class Book
  extends Model<BookAttributes, BookCreationAttributes>
  implements BookAttributes
{
  public id!: number;
  public title!: string;
  public author!: string;
  public tome!: number;
  public price!: number;
  public publishedDate!: Date;
  public description!: string;
  public popularity!: number;
  public stock!: number;
  public thumbnailImagePath!: string;
  public coverImagePath!: string;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public static associate() {
    Book.belongsToMany(Genre, {
      through: "BookGenres",
      as: "genres",
      foreignKey: "bookId",
    });
  }
}

Book.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Title is required" },
        notEmpty: { msg: "Title cannot be empty." },
      },
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Othor is required" },
        notEmpty: { msg: "Author cannot be empty." },
      },
    },
    tome: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: "Number of tome is required." },
        min: {
          args: [1],
          msg: "Number of tome must be greater than or equal to 1.",
        },
      },
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        notNull: { msg: "price is required." },
        min: { args: [0], msg: "Price must be greater than or equal to 0." },
      },
    },
    publishedDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: {
          args: [10, 500],
          msg: "Description must be between 10 and 500 characters.",
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
          msg: "Popularity must be greater than or equal to 0.",
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
          msg: "Stock must be greater than or equal to 0.",
        },
      },
    },
    thumbnailImagePath: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Path to thumbnail is required." },
        notEmpty: {
          msg: "Thumbnail image path cannot be empty.",
        },
      },
    },
    coverImagePath: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Path to cover image is required." },
        notEmpty: {
          msg: "Cover image path cannot be empty.",
        },
      },
    },
  },
  {
    sequelize,
    tableName: "books",
    timestamps: true,
  }
);

export default Book;
