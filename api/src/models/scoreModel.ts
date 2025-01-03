import db from './db';
import '../types/scoreTypes';

export const create = async (username: string, time_seconds: number) => {
  const { rows } = await db.query(
    'INSERT INTO scores (username, time_seconds) VALUES ($1, $2) RETURNING *',
    [username, time_seconds]
  );
  return rows[0];
};

export const getAll = async () => {
  const { rows } = await db.query(`
    SELECT *
    FROM scores
  `);
  return rows;
};
