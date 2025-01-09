export interface DbScore {
  id: number;
  username: string;
  time_seconds: number;
}

// Used when creating a new score
export interface CreateScore {
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