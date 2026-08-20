import express from "express";
import "dotenv/config";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./openapi.json" with { type: "json" };
import { pool, connectDB } from "./src/config/db.js";

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

app.get("/tasks", async (req, res) => {
  const result = await pool.query(`SELECT * FROM tasks`);
  res.status(200).json(result.rows);
});

app.get("/tasks/:id", async (req, res) => {
  const id = parseInt(req.params.id);

  const task = await pool.query(`SELECT * FROM tasks WHERE id = $1`, [id]);
  if (!task.rows[0]) {
    return res.status(404).json({ error: `Task ${id} not found` });
  }
  res.status(200).json(task.rows);
});

app.post("/tasks", async (req, res) => {
  const { title, done } = req.body;

  if (!title) {
    return res.status(400).json("title is required");
  }
  const newTask = await pool.query(
    `INSERT INTO tasks (title, done) VALUES($1, $2) RETURNING *`,
    [title, done],
  );

  res.status(201).json({
    message: "Created",
    task: newTask.rows[0],
  });
});

app.put("/tasks/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const { title, done } = req.body;

  const result = await pool.query(
    `UPDATE tasks SET title = $1, done = $2 WHERE id = $3`,
    [title, done, id],
  );
  if (result.rows.length === 0) {
    return res.status(404).json({ error: `Task ${id} not found` });
  }

  res.json({ message: "Updated", task: result.rows[0] });
});

app.delete("/tasks/:id", async (req, res) => {
  const id = parseInt(req.params.id);

  const result = await pool.query(
    `DELETE FROM tasks WHERE id = $1 RETURNING *`,
    [id],
  );
  if (result.rows.length === 0) {
    return res.status(404).json({ error: `Task ${id} not found` });
  }
  return res.status(204).json({ message: "Deleted" });
});

connectDB();
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
