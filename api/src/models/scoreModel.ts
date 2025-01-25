import db from './db';
import { DbScore } from '../types/dbTypes';

interface GameTimer {
  startTime: Date;
  time_seconds: number | null;
  keepaliveInterval?: NodeJS.Timeout
}

// In-memory storage for current game time
// For production - use Redis or similar
let currentGame: GameTimer = {
  startTime: new Date(),
  time_seconds: null
};

export const startGameTimer = () => {
  currentGame = {
    startTime: new Date(),
    time_seconds: null,
    keepaliveInterval: setInterval(async () => {
      try {
        await db.query('SELECT 1');
      } catch (err) {
        console.error('Keepalive failed:', err);
      }
    }, 60000)
  };
};

export const stopGameTimer = () => {
  if (currentGame.keepaliveInterval) {
    clearInterval(currentGame.keepaliveInterval);
  }
  const endTime = new Date();
  currentGame.time_seconds = Math.floor(
    (endTime.getTime() - currentGame.startTime.getTime()) / 1000
  );  
  return {
    time_seconds: currentGame.time_seconds
  };
};

export const getGameTime = () => {
  return {
    time_seconds: currentGame.time_seconds || 0
  };
};

export const create = async ({ username, time_seconds }: DbScore): Promise<DbScore> => {
  const { rows } = await db.query<DbScore>(
    'INSERT INTO scores (username, time_seconds) VALUES ($1, $2) RETURNING *',
    [username, time_seconds]
  );
  return rows[0];
};

export const getAll = async (): Promise<DbScore[]> => {
  const { rows } = await db.query<DbScore>(`
    SELECT username, time_seconds 
    FROM scores
    ORDER BY time_seconds ASC
    LIMIT 5
  `);
  return rows;
};
