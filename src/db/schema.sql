-- Active: 1785842492258@@127.0.0.1@5432@tasks
CREATE TABLE IF NOT EXISTS tasks(
    id SERIAL PRIMARY KEY,
    title VARCHAR(225) NOT NULL,
    done BOOLEAN NOT NULL DEFAULT FALSE
);

INSERT INTO tasks (title, done) VALUES ('Buy groceries', false), ('Clean the kitchen', false), ('Fix broken chair', true);