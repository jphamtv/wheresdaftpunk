export interface Score {
  id: number;
  username: string;
  time_seconds: number;
  created_at: Date;
}

// Used when creating a new score
export interface NewScore {
  username: string;
  time_seconds: number;
}