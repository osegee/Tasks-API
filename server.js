import express from "express";
import "dotenv/config";
import morgan from "morgan";

const app = express();
app.use(express.json());
app.use(morgan("dev"));

const tasks = [
  { id: 1, title: "Buy groceries", done: false },
  { id: 2, title: "Clean the kitchen", done: true },
  { id: 3, title: "Fix the broken chair", done: false },
];

app.get("/", (req, res) => {
  res.json({ name: "Task API", version: "1.0", endpoints: ["/tasks"] });
});

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.get("/tasks", (req, res) => {
  res.json(tasks);
});

app.get("/tasks/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const task = tasks.find((task) => task.id === id);
  if (!task) {
    return res.status(404).json({ error: `Task ${id} not found` });
  }

  res.json(task);
});

app.post("/tasks", (req, res) => {
  const { title } = req.body;

  if (!title) {
    return res.status(400).json("title is required");
  }

  const newTask = {
    id: tasks.length + 1,
    title: title,
    done: false,
  };
  tasks.push(newTask);

  res.status(201).json({
    message: "Created",
    newTask,
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
