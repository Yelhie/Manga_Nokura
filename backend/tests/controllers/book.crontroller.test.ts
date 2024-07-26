import request from "supertest";
import app from "../../src/app";
// import { createBook } from "../../src/controllers/book.controller";
import Book from "../../src/models/book.models";

// Mock du module Book
jest.mock("../../src/models/book.models");
const mockBookCreate = Book.create as jest.Mock;

describe("POST /api/books", () => {
  beforeEach(() => {
    // Réinitialise les mocks avant chaque test
    jest.clearAllMocks();
  });

  it("should create a book with valid attributes", async () => {
    const newBook = {
      id: 1,
      title: "Test Title",
      author: "Test Author",
      tome: 1,
      genre: "Test Genre",
      price: 9.99,
      publishedDate: new Date(),
      description: "Test Description",
      coverImagePath: "/uploads/test-image.jpg",
    };
    mockBookCreate.mockResolvedValue(newBook); // Simuler la création réussie

    const response = await request(app).post("/api/books").send({
      title: "Test Title",
      author: "Test Author",
      tome: 1,
      genre: "Test Genre",
      price: 9.99,
      description: "Test Description",
    });

    expect(response.status).toBe(201);

    const { publishedDate, ...rest } = newBook;
    expect(response.body).toMatchObject(rest);

    expect(new Date(response.body.publishedDate)).toEqual(
      newBook.publishedDate
    );
  });
});
