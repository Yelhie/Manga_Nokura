import sequelize from "../../src/config/dbConfig";
import Book from "../../src/models/book.model";

beforeAll(async () => {
  await sequelize.authenticate();
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

describe("Book Model", () => {
  it("should validate a book with all required fields", async () => {
    const book = Book.build({
      title: "Test Title",
      author: "Test Author",
      tome: 1,
      price: 10.99,
      publishedDate: new Date(),
      description: "This is a valid description.",
      popularity: 5,
      stock: 10,
      thumbnailImagePath: "/uploads/thumbail/test-image.jpg",
      coverImagePath: "/uploads/cover/test-image.jpg",
    });

    await expect(book.validate()).resolves.not.toThrow();
  });

  it("should throw a validation error if title is missing", async () => {
    const book = Book.build({
      title: "",
      author: "Test Author",
      tome: 1,
      price: 10.99,
      publishedDate: new Date(),
      description: "This is a valid description.",
      popularity: 5,
      stock: 10,
      thumbnailImagePath: "/uploads/thumbail/test-image.jpg",
      coverImagePath: "/uploads/cover/test-image.jpg",
    });

    await expect(book.validate()).rejects.toThrow("Title cannot be empty.");
  });

  it("should throw a validation error if author is missing", async () => {
    const book = Book.build({
      title: "Test Title",
      author: "",
      tome: 1,
      price: 10.99,
      publishedDate: new Date(),
      description: "This is a valid description.",
      popularity: 5,
      stock: 10,
      thumbnailImagePath: "/uploads/thumbail/test-image.jpg",

      coverImagePath: "/uploads/cover/test-image.jpg",
    });

    await expect(book.validate()).rejects.toThrow("Author cannot be empty.");
  });

  it("should throw a validation error if tome is negative", async () => {
    const book = Book.build({
      title: "Test Title",
      author: "Test Author",
      tome: -1,
      price: 10.99,
      publishedDate: new Date(),
      description: "This is a valid description.",
      popularity: 5,
      stock: 10,
      thumbnailImagePath: "/uploads/thumbail/test-image.jpg",
      coverImagePath: "/uploads/cover/test-image.jpg",
    });

    await expect(book.validate()).rejects.toThrow(
      "Number of tome must be greater than or equal to 1"
    );
  });

  it("should throw a validation error if price is negative", async () => {
    const book = Book.build({
      title: "Test Title",
      author: "Test Author",
      tome: 1,
      price: -1,
      publishedDate: new Date(),
      description: "This is a valid description.",
      popularity: 5,
      stock: 10,
      thumbnailImagePath: "/uploads/thumbail/test-image.jpg",
      coverImagePath: "/uploads/cover/test-image.jpg",
    });

    await expect(book.validate()).rejects.toThrow(
      "Price must be greater than or equal to 0"
    );
  });

  it("should throw a validation error if description is missing", async () => {
    const book = Book.build({
      title: "Test Title",
      author: "Test Author",
      tome: 1,
      price: 10.99,
      publishedDate: new Date(),
      description: "short",
      popularity: 5,
      stock: 10,
      thumbnailImagePath: "/uploads/thumbail/test-image.jpg",
      coverImagePath: "/uploads/cover/test-image.jpg",
    });

    await expect(book.validate()).rejects.toThrow(
      "Description must be between 10 and 500 characters."
    );
  });

  it("should throw a validation error if popularity is negative", async () => {
    const book = Book.build({
      title: "Test Title",
      author: "Test Author",
      tome: 1,
      price: 10.99,
      publishedDate: new Date(),
      description: "This is a valid description.",
      popularity: -1,
      stock: 10,
      thumbnailImagePath: "/uploads/thumbail/test-image.jpg",
      coverImagePath: "/uploads/cover/test-image.jpg",
    });

    await expect(book.validate()).rejects.toThrow();
  });

  it("should throw a validation error if stock is negative", async () => {
    const book = Book.build({
      title: "Test Title",
      author: "Test Author",
      tome: 1,
      price: 10.99,
      publishedDate: new Date(),
      description: "This is a valid description.",
      popularity: 5,
      stock: -1,
      thumbnailImagePath: "/uploads/thumbail/test-image.jpg",
      coverImagePath: "/uploads/cover/test-image.jpg",
    });

    await expect(book.validate()).rejects.toThrow(
      "Stock must be greater than or equal to 0."
    );
  });

  it("should throw a validation error if thumbnailImagePath is missing", async () => {
    const book = Book.build({
      title: "Test Title",
      author: "Test Author",
      tome: 1,
      price: 10.99,
      publishedDate: new Date(),
      description: "This is a valid description.",
      popularity: 5,
      stock: 10,
      thumbnailImagePath: "",
      coverImagePath: "/uploads/cover/test-image.jpg",
    });

    await expect(book.validate()).rejects.toThrow(
      "Thumbnail image path cannot be empty."
    );
  });

  it("should throw a validation error if coverImagePath is missing", async () => {
    const book = Book.build({
      title: "Test Title",
      author: "Test Author",
      tome: 1,
      price: 10.99,
      publishedDate: new Date(),
      description: "This is a valid description.",
      popularity: 5,
      stock: 10,
      thumbnailImagePath: "/uploads/thumbail/test-image.jpg",
      coverImagePath: "",
    });

    await expect(book.validate()).rejects.toThrow(
      "Cover image path cannot be empty."
    );
  });
});
