import { ValidationError } from "sequelize";
import Book from "../../src/models/book.models";
import sequelize from "../../src/config/dbConfig";

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

type CreateFunction = () => Promise<any>;

const assertValidationError = async (
  createFn: CreateFunction,
  expectedMessage: string
) => {
  try {
    await createFn();
  } catch (error) {
    if (error instanceof ValidationError) {
      expect(error).toBeInstanceOf(ValidationError);
      expect(error.errors[0].message).toBe(expectedMessage);
    } else {
      throw error;
    }
  }
};

// Test model creation with valid attributes
describe("Book Model", () => {
  it("should create a book with valid attributes", async () => {
    const newBook = {
      title: "Test Title",
      author: "Test Author",
      tome: 1,
      genre: "Test Genre",
      price: 9.99,
      publishedDate: new Date(),
      description: "Test Description",
      popularity: 0,
      stock: 0,
      thumbnailImagePath: "/uploads/thumbail/test-image.jpg",
      coverImagePath: "/uploads/cover/test-image.jpg",
    };

    const book = await Book.create(newBook);

    expect(book.id).toBeDefined();

    const { publishedDate, ...rest } = newBook;
    expect(book).toMatchObject(rest);
    expect(book.publishedDate.getTime()).toEqual(
      newBook.publishedDate.getTime()
    );
  });

  // Test model validation with invalid attributes title
  it("should throw a validation error if title is missing", async () => {
    await assertValidationError(
      () =>
        Book.create({
          author: "Test Author",
          tome: 1,
          genre: "Test Genre",
          price: 9.99,
          publishedDate: new Date(),
          description: "Test Description",
          popularity: 0,
          stock: 0,
          thumbnailImagePath: "/uploads/thumbail/test-image.jpg",
          coverImagePath: "/uploads/cover/test-image.jpg",
        }),
      "Le titre est obligatoire."
    );
  });

  // Test model validation with invalid attributes author
  it("should throw a validation error if author is missing", async () => {
    await assertValidationError(
      () =>
        Book.create({
          title: "Test Title",
          tome: 1,
          genre: "Test Genre",
          price: 9.99,
          publishedDate: new Date(),
          description: "Test Description",
          popularity: 0,
          stock: 0,
          thumbnailImagePath: "/uploads/thumbail/test-image.jpg",
          coverImagePath: "/uploads/cover/test-image.jpg",
        }),
      "L'auteur est obligatoire."
    );
  });

  // Test model validation with invalid attributes tome
  it("should throw a validation error if tome is negative", async () => {
    await assertValidationError(
      () =>
        Book.create({
          title: "Test Title",
          author: "Test Author",
          tome: -1,
          genre: "Test Genre",
          price: 9.99,
          publishedDate: new Date(),
          description: "Test Description",
          popularity: 0,
          stock: 0,
          thumbnailImagePath: "/uploads/thumbail/test-image.jpg",
          coverImagePath: "/uploads/cover/test-image.jpg",
        }),
      "Le nombre de tome doit être supérieur ou égal à 1."
    );
  });

  // Test model validation with invalid attributes genre
  it("should throw a validation error if genre is missing", async () => {
    await assertValidationError(
      () =>
        Book.create({
          title: "Test Title",
          author: "Test Author",
          tome: 1,
          price: 9.99,
          publishedDate: new Date(),
          description: "Short",
          popularity: 0,
          stock: 0,
          thumbnailImagePath: "/uploads/thumbail/test-image.jpg",
          coverImagePath: "/uploads/cover/test-image.jpg",
        }),
      "Le genre est obligatoire."
    );
  });

  // Test model validation with invalid attributes price
  it("should throw a validation error if price is negative", async () => {
    await assertValidationError(
      () =>
        Book.create({
          title: "Test Title",
          author: "Test Author",
          tome: 1,
          genre: "Test Genre",
          price: -1,
          publishedDate: new Date(),
          description: "Test Description",
          popularity: 0,
          stock: 0,
          thumbnailImagePath: "/uploads/thumbail/test-image.jpg",
          coverImagePath: "/uploads/cover/test-image.jpg",
        }),
      "Le prix doit être supérieur ou égal à 0."
    );
  });

  // Test model validation with invalid attributes date
  it("should have a default publishedDate if not provided", async () => {
    const book = await Book.create({
      title: "Test Title",
      author: "Test Author",
      tome: 1,
      genre: "Test Genre",
      price: 9.99,
      description: "Test Description",
      popularity: 0,
      stock: 0,
      thumbnailImagePath: "/uploads/thumbail/test-image.jpg",
      coverImagePath: "/uploads/cover/test-image.jpg",
    });

    expect(book.publishedDate).toBeInstanceOf(Date);
    expect(book.publishedDate.getTime()).toBeLessThanOrEqual(
      new Date().getTime()
    );
  });

  // Test model validation with invalid attributes description
  it("should throw a validation error if description is too short", async () => {
    await assertValidationError(
      () =>
        Book.create({
          title: "Test Title",
          author: "Test Author",
          tome: 1,
          genre: "Test Genre",
          price: 9.99,
          publishedDate: new Date(),
          description: "Short",
          popularity: 0,
          stock: 0,
          thumbnailImagePath: "/uploads/thumbail/test-image.jpg",
          coverImagePath: "/uploads/cover/test-image.jpg",
        }),
      "La description doit contenir entre 10 et 500 caractères."
    );
  });

  // Test model validation with invalid attributes popularity
  it("should have a validation error if popularity is negative", async () => {
    await assertValidationError(
      () =>
        Book.create({
          title: "Test Title",
          author: "Test Author",
          tome: 1,
          genre: "Test Genre",
          price: 9.99,
          publishedDate: new Date(),
          description: "Test Description",
          popularity: -1,
          stock: 0,
          thumbnailImagePath: "/uploads/thumbail/test-image.jpg",
          coverImagePath: "/uploads/cover/test-image.jpg",
        }),
      "La popularité doit être supérieure ou égale à 0."
    );
  });

  // Test model validation with invalid attributes stock
  it("should have a validation error if stock is negative", async () => {
    await assertValidationError(
      () =>
        Book.create({
          title: "Test Title",
          author: "Test Author",
          tome: 1,
          genre: "Test Genre",
          price: 9.99,
          publishedDate: new Date(),
          description: "Test Description",
          popularity: 0,
          stock: -1,
          thumbnailImagePath: "/uploads/thumbail/test-image.jpg",
          coverImagePath: "/uploads/cover/test-image.jpg",
        }),
      "Le stock doit être supérieur ou égal à 0."
    );
  });

  // Test model validation with invalid attributes coverImagePath
  it("should throw a validation error if coverImagePath is missing", async () => {
    await assertValidationError(
      () =>
        Book.create({
          title: "Test Title",
          author: "Test Author",
          tome: 1,
          genre: "Test Genre",
          price: 9.99,
          publishedDate: new Date(),
          description: "Test Description",
          popularity: 0,
          stock: 0,
          thumbnailImagePath: "/uploads/thumbail/test-image.jpg",
        }),
      "Le chemin de l'image de couverture est obligatoire."
    );
  });

  // Test model validation with invalid attributes thumbnailImagePath
  it("should throw a validation error if thumbnailImagePath is missing", async () => {
    await assertValidationError(
      () =>
        Book.create({
          title: "Test Title",
          author: "Test Author",
          tome: 1,
          genre: "Test Genre",
          price: 9.99,
          publishedDate: new Date(),
          description: "Test Description",
          popularity: 0,
          stock: 0,
          coverImagePath: "/uploads/cover/test-image.jpg",
        }),
      "Le chemin de la miniature est obligatoire."
    );
  });
});
