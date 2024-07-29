import { DataTypes, Model } from "sequelize";
import sequelize from "../config/dbConfig";
import Book from "../models/book.model";

interface GenreAttributes {
  id?: number;
  name: string;
}

class Genre extends Model<GenreAttributes> implements GenreAttributes {
  public id!: number;
  public name!: string;

  public static associate() {
    Genre.belongsToMany(Book, {
      through: "BookGenres",
      as: "books",
      foreignKey: "genreId",
    });
  }
}

Genre.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "genres",
  }
);

export default Genre;
