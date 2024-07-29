import sequelize from "./config/dbConfig";
import app from "./app";
import Book from "./models/book.model";
import Genre from "./models/genre.model";

const port: number | string = process.env.PORT || 3000;

// Call the associate method of each model to define the relationships between them before syncing the database and starting the server.
Book.associate();
Genre.associate();

sequelize
  .authenticate()
  .then(() => {
    console.log("The connection to the database was established successfully.");
    return sequelize.sync();
  })
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch((err: Error) => {
    console.error("Unable to connect to the database:", err);
  });

export default app;
