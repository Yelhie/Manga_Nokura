import sequelize from "./config/dbConfig";
import app from "./app";

const port: number | string = process.env.PORT || 3000;

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
