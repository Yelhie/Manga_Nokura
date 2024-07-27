import request from "supertest";
import app from "../../src/app";
import Book from "../../src/models/book.models";

jest.mock("../../src/models/book.models");
const mockBookCreate = Book.create as jest.Mock;

describe("POST /api/books", () => {
  beforeEach(() => {
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
      thumbnailImagePath: "/uploads/thumbail/test-image.jpg",
      coverImagePath: "/uploads/cover/test-image.jpg",
      popularity: 0,
      stock: 0,
    };
    mockBookCreate.mockResolvedValue(newBook); // Simul la création réussie

    const response = await request(app).post("/api/books").send({
      title: "Test Title",
      author: "Test Author",
      tome: 1,
      genre: "Test Genre",
      price: 9.99,
      description: "Test Description",
      popularity: 0,
      stock: 0,
    });

    expect(response.status).toBe(201);

    const { publishedDate, ...rest } = newBook;
    expect(response.body).toMatchObject(rest);

    expect(new Date(response.body.publishedDate)).toEqual(
      newBook.publishedDate
    );
  });
});
