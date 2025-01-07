import { apiClient } from "../utils/apiClient";
import { Target } from "../types/gameTypes";

export const targetService = {
  getTargets: () => apiClient.get<Target[]>('/targets'),

  validateLocation: (targetId: number, xCoord: number, yCoord: number) => {
    apiClient.post<{ correct: boolean }>('/targets/verify', {
      targetId,
      xCoord,
      yCoord
    })
  }
};