import db from './db';
import { Score, NewScore } from '../types/dbTypes';

interface GameTimer {
  startTime: Date;
  endTime: Date | null;
  time_seconds: number | null;
}

// In-memory storage for current game time
// For production - use Redis or similar
let currentGame: GameTimer = {
  startTime: new Date(),
  endTime: null,
  time_seconds: null
};

export const startGameTimer = () => {
  currentGame = {
    startTime: new Date(),
    endTime: null,
    time_seconds: null
  };
  return currentGame.startTime;
};

export const stopGameTimer = () => {
  const endTime = new Date();
  currentGame.endTime = endTime;
  currentGame.time_seconds = Math.floor(
    (endTime.getTime() - currentGame.startTime.getTime()) / 1000
  );  
  return {
    time_seconds: currentGame.time_seconds,
    endTime
  };
};

export const getGameTime = () => {
  return {
    time_seconds: currentGame.time_seconds || 0
  };
};

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
