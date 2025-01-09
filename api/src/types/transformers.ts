import { DbScore, VerifyTargetDbRequest } from "./dbTypes";
import { ApiScore, VerifyTargetApiRequest } from "./apiTypes";

export const toDbVerifyTarget = (apiTarget: VerifyTargetApiRequest): VerifyTargetDbRequest => ({
  id: apiTarget.id,
  x_coord: apiTarget.xCoord,
  y_coord: apiTarget.yCoord
});

export const toApiScore = (dbScore: DbScore): ApiScore => ({
  id: dbScore.id,
  username: dbScore.username,
  timeSeconds: dbScore.time_seconds
});