import { pool } from "../config/db.js";

const getAllTasks = async (req, res) => {
  try {
    const result = await pool.query(`SELECT * FROM tasks`);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "internal server error" });
  }
};

const getOneTask = async (req, res) => {
  const id = parseInt(req.params.id);

  const task = await pool.query(`SELECT * FROM tasks WHERE id = $1`, [id]);
  if (!task.rows[0]) {
    return res.status(404).json({ error: `Task ${id} not found` });
  }
  res.status(200).json(task.rows);
};

const createTask = async (req, res) => {
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
};

const updateTask = async (req, res) => {
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
};

const deleteTask = async (req, res) => {
  const id = parseInt(req.params.id);

  const result = await pool.query(
    `DELETE FROM tasks WHERE id = $1 RETURNING *`,
    [id],
  );
  if (result.rows.length === 0) {
    return res.status(404).json({ error: `Task ${id} not found` });
  }
  return res.status(204).json({ message: "Deleted" });
};

export { getAllTasks, getOneTask, createTask, updateTask, deleteTask };
