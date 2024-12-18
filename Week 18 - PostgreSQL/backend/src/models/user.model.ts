import { pgClient } from "../utils/db";

export const findUserByEmail = async (email: string) => {
  const query = `SELECT id, username, email FROM users WHERE email = $1`;
  const result = await pgClient.query(query, [email]);
  return result.rows[0];
};


export const findUserEmailByUserId = async (userId : number) => {
  const query = `SELECT email FROM users WHERE id = $1`;
  const result = await pgClient.query(query, [userId]);
  return result.rows;
}

export const findUserIdByUserEmail = async (email : string) => {
  const query = `SELECT id FROM users WHERE email = $1`;
  const result = await pgClient.query(query, [email]);
  return result.rows;
}