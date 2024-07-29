import { Genre } from "./genre";

export interface Book {
  id: number;
  title: string;
  author: string;
  tome: number;
  genres: Genre[];
  price: number;
  publishedDate: Date;
  description: string;
  popularity: number;
  stock: number;
  thumbnailImagePath: string;
  coverImagePath: string;
}
