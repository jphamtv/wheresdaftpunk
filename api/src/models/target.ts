import db from './db';

export const getAll = async () => {
  const { rows } = await db.query(`
    SELECT *
    FROM targets
  `);
  return rows;
};

export const getById = async (id: number) => {
  const { rows } = await db.query("SELECT * FROM targets WHERE id = $1", [id]);
  return rows[0] || null;
};
