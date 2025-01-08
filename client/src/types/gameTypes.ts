export type GameStatus = 'not-started' | 'in-progress' | 'completed';

export interface Target {
  id: number;
  name: string;
}

export interface ClickCoordinates {
  xCoord: number;
  yCoord: number;
}

export interface ValidationRequest {
  id: number;
  x_coord: number;
  y_coord: number;
}

export interface ValidationResponse {
  success: boolean;
  message: string;
}

export interface Score {
  username: string;
  timeSeconds: number;
}

export interface StartTimerResponse {
  success: boolean;
  startTime: string;
}

export interface StopTimerResponse {
  success: boolean;
  endTime: string;
  timeSeconds: number;
}