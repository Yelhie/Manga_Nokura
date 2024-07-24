export interface BookAttributes {
  id: number;
  title: string;
  author: string;
  tome: number;
  genre: string;
  price: number;
  publishedDate: Date;
  description: string;
  coverImagePath: string;
}

export interface BookCreationAttributes extends Partial<BookAttributes> {
  id?: number;
}
