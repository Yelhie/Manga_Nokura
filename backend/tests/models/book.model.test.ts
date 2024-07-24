import { Sequelize, ValidationError } from "sequelize";
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

describe("Book Model", () => {
  it("should create a book with valid attributes", async () => {
    const book = await Book.create({
      title: "Test Title",
      author: "Test Author",
      tome: 1,
      genre: "Test Genre",
      price: 9.99,
      publishedDate: new Date(),
      description: "Test Description",
      coverImagePath: "/uploads/test-image.jpg",
    });

    expect(book.id).toBeDefined();
    expect(book.title).toBe("Test Title");
    expect(book.author).toBe("Test Author");
  });

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
          coverImagePath: "/uploads/test-image.jpg",
        }),
      "Le titre est obligatoire."
    );
  });

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
          coverImagePath: "/uploads/test-image.jpg",
        }),
      "Le prix doit être supérieur ou égal à 0."
    );
  });

  it("should have a default publishedDate if not provided", async () => {
    const book = await Book.create({
      title: "Test Title",
      author: "Test Author",
      tome: 1,
      genre: "Test Genre",
      price: 9.99,
      description: "Test Description",
      coverImagePath: "/uploads/test-image.jpg",
    });

    expect(book.publishedDate).toBeInstanceOf(Date);
    expect(book.publishedDate.getTime()).toBeLessThanOrEqual(
      new Date().getTime()
    );
  });

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
          coverImagePath: "/uploads/test-image.jpg",
        }),
      "La description doit contenir entre 10 et 500 caractères."
    );
  });

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
        }),
      "Le chemin de l'image de couverture est obligatoire."
    );
  });
});
