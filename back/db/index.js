const mongoose = require("mongoose");

const MONGODB_URI = "mongodb://127.0.0.1:27017/Requeriments";
console.log("conectando...");
mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("Conectado a la BDD"))
  .catch((error) => console.log(error));
