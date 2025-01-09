import { apiClient } from "../utils/apiClient";
import { Target, ValidationResponse } from "../types/gameTypes";

export const targetService = {
  getTargets: () => {
    return apiClient.get<Target[]>('/targets');
  },

  verifyLocation: (id: number, xCoord: number, yCoord: number) => {
    const requestBody = {
      id,
      xCoord,
      yCoord
    };

    return apiClient.post<ValidationResponse>('/targets/verify', requestBody);
  }
};