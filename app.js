const express = require("express");
require('express-async-errors');
const productRouter = require("./router/productRouter");
const salesRouter = require("./router/salesRouter");

const app = express();
app.use(express.json());

// não remova esse endpoint, é para o avaliador funcionar
app.get("/", (_request, response) => {
  response.send();
});

app.use("/products", productRouter);
app.use("/sales", salesRouter);
app.use((error, req, res, _next) => {
  const { message } = error;
  if (message === "Product not found") return res.status(404).json({ message });
});

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação
module.exports = app;
