import db from './db';
import { Target, VerifyTarget } from '../types/targetTypes';

export const getAll = async (): Promise<Target[]> => {
  const { rows } = await db.query<Target>(`
    SELECT * FROM targets
    ORDER BY name DESC
  `);
  return rows;
};

export const getById = async (id: number) => {
  const { rows } = await db.query("SELECT * FROM targets WHERE id = $1", [id]);
  return rows[0] || null;
};

export default { getAll, getById };