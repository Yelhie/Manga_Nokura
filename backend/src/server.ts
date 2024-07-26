import sequelize from "./config/dbConfig";
import app from "./app";

// import express, { Application } from "express";
// import bookRoutes from "./routes/book.routes";

const port: number | string = process.env.PORT || 3000;
// const app: Application = express();

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// app.use("/api", bookRoutes);

sequelize
  .authenticate()
  .then(() => {
    console.log("La connexion à la base de données a été établie avec succès.");
    return sequelize.sync();
  })
  .then(() => {
    app.listen(port, () => {
      console.log(`Serveur en cours d'exécution sur le port : ${port}`);
    });
  })
  .catch((err: Error) => {
    console.error("Impossible de se connecter à la base de données:", err);
  });

export default app;
