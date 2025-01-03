export interface Target {
  id: number;
  name: string;
  x_coord: number;
  y_coord: number;
  radius: number;
}

// Used when verifying Target
export interface VerifyTarget {
  id: number;
  x_coord: number;
  y_coord: number;
}