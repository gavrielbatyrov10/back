const express = reqire("express");
const app = express();
const PORT = 3000;
//Body parsing
app.use(express.jspn());
app.use(express.urlencodeed({ exteded: true }));
// Logging
app.use((req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}`);
  next();
});

//Routing

app.use("/puppies", require("./puppies.js"));

//Error handling
app.use((err, req, res, next) => {
  const status = err?.status ?? 500;
  const message = err?.message ?? "internal server error";
  res.status(status).json(message);
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
