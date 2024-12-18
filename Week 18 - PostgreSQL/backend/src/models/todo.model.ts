import { pgClient } from "../utils/db";

export const createTodo = async (title: string, description: string, done: boolean, userId: number) => {
  const query = `
    INSERT INTO todos (title, description, done, user_id)
    VALUES ($1, $2, $3, $4) RETURNING *;
  `;
  const result = await pgClient.query(query, [title, description, done, userId]);

  console.log('db response',result);
  return result.rows[0];
};

export const findTodoById = async (id: number) => {
  const query = `SELECT * FROM todos WHERE id = $1`;
  const result = await pgClient.query(query, [id]);
  return result.rows[0];
};

export const findAllTodos = async () => {
  const query = `SELECT * FROM todos`;
  const result = await pgClient.query(query);
  return result.rows;
};

export const deleteTodoById = async (id: number) => {
  const query = `DELETE FROM todos WHERE id = $1 RETURNING *`;
  const result = await pgClient.query(query, [id]);
  return result.rows[0];
};


export const findAllTodosByUserId = async (userId: string) => {
  const query = `SELECT * FROM todos WHERE user_id = $1`;
  const result = await pgClient.query(query, [userId]);
  return result.rows;
};


export const updateTodoById = async (id: number, updates: { title?: string; description?: string; done?: boolean }) => {
  const fields = [];
  const values: any[] = [];
  let query = "UPDATE todos SET ";

  if (updates.title) {
    fields.push("title = $" + (fields.length + 1));
    values.push(updates.title);
  }

  if (updates.description) {
    fields.push("description = $" + (fields.length + 1));
    values.push(updates.description);
  }

  if (updates.done !== undefined) {
    fields.push("done = $" + (fields.length + 1));
    values.push(updates.done);
  }

  if (fields.length === 0) {
    throw new Error("No fields to update");
  }

  query += fields.join(", ");
  query += " WHERE id = $" + (fields.length + 1) + " RETURNING *;";
  values.push(id);

  const result = await pgClient.query(query, values);
  return result.rows[0];
};
