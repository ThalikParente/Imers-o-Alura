import express from "express"; // Importa o framework Express.js para criar aplicações web
import routes from "./src/routes/postsRoutes.js";

// Cria uma instância da aplicação Express
const app = express();
app.use(express.static("uploads"))
routes(app)

// Inicia o servidor na porta 3000 e exibe uma mensagem no console
app.listen(3000, () => {
  console.log("Servidor escutando...");
});





