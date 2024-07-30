import { DataTypes, Model } from "sequelize";
import sequelize from "../config/dbConfig";

interface BookGenreAttributes {
  bookId: number;
  genreId: number;
}

class BookGenre
  extends Model<BookGenreAttributes>
  implements BookGenreAttributes
{
  public bookId!: number;
  public genreId!: number;
}

BookGenre.init(
  {
    bookId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    genreId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
  },
  {
    sequelize,
    tableName: "BookGenres",
    timestamps: false,
  }
);

export default BookGenre;
