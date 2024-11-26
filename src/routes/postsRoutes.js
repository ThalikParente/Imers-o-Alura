import express from "express"; // Importa o framework Express para criar a API
import multer from "multer"; // Importa o middleware Multer para lidar com uploads de arquivos

// Importa controladores para lidar com a lógica dos posts
import { listarPosts, postarNovoPost, uploadImagem, atualizarNovoPost } from "../controllers/postsControllers.js";
import cors from "cors";

const corsOptions = {
 origin: "http://localhost:8000", 
 optionsSuccessStatus: 200
}

// Configura o armazenamento do Multer usando diskStorage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Especifica o diretório para armazenar os arquivos enviados (substitua pelo caminho desejado)
    cb(null, './uploads/'); // Ajuste o caminho conforme necessário
  },
  filename: function (req, file, cb) {
    // Usa o nome original do arquivo para os arquivos enviados
    cb(null, file.originalname);
  },
});

// Cria uma instância do Multer com o armazenamento configurado
const upload = multer({ storage });

// Função para definir as rotas da aplicação Express
const routes = (app) => {
  // Analisa corpos de requisições JSON
  app.use(express.json());
  app.use(cors(corsOptions))

  // Define uma rota GET para listar posts (referencia o controlador listarPosts)
  app.get("/posts", listarPosts);

  // Define uma rota POST para criar um novo post (referencia o controlador postarNovoPost)
  app.post("/posts", postarNovoPost);

  // Define uma rota POST para enviar uma imagem (usa o middleware Multer e o controlador uploadImagem)
  app.post("/upload", upload.single("imagem"), uploadImagem);

  app.put("/upload/:id", atualizarNovoPost)
};

export default routes;