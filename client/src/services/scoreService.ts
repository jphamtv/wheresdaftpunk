import { apiClient } from "../utils/apiClient";
import { Score, StartTimerResponse, StopTimerResponse } from "../types/gameTypes";

export const scoreService = {
  getScores: () => {
    return apiClient.get<Score[]>('/game/scores').then(scores => {
      scores.map(score => ({
        username: score.username,
        timeSeconds: score.time_seconds
      }))
    });
  },

  startTimer: () => apiClient.post<StartTimerResponse>('/game/start-timer'),

  stopTimer: () => apiClient.post<StopTimerResponse>('/game/stop-timer')
    .then(response => ({
      success: response.success,
      endTime: response.endTime,
      timeSeconds: response.time_seconds
  })),

  submitScore: (username: string) => {
    return apiClient.post('/game/submit-score', username);
  }
};