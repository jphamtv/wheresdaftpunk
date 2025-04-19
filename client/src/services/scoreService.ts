import { apiClient } from '../utils/apiClient';
import {
  Score,
  StartTimerResponse,
  StopTimerResponse,
} from '../types/gameTypes';

export const scoreService = {
  getScores: () => {
    return apiClient.get<Score[]>('/game/scores');
  },

  startTimer: () => apiClient.post<StartTimerResponse>('/game/start-timer'),

  stopTimer: () => apiClient.post<StopTimerResponse>('/game/stop-timer'),

  submitScore: (username: string) =>
    apiClient.post('/game/submit-score', { username }),
};
