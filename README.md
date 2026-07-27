# Tasks API

## What this is

This is a small in-memory REST API for managing tasks, built with Express.  
It also includes Swagger UI docs at `http://localhost:3000/api-docs/`.

## Install & run

Run this single command from the project root:

```powershell
npm install; npm start
```

## Endpoints

| Method | Path         | Description         | Success status |
| ------ | ------------ | ------------------- | -------------- |
| GET    | `/`          | Basic API info      | 200            |
| GET    | `/health`    | Health check        | 200            |
| GET    | `/tasks`     | List all tasks      | 200            |
| GET    | `/tasks/:id` | Get one task by ID  | 200            |
| POST   | `/tasks`     | Create a task       | 201            |
| PUT    | `/tasks/:id` | Update a task by ID | 200            |
| DELETE | `/tasks/:id` | Delete a task by ID | 204            |

## Example `curl -i` output

```bash
curl -i http://localhost:3000/tasks
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 149
ETag: W/"95-x5hVRUlC+LxdnZuP5hPu/ub2nYk"
Date: Mon, 27 Jul 2026 11:30:53 GMT
Connection: keep-alive
Keep-Alive: timeout=5

[{"id":1,"title":"Buy groceries","done":false},{"id":2,"title":"Clean the kitchen","done":true},{"id":3,"title":"Fix the broken chair","done":false}]
```

## Swagger screenshot

![Swagger UI screenshot](./swagger-screenshot.png)
