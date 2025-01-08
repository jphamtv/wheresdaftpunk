import { apiClient } from "../utils/apiClient";
import { Target, ValidationResponse } from "../types/gameTypes";

export const targetService = {
  getTargets: () => {
    return apiClient.get<Target[]>('/targets');
  },

  validateLocation: (targetId: number, xCoord: number, yCoord: number) => {
    const requestBody = {
      id: targetId,
      x_coord: xCoord,
      y_coord: yCoord
    };

    return apiClient.post<ValidationResponse>('/targets/verify', requestBody);
  }
};