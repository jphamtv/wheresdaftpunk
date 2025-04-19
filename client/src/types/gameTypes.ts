export type GameStatus = 'not-started' | 'in-progress' | 'completed';

export interface Target {
  id: number;
  name: string;
}

export interface FoundTarget {
  id: number;
  name: string;
  x: number;
  y: number;
  xCoord: number;
  yCoord: number;
}

export interface ClickCoordinates {
  xCoord: number;
  yCoord: number;
}

export interface ValidationRequest {
  id: number;
  xCoord: number;
  yCoord: number;
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
