import db from './db';
import { Target, VerifyTarget } from '../types/targetTypes';

export const getAll = async (): Promise<Target[]> => {
  const { rows } = await db.query<Target>(`
    SELECT * FROM targets
    ORDER BY name ASC
  `);
  return rows;
};

export const getById = async (id: number): Promise<Target> => {
  const { rows } = await db.query<Target>(`
    SELECT * FROM targets WHERE id = $1`,
    [id]
  );
  return rows[0];
};

// Verify function to keep validation logic in model
export const verifyCoordinates = async ({ id, x_coord, y_coord }: VerifyTarget): Promise<boolean> => {
  const target = await getById(id);
  if (!target) return false;

  // Calculate if clicked coordinates are within target's radius
  const distance = Math.sqrt(
    Math.pow(target.x_coord - x_coord, 2) +
    Math.pow(target.y_coord - y_coord, 2)
  );

  return distance <= target.radius;
}

export default { getAll, getById, verifyCoordinates };