export interface DbScore {
  username: string;
  time_seconds: number;
}

export interface DbTarget {
  id: number;
  name: string;
  x_coord: number;
  y_coord: number;
  radius: number;
}

export interface VerifyTargetDbRequest {
  id: number;
  x_coord: number;
  y_coord: number;
}
