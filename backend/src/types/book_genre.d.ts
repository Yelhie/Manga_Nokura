import { Model, DataTypes, Sequelize } from "sequelize";

export interface BookGenreAttributes {
  bookId: number;
  genreId: number;
}

export interface BookGenreInstance
  extends Model<BookGenreAttributes>,
    BookGenreAttributes {}

declare const BookGenre: typeof Model & {
  new (values?: object, options?: any): BookGenreInstance;
  init(attributes: any, options: any): typeof Model;
};

export default BookGenre;
