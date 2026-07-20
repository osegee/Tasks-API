import express from "express";
import "dotenv/config";
import morgan from "morgan";

const app = express();
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("Hello Server");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
