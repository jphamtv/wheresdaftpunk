import { apiClient } from "../utils/apiClient";
import { Target } from "../types/gameTypes";

export const scoreService = {
  getScores: () => apiClient.get<Target[]>('/'),

  startGame: () => apiClient.post('game/start'),

  endGame: (username: string) => {
    apiClient.post('game/complete', { username })
   }
};