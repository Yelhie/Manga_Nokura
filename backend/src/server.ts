import express, { Application } from "express";

const port: number | string = process.env.PORT || 3000;
const app: Application = express();

app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur le port : ${port}`);
});
