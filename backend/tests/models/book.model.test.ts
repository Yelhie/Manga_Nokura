import Book from "../../src/models/book.model";

describe("Book Model", () => {
  it("should validate a book with all required fields", async () => {
    const book = await Book.create({
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

    expect(book).toBeTruthy();
    expect(book.title).toBe("Test Title");
    expect(book.author).toBe("Test Author");
    expect(book.tome).toBe(1);
    expect(book.price).toBe(10.99);
    expect(book.publishedDate).toBeInstanceOf(Date);
    expect(book.description).toBe("This is a valid description.");
    expect(book.popularity).toBe(5);
    expect(book.stock).toBe(10);
    expect(book.thumbnailImagePath).toBe("/uploads/thumbail/test-image.jpg");
    expect(book.coverImagePath).toBe("/uploads/cover/test-image.jpg");
  });

  it("should throw a validation error if title is missing", async () => {
    await expect(
      Book.create({
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
      })
    ).rejects.toThrow("Validation error: Title cannot be empty.");
  });

  it("should throw a validation error if author is missing", async () => {
    await expect(
      Book.create({
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
      })
    ).rejects.toThrow("Validation error: Author cannot be empty.");
  });

  it("should throw a validation error if tome is negative", async () => {
    await expect(
      Book.create({
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
      })
    ).rejects.toThrow(
      "Validation error: Number of tome must be greater than or equal to 1."
    );
  });

  it("should throw a validation error if price is negative", async () => {
    await expect(
      Book.create({
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
      })
    ).rejects.toThrow(
      "Validation error: Price must be greater than or equal to 0."
    );
  });

  it("should throw a validation error if description is missing", async () => {
    await expect(
      Book.create({
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
      })
    ).rejects.toThrow(
      "Validation error: Description must be between 10 and 500 characters."
    );
  });

  it("should throw a validation error if popularity is negative", async () => {
    await expect(
      Book.create({
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
      })
    ).rejects.toThrow(
      "Validation error: Popularity must be greater than or equal to 0."
    );
  });
  it("should throw a validation error if stock is negative", async () => {
    await expect(
      Book.create({
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
      })
    ).rejects.toThrow(
      "Validation error: Stock must be greater than or equal to 0."
    );
  });

  it("should throw a validation error if thumbnailImagePath is missing", async () => {
    await expect(
      Book.create({
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
      })
    ).rejects.toThrow(
      "Validation error: Thumbnail image path cannot be empty."
    );
  });

  it("should throw a validation error if coverImagePath is missing", async () => {
    await expect(
      Book.create({
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
      })
    ).rejects.toThrow("Validation error: Cover image path cannot be empty.");
  });
});
