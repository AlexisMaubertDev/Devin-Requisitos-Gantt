const express = require("express");
const cors = require("cors");
require("./db");

const app = express();
app.use(cors());

// Middleware para manejar JSON en las solicitudes
app.use(express.json());

const routerRequeriment = require("./router/requerimentsRoute");
app.use("/api/requeriments", routerRequeriment);

// Iniciar el servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
