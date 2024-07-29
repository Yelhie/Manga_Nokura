import Book from "./book.model";
import Genre from "./genre.model";
import BookGenre from "./book_genre.model";

Book.associate();
Genre.associate();

export { Book, Genre, BookGenre };
