import db from './db';
import { Score, NewScore } from '../types/scoreTypes';

export const create = async ({ username, time_seconds }: NewScore): Promise<Score> => {
  const { rows } = await db.query<Score>(
    'INSERT INTO scores (username, time_seconds) VALUES ($1, $2) RETURNING *',
    [username, time_seconds]
  );
  return rows[0];
};

export const getAll = async (): Promise<Score[]> => {
  const { rows } = await db.query<Score>(`
    SELECT * FROM scores
    ORDER BY time_seconds ASC
    LIMIT 5
  `);
  return rows;
};
