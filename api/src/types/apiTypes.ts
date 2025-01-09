export interface ApiScore {
  username: string;
  timeSeconds: number;
}

export interface ApiTarget {
  id: number;
  name: string;
}

export interface VerifyTargetApiRequest {
  id: number;
  xCoord: number;
  yCoord: number;
}