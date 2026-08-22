import express from "express";
import "dotenv/config";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../openapi.json" with { type: "json" };
import taskRouter from "./routes/task.routes.js";

const app = express();
app.use(express.json());
app.use(morgan("dev"));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/", (req, res) => {
  res.json({ name: "Task API", version: "1.0", endpoints: ["/tasks"] });
});

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/", taskRouter);

export default app;
